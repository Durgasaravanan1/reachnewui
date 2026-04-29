import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function formatDate(iso, fmt = 'MMM d, yyyy') {
  return format(parseISO(iso), fmt)
}

export function formatDateTime(iso) {
  return format(parseISO(iso), 'MMM d, yyyy · h:mm a')
}

export function formatRelative(iso) {
  return formatDistanceToNow(parseISO(iso), { addSuffix: true })
}

export function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}

export function formatPercent(n, decimals = 1) {
  return `${n.toFixed(decimals)}%`
}

export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount)
}