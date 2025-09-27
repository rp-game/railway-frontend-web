import * as React from "react"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { CartButton, CartIcon } from "~/components/cart/cart-button"
import { APP_CONFIG } from "~/lib/constants"
import { cn } from "~/lib/utils"

interface HeaderProps {
  className?: string
  showBackButton?: boolean
  title?: string
  actions?: React.ReactNode
}

export function Header({ className, showBackButton = false, title, actions }: HeaderProps) {
  return (
    <header className={cn("bg-white border-b border-gray-200 sticky top-0 z-40", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-800 hover:text-gray-900"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Quay lại
                </Button>
              </Link>
            )}

            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚄</span>
                </div>
                <span className="font-bold text-lg text-gray-900 hidden sm:block">
                  {title || APP_CONFIG.name}
                </span>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Trang chủ
              </Link>
              <Link
                to="/browse"
                className="text-gray-800 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Khám phá thực đơn
              </Link>
              <Link
                to="/trains"
                className="text-gray-800 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Chuyến tàu
              </Link>
            </nav>

            {/* Cart Button - Desktop */}
            <div className="hidden md:block">
              <CartButton />
            </div>

            {actions}
          </div>
        </div>
      </div>
    </header>
  )
}

interface MobileTabsProps {
  currentTab: string
  onTabChange: (tab: string) => void
}

export function MobileTabs({ currentTab, onTabChange }: MobileTabsProps) {
  const tabs = [
    { id: 'browse', label: 'Duyệt', icon: '🍽️', route: '/browse' },
    { id: 'scan', label: 'Quét QR', icon: '📱', route: '/' },
    { id: 'cart', label: 'Giỏ hàng', icon: '🛒', route: '/cart' },
    { id: 'trains', label: 'Tàu', icon: '🚄', route: '/trains' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
      <div className="grid grid-cols-4">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.route}
            className={cn(
              "flex flex-col items-center py-2 px-1 text-xs",
              currentTab === tab.id
                ? "text-blue-600 bg-blue-50"
                : "text-gray-800 hover:text-gray-900"
            )}
          >
            <div className="relative">
              <span className="text-lg mb-1">{tab.icon}</span>
              {tab.id === 'cart' && (
                <div className="absolute -top-1 -right-1">
                  <CartIcon showBadge={true} />
                </div>
              )}
            </div>
            <span className="truncate">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}