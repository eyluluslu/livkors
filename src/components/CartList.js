'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { updateCartItemQuantity, removeFromCart, getCartItems } from '@/lib/actions'

export default function CartList() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [animatingItems, setAnimatingItems] = useState(new Set())
  const [discount, setDiscount] = useState(0)
  const [promoCode, setPromoCode] = useState('')
  const [showPromoInput, setShowPromoInput] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState('standard')

  const deliveryOptions = {
    standard: { name: 'Standart Kargo', time: '3-5 gün', price: 29.99 },
    express: { name: 'Hızlı Kargo', time: '1-2 gün', price: 49.99 },
    premium: { name: 'Aynı Gün Teslimat', time: 'Aynı gün', price: 79.99 }
  }

  const loadCart = async () => {
    try {
      setLoading(true)
      const items = await getCartItems()
      setCartItems(items)
    } catch (error) {
      console.error('Sepet yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  useEffect(() => {
    if (isOpen) {
      loadCart()
    }
  }, [isOpen])

  // Sepete ekleme event'ini dinle
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart()
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const updateAction = async (formData) => {
    const cartItemId = formData.get('cartItemId')
    const quantity = parseInt(formData.get('quantity'))
    
    try {
      await updateCartItemQuantity(cartItemId, quantity)
      loadCart()
    } catch (error) {
      console.error('Miktar güncellenirken hata:', error)
    }
  }

  const applyPromoCode = () => {
    const validCodes = {
      'WELCOME10': 10,
      'STUDENT15': 15,
      'SUMMER20': 20,
      'VIP25': 25
    }
    
    if (validCodes[promoCode]) {
      setDiscount(validCodes[promoCode])
      setShowPromoInput(false)
    } else {
      alert('Geçersiz promosyon kodu!')
    }
  }

  const handleRemoveItem = async (cartItemId) => {
    setAnimatingItems(prev => new Set([...prev, cartItemId]))
    
    setTimeout(async () => {
      try {
        await removeFromCart(cartItemId)
        loadCart()
        setAnimatingItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(cartItemId)
          return newSet
        })
      } catch (error) {
        console.error('Ürün kaldırılırken hata:', error)
        setAnimatingItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(cartItemId)
          return newSet
        })
      }
    }, 300)
  }

  const handleClearCart = () => {
    if (confirm('Sepetinizdeki tüm ürünleri kaldırmak istediğinizden emin misiniz?')) {
      cartItems.forEach(item => handleRemoveItem(item.id))
    }
  }

  const handleQuantityChange = (e, item) => {
    const formData = new FormData()
    formData.append('cartItemId', item.id)
    formData.append('quantity', e.target.value)
    updateAction(formData)
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const discountAmount = (subtotal * discount) / 100
  const deliveryFee = subtotal > 500 && deliveryOption === 'standard' ? 0 : deliveryOptions[deliveryOption].price
  const total = subtotal - discountAmount + deliveryFee

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg font-medium text-sm sm:text-base flex items-center space-x-2"
      >
        <span className="text-lg sm:text-xl">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
            {cartCount}
          </span>
        )}
      </button>

      {/* Dropdown Cart */}
      {isOpen && (
        <div className="fixed top-20 right-4 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 z-30 animate-slideDown">
          <div className="bg-white rounded-2xl max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🛍️</span>
                    <div>
                      <h2 className="text-xl font-bold">Alışveriş Sepetim</h2>
                      <p className="text-purple-100 text-xs">Livkors Premium Koleksiyonu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 text-2xl font-bold bg-white/10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:rotate-90"
                  >
                    ×
                  </button>
                </div>
                {cartCount > 0 && (
                  <div className="mt-3 flex items-center justify-between bg-white/10 rounded-lg p-2 backdrop-blur-md">
                    <p className="text-purple-100 text-sm">
                      <span className="font-semibold">{cartCount}</span> ürün • 
                      <span className="font-semibold"> ₺{subtotal.toFixed(2)}</span> ara toplam
                    </p>
                    <div className="flex items-center gap-2">
                      {discount > 0 && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-bounce">
                          %{discount} İndirim!
                        </span>
                      )}
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {subtotal >= 500 ? 'Ücretsiz Kargo!' : `₺${(500 - subtotal).toFixed(2)} ile ücretsiz kargo`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Content */}
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="p-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium text-sm">Sepet yükleniyor...</p>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4 animate-bounce">🛒</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h3>
                    <p className="text-gray-600 mb-6 text-base px-4">Harika ürünlerimizi keşfedin ve alışverişe başlayın</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold shadow-lg text-base"
                    >
                      🛍️ Alışverişe Başla
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Sepet Öğeleri */}
                    {cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 ${
                          animatingItems.has(item.id) ? 'transform scale-95 opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {/* Ürün Resmi */}
                          <div className="flex-shrink-0 relative">
                            {item.product.imageUrl ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
                                <span className="text-2xl">👜</span>
                              </div>
                            )}
                          </div>

                          {/* Ürün Bilgileri */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {item.product.category?.name}
                            </p>
                            <p className="text-sm font-bold text-purple-600">
                              ₺{item.product.price.toFixed(2)}
                            </p>
                          </div>

                          {/* Miktar ve İşlemler */}
                          <div className="flex items-center space-x-2">
                            {/* Miktar Kontrolü */}
                            <form action={updateAction} className="flex items-center">
                              <input type="hidden" name="cartItemId" value={item.id} />
                              <select
                                id={`quantity-${item.id}`}
                                name="quantity"
                                defaultValue={item.quantity}
                                onChange={(e) => handleQuantityChange(e, item)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-16"
                              >
                                {[...Array(Math.min(item.product.stock, 10))].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </form>

                            {/* Kaldırma Butonu */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Sepet Özeti */}
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Ara Toplam:</span>
                        <span className="font-semibold">₺{subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between items-center mb-2 text-green-600">
                          <span className="text-sm">İndirim (%{discount}):</span>
                          <span className="font-semibold">-₺{discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold">Toplam:</span>
                        <span className="text-lg font-bold text-purple-600">₺{total.toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Satın Al
                      </button>
                    </div>

                    {/* Promosyon Kodu - Basitleştirilmiş */}
                    {!showPromoInput && discount === 0 && (
                      <div className="text-center">
                        <button
                          onClick={() => setShowPromoInput(true)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Promosyon kodu var mı?
                        </button>
                      </div>
                    )}
                    
                    {showPromoInput && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                            placeholder="Promosyon kodu"
                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                          >
                            Uygula
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  )
} 