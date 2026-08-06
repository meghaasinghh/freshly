import { differenceInDays, parseISO } from 'date-fns'
import { ExpiryStatus } from '@/types'

export function daysUntilExpiry(expiryDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return differenceInDays(parseISO(expiryDate), today)
}

export function getExpiryStatus(expiryDate?: string): ExpiryStatus {
  if (!expiryDate) return 'unknown'
  const days = daysUntilExpiry(expiryDate)
  if (days < 0) return 'expired'
  if (days <= 3) return 'critical'
  if (days <= 7) return 'warning'
  return 'fresh'
}

export function expiryLabel(expiryDate?: string): string {
  if (!expiryDate) return 'No expiry set'
  const days = daysUntilExpiry(expiryDate)
  if (days < 0) return `Expired ${Math.abs(days)}d ago`
  if (days === 0) return 'Expires today!'
  if (days === 1) return 'Tomorrow'
  return `${days} days left`
}

export const STATUS_STYLES: Record<ExpiryStatus, string> = {
  expired:  'bg-red-100 text-red-700 border-red-200',
  critical: 'bg-orange-100 text-orange-700 border-orange-200',
  warning:  'bg-yellow-100 text-yellow-700 border-yellow-200',
  fresh:    'bg-green-100 text-green-700 border-green-200',
  unknown:  'bg-gray-100 text-gray-500 border-gray-200',
}