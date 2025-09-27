/**
 * Mobile Navigation Components
 *
 * Enhanced mobile navigation with proper route detection,
 * cart integration, and responsive behavior.
 */

import * as React from "react"
import { Link, useLocation } from "react-router"
import { CartIcon } from "~/components/cart/cart-button"
import { cn } from "~/lib/utils"

interface MobileNavTab {
  id: string
  label: string
  icon: string
  route: string
  badge?: boolean
  exactMatch?: boolean
}

const navigationTabs: MobileNavTab[] = [
  {
    id: 'home',
    label: 'Trang chủ',
    icon: '🏠',
    route: '/',
    exactMatch: true
  },
  {
    id: 'browse',
    label: 'Duyệt',
    icon: '🍽️',
    route: '/browse'
  },
  {
    id: 'trains',
    label: 'Tàu',
    icon: '🚄',
    route: '/trains'
  },
  {
    id: 'cart',
    label: 'Giỏ hàng',
    icon: '🛒',
    route: '/cart',
    badge: true
  },
]

export function MobileNavigation() {
  const location = useLocation()

  const getCurrentTab = (pathname: string): string => {
    // Exact match for home
    if (pathname === '/') return 'home'

    // Find matching tab
    const matchingTab = navigationTabs.find(tab => {
      if (tab.exactMatch) {
        return pathname === tab.route
      }
      return pathname.startsWith(tab.route)
    })

    return matchingTab?.id || 'home'
  }

  const currentTab = getCurrentTab(location.pathname)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navigationTabs.map((tab) => (
          <MobileNavItem
            key={tab.id}
            tab={tab}
            isActive={currentTab === tab.id}
          />
        ))}
      </div>

      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  )
}

interface MobileNavItemProps {
  tab: MobileNavTab
  isActive: boolean
}

function MobileNavItem({ tab, isActive }: MobileNavItemProps) {
  return (
    <Link
      to={tab.route}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors relative",
        isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-800 hover:text-gray-900 active:bg-gray-100"
      )}
    >
      <div className="relative flex items-center justify-center mb-1">
        {tab.badge && tab.id === 'cart' ? (
          <CartIcon className="text-lg" showBadge={true} />
        ) : (
          <span className="text-lg">{tab.icon}</span>
        )}

        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
        )}
      </div>

      <span className={cn(
        "truncate font-medium",
        isActive ? "text-blue-600" : "text-gray-800"
      )}>
        {tab.label}
      </span>
    </Link>
  )
}

/**
 * Mobile-specific layout wrapper
 */
export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content with bottom padding for mobile nav */}
      <div className="pb-16 md:pb-0">
        {children}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  )
}

/**
 * Hook to detect mobile/desktop
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

/**
 * Responsive container component
 */
interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = 'lg'
}: ResponsiveContainerProps) {
  const containerClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      "container mx-auto px-4",
      containerClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  )
}