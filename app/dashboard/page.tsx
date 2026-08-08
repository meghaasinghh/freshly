'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePantry } from '@/hooks/usePantry'
import { useExpiry } from '@/hooks/useExpiry'
import { AddItemForm } from '@/components/pantry/AddItemForm'
import { ItemCard } from '@/components/pantry/ItemCard'

const stats = (total: number, expired: number, warning: number, fresh: number) => [
  { label: 'Total Items', value: total, color: 'text-gray-800', bg: 'bg-gray-50' },
  { label: 'Expired', value: expired, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Expiring Soon', value: warning, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Fresh', value: fresh, color: 'text-green-600', bg: 'bg-green-50' },
]

export default function Dashboard() {
  const { items, loading, addItem, removeItem } = usePantry()
  const { expired, critical, warning, fresh } = useExpiry(items)

  const sorted = [...items].sort((a, b) => {
    if (!a.expiry_date) return 1
    if (!b.expiry_date) return -1
    return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime()
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl text-gray-900 mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Your Pantry
        </h1>
        <p className="text-gray-400 text-sm">Track freshness, reduce waste.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {stats(items.length, expired.length, critical.length + warning.length, fresh.length).map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`${s.bg} rounded-2xl p-4 border border-black/5`}
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
              {s.label}
            </div>
            <div className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: 'DM Serif Display, serif' }}>
              {s.value}
            </div>
          </motion.div>
        ))}
      </div>

      <AddItemForm onAdd={addItem} />

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-400">Your pantry is empty.</p>
          <p className="text-gray-300 text-sm mt-1">Add items above or scan a receipt!</p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence>
            {sorted.map((item, i) => (
              <ItemCard key={item.id} item={item} onRemove={removeItem} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}