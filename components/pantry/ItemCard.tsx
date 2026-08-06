import { PantryItem } from '@/types'
import { ExpiryBadge } from './ExpiryBadge'
import { getExpiryStatus } from '@/lib/expiry'

const EMOJI: Record<string, string> = {
  dairy: '🥛', produce: '🥦', meat: '🥩', bakery: '🍞',
  pantry: '🫙', frozen: '❄️', beverages: '🧃', other: '📦'
}

const CARD_BG: Record<string, string> = {
  expired:  'border-red-200 bg-red-50',
  critical: 'border-orange-200 bg-orange-50',
  warning:  'border-yellow-200 bg-yellow-50',
  fresh:    'border-gray-200 bg-white',
  unknown:  'border-gray-200 bg-white',
}

export function ItemCard({
  item,
  onRemove
}: {
  item: PantryItem
  onRemove: (id: string) => void
}) {
  const status = getExpiryStatus(item.expiry_date)

  return (
    <div className={`relative group rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${CARD_BG[status]}`}>
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-sm transition"
      >
        ✕
      </button>
      <div className="text-3xl mb-2">{EMOJI[item.category] || '📦'}</div>
      <div className="font-semibold text-gray-900 mb-0.5">{item.name}</div>
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">{item.category}</div>
      <ExpiryBadge date={item.expiry_date} />
      {item.quantity && (
        <div className="text-xs text-gray-400 mt-1">{item.quantity} {item.unit}</div>
      )}
    </div>
  )
}