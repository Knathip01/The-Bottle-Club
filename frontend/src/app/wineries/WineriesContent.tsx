'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import WineriesHeader from './components/WineriesHeader'
import WineriesSidebar from './components/WineriesSidebar'
import WineriesStory from './components/WineriesStory'
import WineriesFooter from './components/WineriesFooter'

export default function WineriesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || 'San Marzano'

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [cartCount, setCartCount] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAddToCart = (wineName: string) => {
    setCartCount((prev) => prev + 1)
    setToastMessage(`Added "${wineName}" to your shopping cart!`)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  const handleScrollToWines = () => {
    router.push('/search?q=San%20Marzano')
  }

  return (
    <div className="vivino-page-wrapper selection:bg-[#ba1628] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-[#1e1e1e] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 animate-fade-in transition-all">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Navigation Bar */}
      <WineriesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cartCount}
        onCartClick={() => {
          setToastMessage(`Your cart contains ${cartCount} bottle${cartCount === 1 ? '' : 's'}`)
          setTimeout(() => setToastMessage(null), 3000)
        }}
      />

      {/* Main Winery Page Content */}
      <div className="wineryPage-module__wineryPage--R7g9a">
        {/* Background Banner */}
        <div
          data-testid="background-image"
          className="wineryPage-module__backgroundImage--3GToN"
          style={{
            backgroundImage:
              'url(https://thumbs.vivino.com/wineries/sponsorship_cards/nkuQMWkDQjG5RMLAvl1OZQ_1280x760.jpeg)',
            height: '160px',
          }}
        />

        {/* 2-Column Responsive Layout */}
        <div className="MuiContainer-root MuiContainer-maxWidthLg vivino-mui-1qsxih2">
          <div className="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3 vivino-mui-v57kt1">
            {/* Left Sidebar */}
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-md-5 MuiGrid2-grid-lg-4 vivino-mui-19if1fz">
              <WineriesSidebar onViewWines={handleScrollToWines} />
            </div>

            {/* Right Column / Content Area */}
            <div className="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-true MuiGrid2-grid-md-true MuiGrid2-grid-lg-true vivino-mui-1g4vbpd">
              {/* Winery Story, Gallery & Info */}
              <WineriesStory />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Container */}
      <div id="footer-container" data-scan="false">
        <WineriesFooter />
      </div>
    </div>
  )
}
