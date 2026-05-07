'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Bridges ReactLenis scroll events → GSAP ScrollTrigger
// autoRaf={false} means GSAP ticker drives Lenis — required for scrub animations
function GSAPBridge() {
  const lenis = useLenis(() => ScrollTrigger.update())

  useEffect(() => {
    if (!lenis) return
    gsap.registerPlugin(ScrollTrigger)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
    }
  }, [lenis])

  return null
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
      autoRaf={false}
    >
      <GSAPBridge />
      {children}
    </ReactLenis>
  )
}
