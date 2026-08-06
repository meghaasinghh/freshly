import { getExpiryStatus, expiryLabel, STATUS_STYLES } from '@/lib/expiry'

export function ExpiryBadge({ date }: { date?: string }) {
  const status = getExpiryStatus(date)
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[status]}`}>
      {expiryLabel(date)}
    </span>
  )
}