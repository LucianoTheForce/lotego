'use client'

import React from 'react'

interface ResponsiveLayoutProps {
  children?: React.ReactNode
  mobileComponent?: React.ReactNode
  desktopComponent?: React.ReactNode
  className?: string
}

export default function ResponsiveLayout({ 
  children, 
  mobileComponent, 
  desktopComponent,
  className = '' 
}: ResponsiveLayoutProps) {
  if (mobileComponent && desktopComponent) {
    return (
      <div className={className}>
        {/* Mobile Version */}
        <div className="block lg:hidden">
          {mobileComponent}
        </div>
        
        {/* Desktop Version */}
        <div className="hidden lg:block">
          {desktopComponent}
        </div>
      </div>
    )
  }

  // Single responsive component
  return (
    <div className={className}>
      {children}
    </div>
  )
}