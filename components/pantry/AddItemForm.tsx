'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PantryItem, Category } from '@/types'

const CATEGORIES: { value: Category; emoji: string; label: string }[] = [
  { value: 'dairy', emoji: '🥛', label: 'Dairy' },
  { value: 'produce', emoji: '🥦', label: 'Produce' },
  { value: 'meat', emoji: '🥩', label: 'Meat' },
  { value: 'bakery', emoji: '🍞', label: 'Bakery' },
  { value: 'pantry', emoji: '🫙', label: 'Pantry' },
  { value: 'frozen', emoji: '❄️', label: 'Frozen' },
  { value: 'beverages', emoji: '🧃', label: 'Beverages' },
  { value: 'other', emoji: '📦', label: 'Other' },
]

export function AddItemForm({
  onAdd,
}: {
  onAdd: (item: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>) => void
}) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>('other')
  const [expiry_date, setExpiry] = useState('')
  const [quantity, setQty] = useState('')
  const [added, setAdded] = useState(false)

  const submit = () => {
    if (!name.trim()) return
    onAdd({ name, category, expiry_date: expiry_date || undefined, quantity: quantity || undefined })
    setName(''); setExpiry(''); setQty('')
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200/80 p-5 mb-6"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">Add Item</h2>
        <AnimatePresence>
          {added && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full"
            >
              ✓ Added!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategory(cat.value)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              category === cat.value
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Item name"
          className="flex-1 min-w-[160px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50/50 transition-all"
        />
        <input
          type="date"
          value={expiry_date}
          onChange={e => setExpiry(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50/50 transition-all"
        />
        <input
          value={quantity}
          onChange={e => setQty(e.target.value)}
          placeholder="Qty"
          className="w-24 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50/50 transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={submit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          + Add
        </motion.button>
      </div>
    </motion.div>
  )
}