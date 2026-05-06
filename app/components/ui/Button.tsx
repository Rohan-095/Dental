'use client'

import { motion, type TargetAndTransition } from 'framer-motion'

type Variant = 'heroPrimary' | 'heroSecondary' | 'lightPrimary' | 'lightSecondary' | 'emergencyPrimary' | 'ghost' | 'nav'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

const VARIANTS: Record<Variant, {
  style: React.CSSProperties
  hover: TargetAndTransition
  tap: TargetAndTransition
  base: string
}> = {
  heroPrimary: {
    style: { background: '#79F2C0', color: '#08110D', boxShadow: '0 0 28px rgba(121,242,192,0.30)' },
    hover: { scale: 1.05, y: -2, boxShadow: '0 0 44px rgba(121,242,192,0.52)' },
    tap: { scale: 0.97 },
    base: 'font-semibold',
  },
  heroSecondary: {
    style: {
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.20)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: 'rgba(255,255,255,0.88)',
    },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.97 },
    base: 'font-medium',
  },
  lightPrimary: {
    style: { background: '#0F172A', color: '#FFFFFF' },
    hover: { scale: 1.04, y: -2 },
    tap: { scale: 0.97 },
    base: 'font-semibold',
  },
  lightSecondary: {
    style: {
      background: 'rgba(255,255,255,0.72)',
      color: '#0F172A',
      border: '1px solid rgba(15,23,42,0.14)',
    },
    hover: { scale: 1.04, y: -2 },
    tap: { scale: 0.97 },
    base: 'font-medium',
  },
  emergencyPrimary: {
    style: { background: '#FF8A4C', color: '#321407', boxShadow: '0 0 28px rgba(255,138,76,0.32)' },
    hover: { scale: 1.04, y: -2, boxShadow: '0 0 44px rgba(255,138,76,0.52)' },
    tap: { scale: 0.97 },
    base: 'font-semibold',
  },
  ghost: {
    style: { background: 'transparent', color: 'rgba(255,255,255,0.68)', border: '1px solid rgba(255,255,255,0.14)' },
    hover: { scale: 1.04, y: -2 },
    tap: { scale: 0.97 },
    base: 'font-medium',
  },
  nav: {
    style: { background: '#79F2C0', color: '#08110D' },
    hover: { scale: 1.04 },
    tap: { scale: 0.97 },
    base: 'font-semibold',
  },
}

const SIZES: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm rounded-full gap-1.5',
  md: 'px-7 py-3.5 text-[15px] rounded-full gap-2',
  lg: 'px-9 py-4 text-base rounded-full gap-2.5',
}

const BASE = 'inline-flex items-center justify-center transition-colors'

export default function Button({
  variant = 'lightPrimary',
  size = 'md',
  href,
  className = '',
  children,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const config = VARIANTS[variant]
  const sizeClass = SIZES[size]
  const cls = `${BASE} ${sizeClass} ${config.base} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        style={config.style}
        whileHover={config.hover}
        whileTap={config.tap}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={cls}
      style={config.style}
      whileHover={config.hover}
      whileTap={config.tap}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}
