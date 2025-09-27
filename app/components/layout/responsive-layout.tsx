/**
 * Responsive Layout Components
 *
 * Provides responsive layout utilities and components
 * for optimal mobile and desktop experience.
 */

import * as React from "react"
import { Header } from "./header"
import { MobileNavigation } from "./mobile-navigation"
import { cn } from "~/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
  showMobileNav?: boolean
  headerProps?: {
    showBackButton?: boolean
    title?: string
    actions?: React.ReactNode
  }
}

/**
 * Main app layout with responsive navigation
 */
export function AppLayout({
  children,
  showMobileNav = true,
  headerProps = {}
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header {...headerProps} />

      {/* Main content */}
      <main className={cn(
        "min-h-screen",
        showMobileNav && "pb-16 md:pb-0" // Add bottom padding for mobile nav
      )}>
        {children}
      </main>

      {/* Mobile Navigation */}
      {showMobileNav && <MobileNavigation />}
    </div>
  )
}

/**
 * Page container with responsive padding
 */
interface PageContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function PageContainer({
  children,
  className,
  size = 'lg',
  padding = 'md'
}: PageContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-4',
    md: 'px-4 py-8',
    lg: 'px-4 py-12'
  }

  return (
    <div className={cn(
      "container mx-auto",
      sizeClasses[size],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Responsive grid component
 */
interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function ResponsiveGrid({
  children,
  className,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 'md'
}: ResponsiveGridProps) {
  const gridCols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }

  const responsiveClasses = [
    cols.default && gridCols[cols.default],
    cols.sm && `sm:${gridCols[cols.sm]}`,
    cols.md && `md:${gridCols[cols.md]}`,
    cols.lg && `lg:${gridCols[cols.lg]}`,
    cols.xl && `xl:${gridCols[cols.xl]}`
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(
      "grid",
      responsiveClasses,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Mobile-optimized card component
 */
interface MobileCardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
}

export function MobileCard({
  children,
  className,
  padding = 'md',
  onClick,
  href
}: MobileCardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const baseClasses = cn(
    "bg-white rounded-lg shadow-sm border border-gray-200",
    paddingClasses[padding],
    onClick && "cursor-pointer hover:shadow-md active:scale-[0.98] transition-all",
    className
  )

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {children}
      </button>
    )
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  )
}

/**
 * Responsive stack component
 */
interface ResponsiveStackProps {
  children: React.ReactNode
  className?: string
  direction?: {
    default?: 'row' | 'col'
    sm?: 'row' | 'col'
    md?: 'row' | 'col'
    lg?: 'row' | 'col'
  }
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
}

export function ResponsiveStack({
  children,
  className,
  direction = { default: 'col', md: 'row' },
  gap = 'md',
  align = 'start',
  justify = 'start'
}: ResponsiveStackProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  }

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  }

  const responsiveDirectionClasses = [
    direction.default && directionClasses[direction.default],
    direction.sm && `sm:${directionClasses[direction.sm]}`,
    direction.md && `md:${directionClasses[direction.md]}`,
    direction.lg && `lg:${directionClasses[direction.lg]}`
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(
      "flex",
      responsiveDirectionClasses,
      gapClasses[gap],
      alignClasses[align],
      justifyClasses[justify],
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Safe area component for devices with notches
 */
export function SafeArea({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      "pt-safe-area-inset-top pb-safe-area-inset-bottom",
      "pl-safe-area-inset-left pr-safe-area-inset-right",
      className
    )}>
      {children}
    </div>
  )
}