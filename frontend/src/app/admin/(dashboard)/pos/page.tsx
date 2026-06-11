'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Search, Monitor, ShoppingCart, Plus, Minus, Trash2, CreditCard, DollarSign, Wallet, CheckCircle2, Printer, Loader2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function AdminPOSTerminalPage() {
  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | 'promptpay'>('cash');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [changeAmount, setChangeAmount] = useState(0);
  
  // POS Order success
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState<any | null>(null);

  // Print ref
  const printAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/admin/products', { cache: 'no-store' });
        if (!res.ok) throw new Error();
        const json = await res.json();
        setProducts(json.products);
      } catch (err) {
        console.error('Failed to load products for POS', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (prod: Product) => {
    if (prod.stock <= 0) {
      alert('สินค้านี้หมดสต็อกชั่วคราว');
      return;
    }
    
    setCart(prev => {
      const existing = prev.find(item => item.product.id === prod.id);
      if (existing) {
        if (existing.quantity >= prod.stock) {
          alert('จำนวนในตะกร้าถึงจำนวนสต็อกที่มีแล้ว');
          return prev;
        }
        return prev.map(item => item.product.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product: prod, quantity: 1 }];
    });
  };

  const handleUpdateQty = (prodId: number, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === prodId);
      if (!existing) return prev;
      
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter(item => item.product.id !== prodId);
      }
      
      if (delta > 0 && newQty > existing.product.stock) {
        alert('สต็อกสินค้าไม่เพียงพอ');
        return prev;
      }

      return prev.map(item => item.product.id === prodId ? { ...item, quantity: newQty } : item);
    });
  };

  const handleRemoveFromCart = (prodId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== prodId));
  };

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const vatRate = 0.07;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  // Handle change calculations
  useEffect(() => {
    const cash = parseFloat(receivedAmount || '0');
    setChangeAmount(Math.max(0, cash - total));
  }, [receivedAmount, total]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    if (paymentMethod === 'cash') {
      const cash = parseFloat(receivedAmount || '0');
      if (isNaN(cash) || cash < total) {
        alert('กรุณากรอกจำนวนเงินสดที่ได้รับให้เพียงพอกับยอดชำระ');
        return;
      }
    }

    setCheckoutLoading(true);
    try {
      // Create local POS order
      const orderData = {
        order_type: 'pos',
        payment_method: paymentMethod,
        subtotal_amount: subtotal,
        shipping_fee: 0,
        total_amount: total,
        received_amount: paymentMethod === 'cash' ? parseFloat(receivedAmount) : total,
        change_amount: paymentMethod === 'cash' ? changeAmount : 0,
        status: 'delivered', // POS is delivered instantly
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) {
        throw new Error('บันทึกออเดอร์ POS ล้มเหลว');
      }

      const json = await res.json();
      
      // Update local stocks
      setProducts(prev => prev.map(p => {
        const cartItem = cart.find(item => item.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      }));

      setSuccessOrder({
        id: json.orderId || Math.floor(Math.random() * 9000) + 1000,
        date: new Date().toLocaleString('th-TH'),
        items: [...cart],
        subtotal,
        vat,
        total,
        received: paymentMethod === 'cash' ? parseFloat(receivedAmount) : total,
        change: paymentMethod === 'cash' ? changeAmount : 0,
        method: paymentMethod
      });

      // Clear cart
      setCart([]);
      setReceivedAmount('');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter products locally for search
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString().includes(search));

  return (
    <div className="space-y-6 select-none font-sans h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-serif text-stone-100 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-red-500" /> จุดขายหน้าร้าน POS Terminal
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">ระบบค้นหาสินค้า และรับชำระเงินด่วนหน้าร้าน</p>
        </div>
      </div>

      {/* POS Grid split */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Product Search & list */}
        <div className="flex-1 bg-stone-900 border border-white/5 rounded-2xl p-6 flex flex-col min-h-0">
          {/* Search bar */}
          <div className="relative mb-6 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="ค้นหาไวน์ด่วน หรือ บาร์โค้ดสินค้า..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-950 border border-white/10 rounded-xl text-stone-200 text-xs placeholder:text-stone-700 focus:outline-none focus:border-red-800 transition"
            />
          </div>

          {/* Product grid list */}
          <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 pr-1">
            {loading ? (
              <div className="h-full flex items-center justify-center text-xs text-stone-600 font-semibold animate-pulse">
                กำลังโหลดรายการสินค้าคลัง...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-stone-500 font-semibold">
                ไม่พบสินค้าในรายการที่ค้นหา
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => handleAddToCart(prod)}
                    className="p-4 bg-stone-950 hover:bg-stone-850/50 border border-white/5 hover:border-red-800/30 rounded-xl flex flex-col justify-between text-left transition select-none cursor-pointer h-32 group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-stone-200 group-hover:text-red-400 transition truncate w-full">{prod.name}</h4>
                      <p className="text-[10px] text-stone-500 mt-1 uppercase font-semibold">Code: #{prod.id}</p>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-white/5">
                      <span className="text-xs font-black text-stone-100">฿{prod.price.toLocaleString('th-TH')}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        prod.stock === 0 
                          ? 'bg-red-500/10 text-red-400' 
                          : prod.stock <= 5 
                            ? 'bg-amber-500/10 text-amber-400' 
                            : 'bg-stone-900 text-stone-400'
                      }`}>
                        สต็อก {prod.stock}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Cart Summary & payment details */}
        <div className="w-full lg:w-[420px] bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-0 shrink-0">
          <div className="flex flex-col min-h-0 flex-1">
            <h3 className="text-sm font-bold text-stone-100 font-serif mb-4 flex items-center gap-2 border-b border-white/5 pb-3 shrink-0">
              <ShoppingCart className="w-4.5 h-4.5 text-red-500" /> รายการชำระเงิน POS
            </h3>

            {/* Cart products list */}
            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 py-2 divide-y divide-white/5 pr-1">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-600 gap-3">
                  <ShoppingCart className="w-12 h-12" />
                  <p className="text-xs font-bold">ไม่มีสินค้าในตะกร้าขายหน้าร้าน</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-stone-200 truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">฿{item.product.price.toLocaleString()}/ชิ้น</p>
                    </div>
                    
                    {/* Qty Adjustment */}
                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQty(item.product.id, -1)}
                        className="w-6 h-6 rounded bg-stone-950 border border-white/10 hover:border-red-800/30 text-stone-400 hover:text-white cursor-pointer flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-stone-200 text-xs w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(item.product.id, 1)}
                        className="w-6 h-6 rounded bg-stone-950 border border-white/10 hover:border-red-800/30 text-stone-400 hover:text-white cursor-pointer flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Delete */}
                    <button
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      className="p-1.5 hover:bg-red-950/20 text-stone-500 hover:text-red-400 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Calculations summaries */}
            <div className="bg-stone-950 border border-white/5 rounded-xl p-4.5 space-y-2.5 text-xs shrink-0 mt-4">
              <div className="flex justify-between text-stone-400 font-medium">
                <span>ราคาสินค้า</span>
                <span>฿{subtotal.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-stone-400 font-medium">
                <span>ภาษี VAT 7%</span>
                <span>฿{vat.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-stone-150 font-black text-sm pt-2.5 border-t border-white/5">
                <span>ยอดชำระทั้งสิ้น</span>
                <span>฿{total.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Payment forms details */}
            {cart.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/5 shrink-0 mt-4">
                {/* Method selector */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 cursor-pointer transition border ${
                      paymentMethod === 'cash' 
                        ? 'bg-red-850/10 text-red-400 border-red-800/20' 
                        : 'bg-stone-950 text-stone-500 border-white/5 hover:text-stone-300'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>เงินสด</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('transfer')}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 cursor-pointer transition border ${
                      paymentMethod === 'transfer' 
                        ? 'bg-red-850/10 text-red-400 border-red-800/20' 
                        : 'bg-stone-950 text-stone-500 border-white/5 hover:text-stone-300'
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>โอนเงิน</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 cursor-pointer transition border ${
                      paymentMethod === 'promptpay' 
                        ? 'bg-red-850/10 text-red-400 border-red-800/20' 
                        : 'bg-stone-950 text-stone-500 border-white/5 hover:text-stone-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>พร้อมเพย์</span>
                  </button>
                </div>

                {/* Cash payment calculations form */}
                {paymentMethod === 'cash' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-stone-500 uppercase tracking-widest block">เงินสดที่รับมา</label>
                      <input
                        type="number"
                        placeholder="เช่น 3000"
                        value={receivedAmount}
                        onChange={(e) => setReceivedAmount(e.target.value)}
                        className="w-full p-2.5 bg-stone-950 border border-white/10 rounded-xl text-stone-200 text-xs font-bold focus:outline-none focus:border-red-800 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-stone-500 uppercase tracking-widest block">เงินทอนลูกค้า</label>
                      <div className="w-full p-2.5 bg-stone-950 border border-white/10 rounded-xl text-emerald-400 text-xs font-black">
                        ฿{changeAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Checkout submission */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || checkoutLoading}
            className="w-full py-4 bg-red-850 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-950/20 hover:shadow-red-900/30 flex items-center justify-center gap-2 cursor-pointer transition shrink-0 mt-4"
          >
            {checkoutLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'สร้างออเดอร์ POS / พิมพ์ใบเสร็จ'
            )}
          </button>
        </div>
      </div>

      {/* POS Receipt print modal */}
      {successOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-3xl w-full max-w-sm p-6 shadow-2xl space-y-6 flex flex-col justify-between">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg">ทำรายการเช็คเอาต์สำเร็จ!</h3>
              <p className="text-xs text-stone-500 mt-1">ใบเสร็จออเดอร์ #{successOrder.id}</p>
            </div>

            {/* Print Area Markup */}
            <div ref={printAreaRef} className="bg-stone-50 p-4 border border-stone-200 rounded-2xl text-[11px] leading-relaxed font-mono text-stone-700">
              <div className="text-center font-bold border-b border-stone-300 pb-2 mb-2 uppercase tracking-wide">
                THE BOTTLE CLUB
              </div>
              <p>ORDER ID: #{successOrder.id}</p>
              <p>DATE: {successOrder.date}</p>
              <p className="border-b border-stone-200 pb-1 mb-2">METHOD: {successOrder.method.toUpperCase()}</p>
              
              {successOrder.items.map((item: any) => (
                <div key={item.product.id} className="flex justify-between font-medium">
                  <span>{item.product.name.slice(0, 18)}.. x{item.quantity}</span>
                  <span>฿{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="border-t border-stone-300 pt-2 mt-2 font-bold space-y-0.5">
                <div className="flex justify-between">
                  <span>SUBTOTAL:</span>
                  <span>฿{successOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT 7%:</span>
                  <span>฿{successOrder.vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-stone-300 pt-1 mt-1 font-black">
                  <span>TOTAL PAID:</span>
                  <span>฿{successOrder.total.toLocaleString()}</span>
                </div>
                {successOrder.method === 'cash' && (
                  <>
                    <div className="flex justify-between text-stone-500 font-semibold">
                      <span>RECEIVED CASH:</span>
                      <span>฿{successOrder.received.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-extrabold">
                      <span>CHANGE:</span>
                      <span>฿{successOrder.change.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <button
                onClick={handlePrint}
                className="py-3 bg-red-800 hover:bg-red-750 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-red-950/20 transition"
              >
                <Printer className="w-4 h-4" /> พิมพ์ใบเสร็จ
              </button>
              <button
                onClick={() => setSuccessOrder(null)}
                className="py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer"
              >
                ทำรายการใหม่
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
