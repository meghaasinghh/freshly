import { getExpiryStatus, expiryLabel, STATUS_STYLES } from '@/lib/expiry'

export function ExpiryBadge({ date }: { date?: string }) {
  const status = getExpiryStatus(date)
  const label = expiryLabel(date)

  const styles: Record<string, string> = {
    expired:  'bg-red-100 text-red-700 border border-red-200',
    critical: 'bg-orange-100 text-orange-700 border border-orange-200',
    warning:  'bg-yellow-100 text-yellow-700 border border-yellow-200',
    fresh:    'bg-green-100 text-green-700 border border-green-200',
    unknown:  'bg-gray-100 text-gray-500 border border-gray-200',
  }

  const dots: Record<string, string> = {
    expired:  'bg-red-500',
    critical: 'bg-orange-500',
    warning:  'bg-yellow-500',
    fresh:    'bg-green-500',
    unknown:  'bg-gray-400',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {label}
    </span>
  )
}