import { useState, useEffect } from 'react'

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 }

export function useBreakpoint(bp) {
  const [matches, setMatches] = useState(
    () => window.innerWidth < BREAKPOINTS[bp]
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BREAKPOINTS[bp] - 1}px)`)
    const handler = (e) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [bp])
  return matches
}