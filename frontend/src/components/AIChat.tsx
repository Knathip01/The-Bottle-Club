'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, User, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import type { Language } from '@/context/LanguageContext';
import type { Product } from '@/lib/products';
import {
  AI_SPEECH_LOCALES,
  AI_PRICE_LOCALES,
  formatAiPrice,
  formatAiTemplate,
  type AiQuickIntent,
} from '@/lib/ai-translations';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

export default function AIChat() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const { language, t } = useLanguage();
  const locale = AI_PRICE_LOCALES[language] || 'en-US';
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatTime = useCallback(
    (date: Date) =>
      date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false }),
    [locale]
  );

  const generateAIResponse = useCallback(
    (query: string, productList: Product[], intent?: AiQuickIntent): string => {
      if (productList.length === 0) {
        return t('ai.error_fetch');
      }

      const q = query.toLowerCase();

      const checkKeyword = (key: string) => {
        const keywordsString = t(key);
        if (!keywordsString || keywordsString === key) return false;
        return keywordsString.split(',').some((kw) => q.includes(kw.trim().toLowerCase()));
      };

      const isCheap = intent === 'cheap' || checkKeyword('ai.keyword.cheap');
      const isExpensive = intent === 'expensive' || checkKeyword('ai.keyword.expensive');
      const isList = intent === 'list' || checkKeyword('ai.keyword.list');
      const isRecommend = intent === 'recommend' || checkKeyword('ai.keyword.recommend');

      if (isCheap) {
        const cheapest = [...productList].sort((a, b) => a.price - b.price)[0];
        return formatAiTemplate(t('ai.cheapest_response'), {
          name: cheapest.name,
          price: formatAiPrice(cheapest.price, language),
          stock: cheapest.stock,
        });
      }

      if (isExpensive) {
        const expensive = [...productList].sort((a, b) => b.price - a.price)[0];
        return formatAiTemplate(t('ai.expensive_response'), {
          name: expensive.name,
          price: formatAiPrice(expensive.price, language),
        });
      }

      if (isList) {
        const top5 = productList.slice(0, 5);
        let response = `${t('ai.list_response')}\n`;
        top5.forEach((p, i) => {
          response += `${formatAiTemplate(t('ai.list_line'), {
            index: i + 1,
            name: p.name,
            price: formatAiPrice(p.price, language),
          })}\n`;
        });
        if (productList.length > 5) {
          response += formatAiTemplate(t('ai.list_more'), {
            count: productList.length - 5,
          });
        }
        return response.trim();
      }

      const foundProduct = productList.find((p) => q.includes(p.name.toLowerCase()));
      if (foundProduct) {
        return formatAiTemplate(t('ai.product_response'), {
          name: foundProduct.name,
          price: formatAiPrice(foundProduct.price, language),
        });
      }

      if (isRecommend) {
        const random = productList[Math.floor(Math.random() * productList.length)];
        return formatAiTemplate(t('ai.recommend_response'), {
          name: random.name,
          price: formatAiPrice(random.price, language),
        });
      }

      return t('ai.unknown_response');
    },
    [language, t]
  );

  const speakMessage = useCallback(
    (text: string, lang: Language) => {
      if (!isSpeakingEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_~`#]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const targetLang = AI_SPEECH_LOCALES[lang] || 'en-US';
      const voices = window.speechSynthesis.getVoices();

      let voice =
        voices.find((v) => v.lang === targetLang) ||
        voices.find((v) => v.lang.startsWith(lang)) ||
        voices.find((v) => v.lang.startsWith(targetLang.split('-')[0]));

      if (voice) utterance.voice = voice;
      utterance.lang = targetLang;
      utterance.rate = lang === 'th' ? 0.95 : 1;
      utterance.pitch = 1;

      window.speechSynthesis.speak(utterance);
    },
    [isSpeakingEnabled]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    setMessages([
      {
        id: 'greeting',
        text: t('ai.greeting'),
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  }, [language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) return;
        const text = await res.text();
        if (!text) return;
        const data = JSON.parse(text) as Product[];
        if (Array.isArray(data) && data.length > 0) setProducts(data);
      } catch (error) {
        console.error('AI Chat failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const resolveCatalog = useCallback(async () => {
    if (products.length > 0) return products;
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (!res.ok) return products;
      const text = await res.text();
      if (!text) return products;
      const data = JSON.parse(text) as Product[];
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        return data;
      }
    } catch {
      /* ignore */
    }
    return products;
  }, [products]);

  const replyWithText = useCallback(
    async (userText: string, intent?: AiQuickIntent) => {
      const timestamp = new Date();
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${timestamp.getTime()}`,
          text: userText,
          sender: 'user',
          timestamp,
        },
      ]);
      setIsTyping(true);

      const catalog = await resolveCatalog();

      setTimeout(() => {
        const responseText = generateAIResponse(userText, catalog, intent);
        const aiTimestamp = new Date();
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${aiTimestamp.getTime()}`,
            text: responseText,
            sender: 'ai',
            timestamp: aiTimestamp,
          },
        ]);
        setIsTyping(false);
        speakMessage(responseText, language);
      }, 800);
    },
    [generateAIResponse, language, resolveCatalog, speakMessage]
  );

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    await replyWithText(text);
  };

  const handleQuickAction = async (intent: AiQuickIntent) => {
    const labelKey =
      intent === 'list'
        ? 'ai.quick_all'
        : intent === 'cheap'
          ? 'ai.quick_cheap'
          : 'ai.quick_recommend';
    await replyWithText(t(labelKey), intent);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    const limitedX = Math.min(Math.max(newX, -(window.innerWidth - 80)), 0);
    const limitedY = Math.min(Math.max(newY, -(window.innerHeight - 80)), 0);
    if (Math.abs(limitedX - position.x) > 1 || Math.abs(limitedY - position.y) > 1) {
      hasMovedRef.current = true;
      setPosition({ x: limitedX, y: limitedY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const quickActions: { intent: AiQuickIntent; label: string }[] = [
    { intent: 'list', label: t('ai.quick_all') },
    { intent: 'cheap', label: t('ai.quick_cheap') },
    { intent: 'recommend', label: t('ai.quick_recommend') },
  ];

  return (
    <>
      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={() => {
          if (!hasMovedRef.current) setIsOpen(!isOpen);
        }}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
          touchAction: 'none',
        }}
        className={`fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 bg-[#8b0000] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 group overflow-hidden border-2 border-white cursor-move select-none ${isDragging ? 'scale-110 shadow-red-900/40 opacity-90' : ''}`}
        aria-label={t('ai.tooltip')}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative w-full h-full pointer-events-none">
            <img src="/logos/Thebottleclub.jpg" alt="" className="w-full h-full object-cover" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse z-10" />
          </div>
        )}
        {!isOpen && !isDragging && (
          <div className="absolute right-16 bg-white text-stone-800 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-wider border border-stone-100">
            {t('ai.tooltip')}
          </div>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 animate-in slide-in-from-bottom-5 duration-300"
          lang={language}
        >
          <div className="bg-[#8b0000] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full overflow-hidden border-2 border-white/20">
                <img src="/logos/Thebottleclub.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">{t('ai.name')}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-[10px] opacity-80 uppercase font-medium">{t('ai.online')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSpeakingEnabled(!isSpeakingEnabled);
                  if (isSpeakingEnabled) window.speechSynthesis.cancel();
                }}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
                title={isSpeakingEnabled ? t('ai.mute') : t('ai.unmute')}
                aria-label={isSpeakingEnabled ? t('ai.mute') : t('ai.unmute')}
              >
                {isSpeakingEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
                aria-label="Close"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center ${
                      msg.sender === 'user'
                        ? 'bg-stone-300'
                        : 'bg-white border border-stone-100 shadow-sm'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User size={14} />
                    ) : (
                      <img src="/logos/Thebottleclub.jpg" alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#8b0000] text-white rounded-tr-none'
                        : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                  <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 flex gap-2 overflow-x-auto no-scrollbar bg-white border-t border-stone-100">
            {quickActions.map((btn) => (
              <button
                key={btn.intent}
                type="button"
                onClick={() => handleQuickAction(btn.intent)}
                className="whitespace-nowrap px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full text-[10px] font-bold transition-colors border border-stone-200"
              >
                {btn.label}
              </button>
            ))}
          </div>

          <form
            id="chat-form"
            onSubmit={handleSend}
            className="p-4 bg-white border-t border-stone-200 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('ai.placeholder')}
              className="flex-1 bg-stone-100 border-none rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-[#8b0000] focus:bg-white transition-all outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-[#8b0000] text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-red-800 transition-colors shadow-lg shadow-red-900/20"
              aria-label={t('ai.placeholder')}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
