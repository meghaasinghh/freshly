import { getExpiryStatus, daysUntilExpiry } from '@/lib/expiry'
import { PantryItem, ExpiryStatus } from '@/types'

export function useExpiry(items: PantryItem[]) {
  const byStatus = (status: ExpiryStatus) =>
    items.filter(i => getExpiryStatus(i.expiry_date) === status)

  return {
    expired:  byStatus('expired'),
    critical: byStatus('critical'),
    warning:  byStatus('warning'),
    fresh:    byStatus('fresh'),
    expiringSoon: items.filter(i => {
      const days = i.expiry_date ? daysUntilExpiry(i.expiry_date) : 999
      return days >= 0 && days <= 7
    }),
  }
}