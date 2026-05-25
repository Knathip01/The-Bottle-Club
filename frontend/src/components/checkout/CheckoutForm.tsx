'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import type { CartItem } from '@/lib/cart';
import { readCart, subscribeCart, getEmptyCart } from '@/lib/cart';
import { User, MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { COUNTRIES } from '@/lib/checkout-translations';

interface CheckoutFormProps {
  user: any;
}

export default function CheckoutForm({ user }: CheckoutFormProps) {
  const { language, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    country: 'TH',
    province: '',
    district: '',
    subDistrict: '',
    zipcode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [otherCountry, setOtherCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const orderItems = useSyncExternalStore(subscribeCart, readCart, getEmptyCart);


  const getShippingOptions = () => {
    const subtotalAmt = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (formData.country === 'TH') {
      return [
        {
          id: 'standard',
          name: language === 'th' ? 'จัดส่งแบบมาตรฐาน' : 'Standard Delivery',
          price: subtotalAmt >= 2000 ? 0 : 100,
          desc: language === 'th' ? '3-5 วันทำการ (จัดส่งฟรีเมื่อซื้อครบ 2,000 บาท)' : '3-5 business days (Free shipping on orders over ฿2,000)',
        },
        {
          id: 'express',
          name: language === 'th' ? 'จัดส่งด่วนพิเศษ 24 ชม.' : 'Express Delivery (24 hrs)',
          price: 250,
          desc: language === 'th' ? 'จัดส่งภายใน 24 ชั่วโมงเพื่อรักษาคุณภาพสินค้าสูงสุด' : 'Delivered within 24 hours with temperature protection',
        }
      ];
    } else {
      return [
        {
          id: 'air',
          name: language === 'th' ? 'ขนส่งทางอากาศระหว่างประเทศ' : 'International Air Cargo',
          price: 950,
          desc: language === 'th' ? '3-7 วันทำการ ผ่านสายการบินขนส่งสินค้าพρίเมียม' : '3-7 business days via premium air carrier',
        },
        {
          id: 'sea',
          name: language === 'th' ? 'ขนส่งทางเรือระหว่างประเทศ (ประหยัด)' : 'International Sea Freight (Saver)',
          price: 450,
          desc: language === 'th' ? '15-30 วันทำการ ตู้คอนเทนเนอร์ปรับอุณหภูมิถนอมไวน์' : '15-30 business days with temp-controlled preservation',
        }
      ];
    }
  };


  const shippingOptions = getShippingOptions();
  const selectedShippingOption = shippingOptions.find(opt => opt.id === shippingMethod) || shippingOptions[0];
  const shippingFee = selectedShippingOption ? selectedShippingOption.price : 0;

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + shippingFee;
  const points = Math.floor(subtotal / 10);
  const priceBeforeTax = total - tax;

  const handleCheckout = async () => {
    if (orderItems.length === 0) {
      alert(t('checkout.empty_cart_alert'));
      return;
    }

    if (formData.country === 'OTHER' && !otherCountry) {
      alert(language === 'th' ? 'กรุณากรอกประเทศในการจัดส่ง' : 'Please specify the shipping country');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address || !formData.province || !formData.district || !formData.subDistrict || !formData.zipcode) {
      alert(t('checkout.complete_address_alert'));
      return;
    }

    setIsSubmitting(true);
    try {
      // 0. Filter out any invalid items from orderItems (e.g. products with no price)
      const validItems = orderItems.filter(item => item.price > 0 && item.id);
      if (validItems.length === 0) {
        alert(t('checkout.invalid_cart_alert'));
        setIsSubmitting(false);
        return;
      }

      const countryName = formData.country === 'TH'
        ? (language === 'th' ? 'ไทย' : 'Thailand')
        : otherCountry;

      // 1. Save address first
      console.log('Saving address...');
      const addressResponse = await fetch('/api/proxy/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address_line: formData.address || 'Default Address',
          subdistrict: formData.subDistrict,
          district: formData.district,
          province: formData.province,
          postal_code: formData.zipcode,
          country: countryName
        })
      });

      let addressId = 1; // Default
      if (addressResponse.ok) {
        const addrData = await addressResponse.json().catch(() => ({}));
        if (addrData && addrData.id) {
          addressId = addrData.id;
          console.log('Address saved successfully, ID:', addressId);
        }
      } else {
        const addrErrorText = await addressResponse.text();
        console.error('Address save failed:', addrErrorText);
      }

      // 2. Create order using the local Stripe API
      console.log('Creating Stripe order with items:', validItems);
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount: total,
          addressId: addressId,
          items: validItems.map(item => ({
            id: String(item.id),
            name: item.name,
            quantity: Number(item.quantity),
            price: Number(item.price)
          })),
          successUrl: `${window.location.origin}/account/orders?status=success`,
          cancelUrl: `${window.location.origin}/checkout?status=cancelled`
        })
      });

      if (!response.ok) {
        let errorMessage = t('checkout.error_alert');
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        console.error('Order creation failed:', errorMessage);
        throw new Error(errorMessage);
      }

      const orderData = await response.json();
      
      if (orderData.url) {
        console.log('Redirecting to Stripe Checkout:', orderData.url);
        localStorage.removeItem('cart');
        window.location.href = orderData.url;
      } else {
        localStorage.removeItem('cart');
        alert(t('checkout.success_alert'));
        window.location.href = '/account/orders';
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(t('checkout.error_alert'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-6">
        {t('common.home')} / {t('checkout.title')}
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
      {/* Column 1: Shipping Address */}
      <div className="flex-1 border border-stone-100 p-6">
        <h2 className="text-lg font-bold mb-8 uppercase tracking-wide">{t('checkout.shipping_address')}</h2>
        
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-stone-900 text-white rounded-full p-1"><User size={14} /></div>
            <h3 className="text-sm font-bold uppercase tracking-tight">{t('checkout.personal_info')}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.first_name')} *</label>
              <input 
                type="text" 
                value={formData.firstName}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.last_name')} *</label>
              <input 
                type="text" 
                value={formData.lastName}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.phone')} *</label>
              <input 
                type="text" 
                placeholder={t('checkout.phone')}
                value={formData.phone}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-stone-900 text-white rounded-full p-1"><MapPin size={14} /></div>
            <h3 className="text-sm font-bold uppercase tracking-tight">{t('checkout.shipping_address')}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.address')} *</label>
              <input 
                type="text" 
                placeholder={t('checkout.address')}
                value={formData.address}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.country')} *</label>
              <div className="relative">
                <select 
                  className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none bg-white appearance-none"
                  value={formData.country}
                  onChange={(e) => {
                    const selectedCountry = e.target.value;
                    setFormData({
                      ...formData,
                      country: selectedCountry,
                      province: '',
                      district: '',
                      subDistrict: '',
                      zipcode: ''
                    });
                    setShippingMethod(selectedCountry === 'TH' ? 'standard' : 'air');
                  }}
                >
                  <option value="TH">{language === 'th' ? 'ไทย' : 'Thailand'}</option>
                  <option value="OTHER">{language === 'th' ? 'ประเทศอื่นๆ' : 'Other Country'}</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>

            {formData.country === 'OTHER' && (
              <div>
                <label className="block text-[11px] font-bold text-stone-900 mb-1.5">
                  {language === 'th' ? 'ระบุประเทศ *' : 'Specify Country *'}
                </label>
                <input 
                  type="text" 
                  placeholder={language === 'th' ? 'ระบุประเทศของคุณ' : 'Enter your country'}
                  value={otherCountry}
                  className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                  onChange={(e) => setOtherCountry(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.province')} *</label>
              <input 
                type="text" 
                placeholder={t('checkout.province')}
                value={formData.province}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, province: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.district')} *</label>
              <input 
                type="text" 
                placeholder={t('checkout.district')}
                value={formData.district}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.sub_district')} *</label>
              <input 
                type="text" 
                placeholder={t('checkout.sub_district')}
                value={formData.subDistrict}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, subDistrict: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1.5">{t('checkout.zipcode')} *</label>
              <input 
                type="text" 
                placeholder={t('checkout.zipcode')}
                value={formData.zipcode}
                className="w-full border border-stone-300 p-2.5 text-xs focus:outline-none"
                onChange={(e) => setFormData({...formData, zipcode: e.target.value})}
              />
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" defaultChecked className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-stone-900" />
              <span className="text-[11px] text-stone-600">{t('checkout.use_billing')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-stone-900" />
              <span className="text-[11px] text-stone-600">{t('checkout.request_tax_invoice')}</span>
            </label>
          </div>
        </section>
      </div>

      {/* Column 2: Shipping & Payment Methods */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Shipping Method */}
        <div className="border border-stone-100 p-6">
          <h3 className="text-sm font-bold uppercase tracking-tight mb-6">{t('checkout.shipping_method')}</h3>
          
          <div className="space-y-4">
            {shippingOptions.map(option => (
              <label key={option.id} className="flex items-start gap-3 cursor-pointer group p-3 border border-stone-200 hover:border-stone-900 transition-colors">
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === option.id}
                  onChange={() => setShippingMethod(option.id)}
                  className="mt-1 w-4 h-4 border-stone-300 focus:ring-0 accent-stone-900" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold uppercase text-stone-800 group-hover:text-stone-900 transition-colors">
                      {option.name}
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      {option.price === 0 ? (language === 'th' ? 'จัดส่งฟรี' : 'FREE') : `฿${option.price.toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">
                    {option.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="border border-stone-100 p-6">
          <h3 className="text-sm font-bold uppercase tracking-tight mb-6">{t('checkout.payment_method')}</h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="w-4 h-4 border-stone-300 focus:ring-0 accent-stone-900" 
              />
              <span className="text-[11px] font-bold uppercase text-stone-600 group-hover:text-stone-900 transition-colors">{t('checkout.credit_card')}</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'promptpay'}
                onChange={() => setPaymentMethod('promptpay')}
                className="w-4 h-4 border-stone-300 focus:ring-0 accent-stone-900" 
              />
              <span className="text-[11px] font-bold uppercase text-stone-600 group-hover:text-stone-900 transition-colors">{t('checkout.promptpay')}</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'wallet'}
                onChange={() => setPaymentMethod('wallet')}
                className="w-4 h-4 border-stone-300 focus:ring-0 accent-stone-900" 
              />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase text-stone-600 group-hover:text-stone-900 transition-colors">{t('checkout.wallets')}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Column 3: Order Summary */}
      <div className="w-full lg:w-[350px]">
        <div className="bg-[#f5f5f5] border border-stone-100">
          <div className="p-6">
            <h3 className="text-sm font-bold uppercase tracking-tight mb-6">{t('checkout.order_summary')}</h3>
            <div className="flex justify-between items-center text-xs font-bold mb-4">
              <span className="uppercase">{orderItems.length} {t('checkout.items')}</span>
              <ChevronDown size={14} />
            </div>
            
            <div className="space-y-6 mb-8">
              {orderItems.map((item, idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold text-stone-800 mb-1 leading-tight">{item.name}</p>
                  <div className="flex justify-between items-center text-stone-500 font-medium">
                    <span>QTY: {item.quantity}</span>
                    <span className="text-stone-900 font-bold">฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-stone-200">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 font-medium uppercase">{t('checkout.subtotal')}</span>
                <span className="font-bold">฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 font-medium uppercase">{t('checkout.points_earned')}</span>
                <span className="text-stone-800 font-bold">{points} {t('common.points')}</span>
              </div>
              <div className="flex justify-between items-center text-xs bg-stone-200/50 p-2 -mx-2">
                <span className="text-stone-500 font-medium uppercase">{t('checkout.price_pretax')}</span>
                <span className="font-bold">฿{priceBeforeTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 font-medium uppercase">Shipping Fee</span>
                <span className="font-bold">
                  {shippingFee === 0 ? (language === 'th' ? 'ฟรี' : 'FREE') : `฿${shippingFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 font-medium uppercase">{t('checkout.tax')}</span>
                <span className="font-bold">฿{tax.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                <span className="text-xs font-bold uppercase">{t('checkout.total')}</span>
                <span className="text-lg font-bold">฿{total.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isSubmitting || orderItems.length === 0}
              className={`w-full bg-[#a11a1a] text-white py-4 mt-8 text-sm font-bold uppercase hover:bg-red-800 transition-colors ${
                (isSubmitting || orderItems.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? t('checkout.processing') : t('checkout.place_order')}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
