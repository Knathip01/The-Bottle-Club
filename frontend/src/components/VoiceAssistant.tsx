'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Mic, MicOff, Sparkles, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '@/app/actions/auth';


export default function VoiceAssistant() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showStatusIndicator, setShowStatusIndicator] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [matchedCommand, setMatchedCommand] = useState<{ path: string; name: string } | null>(null);
  const [isActive, setIsActive] = useState(false); // mirrors shouldListenRef for reactive UI

  // Reference to track if we should automatically keep listening
  const shouldListenRef = useRef<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);
  const isRecognitionActiveRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);
  const hideTimeoutRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Microphone pre-warming removed to prevent permission request dialog immediately on page mount

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false; // Capture discrete chunks and trigger onresult
    rec.interimResults = true; // Live speech-to-text feedback
    rec.maxAlternatives = 1; // Limit alternatives to optimize calculation speed
    rec.lang = 'th-TH'; // Focus on Thai language

    rec.onstart = () => {
      setIsListening(true);
      isRecognitionActiveRef.current = true;
      setErrorMessage('');
    };

    rec.onresult = (event: any) => {
      // Ignore results if the system is currently navigating or speaking
      if (isProcessingRef.current || isSpeakingRef.current) return;

      // Clear any pending fade-out timers while user is actively speaking
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      let currentResult = '';
      for (let i = 0; i < event.results.length; i++) {
        currentResult += event.results[i][0].transcript;
      }

      const trimmedResult = currentResult.trim();
      
      // Filter out non-verbal audio/noise artifacts (clicks, breath, pops) which are typically extremely short (< 2 characters)
      const cleanLength = trimmedResult.replace(/\s+/g, '').length;
      if (cleanLength < 2) {
        return;
      }

      // Show transcript overlay only when speech is actually detected
      if (trimmedResult) {
        setTranscript(trimmedResult);
        setShowStatusIndicator(true);

        // REAL-TIME INTERIM MATCHING:
        // As the user is speaking, proactively match their interim text.
        // If it matches a page command, navigate INSTANTLY without waiting
        // for the browser's 1.5-second end-of-speech silence pause!
        const matchedTarget = checkQueryMatch(trimmedResult);
        if (matchedTarget) {
          triggerResponse(matchedTarget);
          return;
        }
      }

      // Check if it's the final result (fallback backup)
      if (event.results[event.results.length - 1].isFinal) {
        processCommand(trimmedResult);
      }
    };

    rec.onerror = (event: any) => {
      isRecognitionActiveRef.current = false;
      setIsListening(false);

      const err = event.error;

      // 1. Common operational warnings - handle gently and return early
      if (err === 'no-speech') {
        // Silent environment triggers no-speech, let onend restart listening silently
        return;
      }

      if (err === 'network') {
        // Network issue occurs if standard cloud speech services are offline
        console.warn('Speech Recognition Network Warning:', err);
        setErrorMessage('ระบบเสียงขัดข้องชั่วคราว กรุณาตรวจสอบอินเทอร์เน็ตของคุณครับ');
        return;
      }

      if (err === 'aborted') {
        // Safe to ignore when stop() is called programmatically (e.g. during speech transitions)
        console.debug('Speech Recognition aborted');
        return;
      }

      // 2. Critical permissions or browser failures
      console.error('Speech Recognition Error:', err);
      
      if (err === 'not-allowed') {
        setErrorMessage('กรุณาอนุญาตสิทธิ์เข้าถึงไมโครโฟนเพื่อเปิดการสั่งเสียงอัตโนมัติ');
        shouldListenRef.current = false;
        setShowStatusIndicator(false);
      } else {
        setErrorMessage('เกิดข้อผิดพลาดในการฟังเสียง');
      }
    };

    rec.onend = () => {
      setIsListening(false);
      isRecognitionActiveRef.current = false;

      // Auto-restart recognition if always-listening is enabled and AI isn't speaking
      if (shouldListenRef.current && !isSpeakingRef.current) {
        setTimeout(() => {
          if (shouldListenRef.current && !isSpeakingRef.current && !isRecognitionActiveRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e: any) {
              if (e.name !== 'InvalidStateError' && !e.message?.includes('already started')) {
                console.warn('Failed to auto-restart speech recognition:', e);
              }
            }
          }
        }, 400); // 400ms delay to keep the engine stable
      }
    };

    recognitionRef.current = rec;

    // Do not start listening automatically on mount (Off by default)
    shouldListenRef.current = false;

    // Clean up on unmount
    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Turn off speech system when navigating to admin pages
  useEffect(() => {
    if (pathname?.startsWith('/admin')) {
      shouldListenRef.current = false;
      setIsActive(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      isRecognitionActiveRef.current = false;
      setShowStatusIndicator(false);
      setTranscript('');
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [pathname]);

  // Helper to parse and match voice queries
  const checkQueryMatch = (text: string): { path: string; name: string } | null => {
    // Clean and remove all spaces. Thai is a continuous language script and browser speech engines
    // frequently hallucinate spaces between syllables (e.g. "เข้า สู่ ระบบ"). Removing all whitespaces
    // ensures the query perfectly matches continuous Thai substring checks.
    const query = text.toLowerCase().replace(/\s+/g, '').trim();
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('access_token');

    // 1. Addresses / จัดการที่อยู่
    if (
      query.includes('ที่อยู่') ||
      query.includes('จัดการที่อยู่') ||
      query.includes('ที่อยู่จัดส่ง') ||
      query.includes('address') ||
      query.includes('addresses') ||
      query.includes('ไปที่อยู่') ||
      query.includes('ไปหน้าที่อยู่')
    ) {
      return { path: '/account/addresses', name: 'จัดการที่อยู่' };
    }
    // 2. Orders / รายการสั่งซื้อ
    else if (
      query.includes('คำสั่งซื้อ') ||
      query.includes('ประวัติการสั่งซื้อ') ||
      query.includes('รายการสั่งซื้อ') ||
      query.includes('ประวัติสั่งซื้อ') ||
      query.includes('order') ||
      query.includes('orders') ||
      query.includes('ไปประวัติการสั่งซื้อ') ||
      query.includes('ไปคำสั่งซื้อ') ||
      query.includes('ดูออเดอร์') ||
      query.includes('ออเดอร์ของฉัน') ||
      query.includes('ออเดอร์ของผม') ||
      query.includes('รายการออเดอร์') ||
      query.includes('ดูคำสั่งซื้อ') ||
      query.includes('คำสั่งซื้อของฉัน') ||
      query.includes('สถานะการสั่งซื้อ') ||
      query.includes('ไปดูออเดอร์') ||
      query.includes('ไปออเดอร์') ||
      query.includes('ไปรายการสั่งซื้อ')
    ) {
      return { path: '/account/orders', name: 'ประวัติการสั่งซื้อ' };
    }
    // 3. Points / คะแนนสะสม
    else if (
      query.includes('คะแนน') ||
      query.includes('แต้ม') ||
      query.includes('คะแนนสะสม') ||
      query.includes('แต้มสะสม') ||
      query.includes('points') ||
      query.includes('point') ||
      query.includes('ไปคะแนน') ||
      query.includes('ไปแต้มสะสม')
    ) {
      return { path: '/account/points', name: 'คะแนนสะสม' };
    }
    // 4. Reviews / รีวิวสินค้า
    else if (
      query.includes('รีวิว') ||
      query.includes(' review') ||
      query.includes('reviews') ||
      query.includes('ไปหน้ารีวิว') ||
      query.includes('ไปรีวิว')
    ) {
      return { path: '/account/reviews', name: 'รีวิวสินค้า' };
    }
    // 5. Account / บัญชีผู้ใช้
    else if (
      query.includes('บัญชี') ||
      query.includes('ข้อมูลส่วนตัว') ||
      query.includes('โปรไฟล์') ||
      query.includes('account') ||
      query.includes('profile') ||
      query.includes('ไปบัญชี') ||
      query.includes('ไปหน้าบัญชี')
    ) {
      return { path: '/account', name: 'บัญชีผู้ใช้' };
    }
    // 6. Login / เข้าสู่ระบบ
    else if (
      query.includes('เข้าสู่ระบบ') ||
      query.includes('ล็อกอิน') ||
      query.includes('ล็อคอิน') ||
      query.includes('ล๊อกอิน') ||
      query.includes('ล๊อคอิน') ||
      query.includes('login') ||
      query.includes('ลงชื่อเข้าใช้') ||
      query.includes('ไปเข้าสู่ระบบ') ||
      query.includes('ไปล็อกอิน') ||
      query.includes('ไปล็อคอิน') ||
      query.includes('ไปlogin') ||
      query.includes('ไปหน้าล็อกอิน')
    ) {
      if (isLoggedIn) {
        return { path: '/account', name: 'บัญชีผู้ใช้ (เนื่องจากคุณเข้าสู่ระบบอยู่แล้ว)' };
      }
      return { path: '/login', name: 'เข้าสู่ระบบ' };
    }
    // 7. Register / สมัครสมาชิก
    else if (
      query.includes('สมัครสมาชิก') ||
      query.includes('สมัคร') ||
      query.includes('ลงทะเบียน') ||
      query.includes('register') ||
      query.includes('sign up') ||
      query.includes('signup') ||
      query.includes('สร้างบัญชี') ||
      query.includes('ไปสมัครสมาชิก') ||
      query.includes('ไปสมัคร') ||
      query.includes('ไปลงทะเบียน') ||
      query.includes('ไปregister') ||
      query.includes('ไปสร้างบัญชี')
    ) {
      if (isLoggedIn) {
        return { path: '/account', name: 'บัญชีผู้ใช้ (เนื่องจากคุณเข้าสู่ระบบอยู่แล้ว)' };
      }
      return { path: '/register', name: 'สมัครสมาชิก' };
    }
    // 8. Cart / ตะกร้าสินค้า
    else if (
      query.includes('ตะกร้า') ||
      query.includes('รถเข็น') ||
      query.includes('ตะกร้าสินค้า') ||
      query.includes('cart') ||
      query.includes('basket') ||
      query.includes('ไปตะกร้า') ||
      query.includes('ไปรถเข็น') ||
      query.includes('ไปตะกร้าสินค้า') ||
      query.includes('ไปcart') ||
      query.includes('เพิ่มลงตะกร้า') ||
      query.includes('ใส่ตะกร้า') ||
      query.includes('เพิ่มสินค้าลงตะกร้า') ||
      query.includes('ดูตะกร้า') ||
      query.includes('ตะกร้าของฉัน') ||
      query.includes('ตะกร้าของผม') ||
      query.includes('สินค้าในตะกร้า') ||
      query.includes('เปิดตะกร้า') ||
      query.includes('ไปหน้าตะกร้า')
    ) {
      return { path: '/cart', name: 'ตะกร้าสินค้า' };
    }
    // 9. Checkout / ชำระเงิน
    else if (
      query.includes('ชำระเงิน') ||
      query.includes('จ่ายเงิน') ||
      query.includes('เช็คเอาต์') ||
      query.includes('เช็คเอาท์') ||
      query.includes('checkout') ||
      query.includes('ไปชำระเงิน') ||
      query.includes('ไปจ่ายเงิน') ||
      query.includes('ไปเช็คเอาต์') ||
      query.includes('ไปcheckout') ||
      query.includes('สั่งซื้อเลย') ||
      query.includes('สั่งซื้อตอนนี้') ||
      query.includes('ซื้อเลย') ||
      query.includes('ยืนยันการสั่งซื้อ') ||
      query.includes('ยืนยันคำสั่งซื้อ') ||
      query.includes('ยืนยันออเดอร์') ||
      query.includes('โอนเงิน') ||
      query.includes('สแกนจ่าย') ||
      query.includes('จ่ายผ่านบัตร') ||
      query.includes('ชำระด้วยบัตร') ||
      query.includes('ดำเนินการสั่งซื้อ') ||
      query.includes('ไปหน้าชำระเงิน') ||
      query.includes('ไปยืนยันออเดอร์')
    ) {
      return { path: '/checkout', name: 'ชำระเงิน' };
    }
    // 10. Tracking / ติดตามสินค้า
    else if (
      query.includes('ติดตามสินค้า') ||
      query.includes('ติดตามพัสดุ') ||
      query.includes('ติดตามออเดอร์') ||
      query.includes('tracking') ||
      query.includes('track') ||
      query.includes('เช็คพัสดุ') ||
      query.includes('เช็คสถานะ') ||
      query.includes('ไปติดตามสินค้า') ||
      query.includes('ไปติดตามพัสดุ') ||
      query.includes('ไปเช็คพัสดุ') ||
      query.includes('ไปtracking') ||
      query.includes('ของฉันอยู่ที่ไหน') ||
      query.includes('ของผมอยู่ที่ไหน') ||
      query.includes('สินค้าอยู่ที่ไหน') ||
      query.includes('พัสดุอยู่ที่ไหน') ||
      query.includes('ของส่งถึงไหนแล้ว') ||
      query.includes('ส่งของถึงไหนแล้ว') ||
      query.includes('สินค้าส่งถึงไหนแล้ว') ||
      query.includes('สถานะพัสดุ') ||
      query.includes('เลขพัสดุ') ||
      query.includes('ตรวจสอบพัสดุ') ||
      query.includes('เช็คสถานะออเดอร์') ||
      query.includes('ไปเช็คสถานะ')
    ) {
      return { path: '/tracking', name: 'ติดตามสินค้า' };
    }
    // 11. Search / ค้นหา
    else if (
      query.includes('ค้นหา') ||
      query.includes('search') ||
      query.includes('หาไวน์') ||
      query.includes('หาของ') ||
      query.includes('ไปค้นหา') ||
      query.includes('ไปsearch') ||
      query.includes('ไปหาของ') ||
      query.includes('หาสินค้า') ||
      query.includes('หาเครื่องดื่ม') ||
      query.includes('อยากหา') ||
      query.includes('อยากได้') ||
      query.includes('มีสินค้าอะไรบ้าง') ||
      query.includes('หาของให้หน่อย') ||
      query.includes('ไปหน้าค้นหา')
    ) {
      return { path: '/search', name: 'ค้นหาสินค้า' };
    }
    // 12. Test / หน้าทดสอบ
    else if (
      query.includes('หน้าทดสอบ') ||
      query.includes('ทดสอบ') ||
      query.includes('test') ||
      query.includes('ไปหน้าทดสอบ') ||
      query.includes('ไปtest')
    ) {
      return { path: '/test', name: 'หน้าทดสอบ' };
    }
    // 13. Home / หน้าแรก
    else if (
      query.includes('หน้าแรก') ||
      query.includes('หน้าหลัก') ||
      query.includes('โฮม') ||
      query.includes('home') ||
      query.includes('กลับบ้าน') ||
      query.includes('ไปหน้าแรก') ||
      query.includes('ไปหน้าหลัก') ||
      query.includes('ไปโฮม') ||
      query.includes('ไปhome')
    ) {
      return { path: '/', name: 'หน้าแรก' };
    }
    // 14. Logout / ออกจากระบบ
    else if (
      query.includes('ออกจากระบบ') ||
      query.includes('ลงชื่อออก') ||
      query.includes('logout') ||
      query.includes('signout') ||
      query.includes('ล๊อกเอาท์') ||
      query.includes('ล็อกเอาท์') ||
      query.includes('ไปออกจากระบบ')
    ) {
      return { path: 'logout_action', name: 'ออกจากระบบ' };
    }
    // 15. Product Details / รายละเอียดสินค้า (ProductDetailClient)
    else if (
      query.includes('ข้อมูล') ||
      query.includes('ดูข้อมูลสินค้า') ||
      query.includes('ดูรายละเอียดสินค้า') ||
      query.includes('รายละเอียดสินค้า') ||
      query.includes('ข้อมูลสินค้า') ||
      query.includes('ไปดูข้อมูลสินค้า') ||
      query.includes('ไปดูรายละเอียดสินค้า')
    ) {
      return { path: '/product/1', name: 'รายละเอียดสินค้า' };
    }
    // 16. Product Catalog / ดูสินค้า (Index page product)
    else if (
      query.includes('ดูสินค้า') ||
      query.includes('สินค้า') ||
      query.includes('product') ||
      query.includes('products') ||
      query.includes('ไปหน้าproduct') ||
      query.includes('ไปดูสินค้า') ||
      query.includes('แคตตาล็อก') ||
      query.includes('แค็ตตาล็อก') ||
      query.includes('เลือกสินค้า') ||
      query.includes('รายการสินค้า') ||
      query.includes('ไปเลือกสินค้า') ||
      query.includes('ซื้อสินค้า') ||
      query.includes('อยากซื้อ') ||
      query.includes('อยากสั่ง') ||
      query.includes('อยากสั่งซื้อ') ||
      query.includes('อยากได้สินค้า') ||
      query.includes('ดูไวน์') ||
      query.includes('เลือกไวน์') ||
      query.includes('เครื่องดื่ม') ||
      query.includes('ไปซื้อสินค้า') ||
      query.includes('ไปเลือกดู') ||
      query.includes('สั่งสินค้า') ||
      query.includes('สั่งของ') ||
      query.includes('ไปสั่งของ') ||
      query.includes('โปรโมชั่น') ||
      query.includes('โปรโมชัน') ||
      query.includes('สินค้าแนะนำ') ||
      query.includes('สินค้าใหม่') ||
      query.includes('สินค้าลดราคา') ||
      query.includes('ไปดูโปรโมชั่น')
    ) {
      return { path: '/product', name: 'สินค้า' };
    }

    return null;
  };

  // Process and match Thai navigation commands
  const processCommand = (text: string) => {
    if (isProcessingRef.current || isSpeakingRef.current) return;
    
    const target = checkQueryMatch(text);

    if (target) {
      triggerResponse(target);
    } else {
      // If speech didn't match any navigation commands, gracefully fade out indicator after 3 seconds of silence
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        if (!isSpeakingRef.current) {
          setShowStatusIndicator(false);
          setTranscript('');
        }
      }, 3000);
    }
  };


  // Speaks feedback and routes
  const triggerResponse = (target: { path: string; name: string }) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    isSpeakingRef.current = true;

    // Clear any active hide timers immediately
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Stop microphone temporarily to prevent feedback loops
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const isLogout = target.path === 'logout_action';
    const responseMsg = isLogout
      ? 'ได้เลยครับคุณลูกค้า กำลังดำเนินการออกจากระบบบัญชีของคุณครับ'
      : `ได้เลยครับคุณลูกค้า กำลังพาไปหน้า${target.name}ครับ`;

    // 1. Trigger speech asynchronously in the background
    speakFeedback(responseMsg);

    // 2. Show premium green success confirmation card on the bottom status bar
    setMatchedCommand(target);
    setShowStatusIndicator(true);

    // 3. Trigger Next.js router transition or logout action after a tiny visual confirmation of 150ms (lightning fast!)
    setTimeout(async () => {
      if (isLogout) {
        try {
          await logout();
          // Forcefully clear standard client token storage
          localStorage.removeItem('access_token');
          router.push('/');
        } catch (e) {
          console.error('Logout server action failed:', e);
          localStorage.removeItem('access_token');
          router.push('/');
        }
      } else {
        router.push(target.path);
      }
    }, 150);

    // 4. Clean up overlays, release guards, and restart continuous listening after speech duration completes (2.8s)
    setTimeout(() => {
      setShowStatusIndicator(false);
      setTranscript('');
      setMatchedCommand(null);
      isSpeakingRef.current = false;
      isProcessingRef.current = false;

      if (shouldListenRef.current && recognitionRef.current && !isRecognitionActiveRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e: any) {
          if (e.name !== 'InvalidStateError' && !e.message?.includes('already started')) {
            console.warn('Failed to restart speech recognition after navigation:', e);
          }
        }
      }
    }, 2800);
  };

  // Text-To-Speech Synthesis
  const speakFeedback = (text: string, onEnd?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const thVoice = voices.find((v) => v.lang.startsWith('th'));
    if (thVoice) {
      utterance.voice = thVoice;
    }

    let isCallbackCalled = false;
    const fallbackTimeout = setTimeout(() => {
      if (!isCallbackCalled) {
        isCallbackCalled = true;
        if (onEnd) onEnd();
      }
    }, 2500); // 2.5 seconds safety limit

    utterance.onend = () => {
      if (!isCallbackCalled) {
        isCallbackCalled = true;
        clearTimeout(fallbackTimeout);
        if (onEnd) onEnd();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Toggle active/inactive microphone for user privacy
  const toggleSpeechSystem = () => {
    if (!isSupported) return;

    if (shouldListenRef.current) {
      // Pause
      shouldListenRef.current = false;
      setIsActive(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      isRecognitionActiveRef.current = false;
      setShowStatusIndicator(false);
      setTranscript('');
    } else {
      // Resume
      shouldListenRef.current = true;
      setIsActive(true);
      if (recognitionRef.current && !isRecognitionActiveRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e: any) {
          if (e.name !== 'InvalidStateError' && !e.message?.includes('already started')) {
            console.error('Manual activation error:', e);
          }
        }
      }
    }
  };

  // Render nothing on admin pages (but after all Hooks have executed)
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {/* Floating Ambient Mic Status Button (Ultra-Modern 2027 Aesthetic) */}
      {isSupported && (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end md:hidden">
          <button
            onClick={toggleSpeechSystem}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer select-none group relative shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] ${
              isActive
                ? 'bg-stone-950/90 text-white border border-stone-800'
                : 'bg-stone-900 text-stone-500 border border-stone-800/60'
            }`}
            aria-label={isActive ? 'ปิดระบบฟังเสียง' : 'เปิดระบบฟังเสียง'}
          >
            {/* Shifting neon aura ring when active and listening */}
            {isActive && isListening && (
              <motion.div
                animate={{
                  rotate: 360,
                  boxShadow: [
                    '0 0 8px rgba(16,185,129,0.3)',
                    '0 0 14px rgba(139,0,0,0.5)',
                    '0 0 8px rgba(245,158,11,0.3)',
                    '0 0 8px rgba(16,185,129,0.3)'
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'linear'
                }}
                className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-emerald-500 via-[#8b0000] to-amber-500 pointer-events-none opacity-90 z-0 blur-[1px]"
              />
            )}

            {/* Breathing ambient ring when active but not currently capturing sound */}
            {isActive && !isListening && (
              <span className="absolute inset-[-1px] rounded-full bg-gradient-to-tr from-emerald-500/20 to-red-500/20 pointer-events-none z-0" />
            )}

            {/* Inner Dark Core */}
            <div className="absolute inset-[1px] rounded-full bg-stone-950 z-10 flex items-center justify-center overflow-hidden">
              {isActive ? (
                <div className="relative flex items-center justify-center w-full h-full">
                  {/* Subtle color overlay inside core while listening */}
                  {isListening && (
                    <motion.div
                      animate={{ opacity: [0.1, 0.25, 0.1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-[#8b0000]/20 to-amber-500/10 pointer-events-none"
                    />
                  )}
                  <motion.div
                    animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Mic size={14} className="text-stone-100 group-hover:text-amber-400 transition-colors z-20 relative" />
                  </motion.div>
                </div>
              ) : (
                <MicOff size={14} className="text-stone-600 group-hover:text-stone-400 transition-colors z-20 relative" />
              )}
            </div>
          </button>
        </div>
      )}

      {/* Sleek bottom transcription status bar when speech is detected */}
      <AnimatePresence>
        {showStatusIndicator && isActive && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm md:max-w-md px-4 pointer-events-none">
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full bg-stone-950/95 border border-stone-800 rounded-full px-5 py-3 shadow-2xl flex items-center justify-between gap-3 text-stone-100 backdrop-blur-md pointer-events-auto"
            >
              <div className="flex items-center gap-3 overflow-hidden flex-1">
                {/* Active Indicator Dot */}
                <div className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
                  {matchedCommand ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <Volume2 size={12} className="text-emerald-400 animate-bounce" />
                    </div>
                  ) : (
                    <>
                      <span className="absolute w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span className="relative w-2.5 h-2.5 rounded-full bg-amber-500 border border-stone-950" />
                    </>
                  )}
                </div>

                {/* Subtitle text */}
                <div className="flex-1 overflow-hidden min-w-0 leading-tight">
                  <p className="text-[9px] uppercase tracking-widest text-stone-500 font-extrabold">
                    {matchedCommand ? 'AI กำลังตอบรับ' : 'ระบบกำลังถอดเสียงสั่งการ'}
                  </p>
                  <p className="text-xs font-semibold text-white truncate italic mt-0.5">
                    &ldquo;{transcript}&rdquo;
                  </p>
                </div>
              </div>

              {/* Status Tag */}
              <div className="flex-shrink-0 flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-3 py-1 rounded-full text-[10px] font-bold text-amber-500">
                <Sparkles size={10} />
                <span>{matchedCommand ? 'รับทราบ' : 'กำลังฟัง...'}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
