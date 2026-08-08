'use client'
import { motion } from 'framer-motion'
import { PantryItem } from '@/types'
import { ExpiryBadge } from './ExpiryBadge'
import { getExpiryStatus } from '@/lib/expiry'

const EMOJI: Record<string, string> = {
  dairy: '🥛', produce: '🥦', meat: '🥩', bakery: '🍞',
  pantry: '🫙', frozen: '❄️', beverages: '🧃', other: '📦'
}

const CARD_STYLES: Record<string, string> = {
  expired:  'border-red-200 bg-red-50/50',
  critical: 'border-orange-200 bg-orange-50/50',
  warning:  'border-yellow-200 bg-yellow-50/50',
  fresh:    'border-gray-200/80 bg-white',
  unknown:  'border-gray-200/80 bg-white',
}

export function ItemCard({
  item,
  onRemove,
  index = 0,
}: {
  item: PantryItem
  onRemove: (id: string) => void
  index?: number
}) {
  const status = getExpiryStatus(item.expiry_date)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, shadow: 'lg' }}
      className={`relative group rounded-2xl border p-4 cursor-default ${CARD_STYLES[status]}`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      {/* Delete button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
      >
        ✕
      </motion.button>

      {/* Emoji */}
      <div className="text-3xl mb-3">
        {EMOJI[item.category] || '📦'}
      </div>

      {/* Name */}
      <div className="font-semibold text-gray-900 text-sm mb-0.5 pr-6">
        {item.name}
      </div>

      {/* Category */}
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">
        {item.category}
      </div>

      {/* Expiry badge */}
      <ExpiryBadge date={item.expiry_date} />

      {/* Quantity */}
      {item.quantity && (
        <div className="text-xs text-gray-400 mt-2">
          {item.quantity} {item.unit}
        </div>
      )}
    </motion.div>
  )
}