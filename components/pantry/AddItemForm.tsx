'use client'
import { useState } from 'react'
import { PantryItem, Category } from '@/types'

const CATEGORIES: Category[] = [
  'dairy', 'produce', 'meat', 'bakery',
  'pantry', 'frozen', 'beverages', 'other'
]

export function AddItemForm({
  onAdd
}: {
  onAdd: (item: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>) => void
}) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>('other')
  const [expiry_date, setExpiry] = useState('')
  const [quantity, setQty] = useState('')

  const submit = () => {
    if (!name.trim()) return
    onAdd({
      name,
      category,
      expiry_date: expiry_date || undefined,
      quantity: quantity || undefined
    })
    setName('')
    setExpiry('')
    setQty('')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
      <h2 className="font-semibold text-gray-700 mb-3">Add Item</h2>
      <div className="flex flex-wrap gap-3">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Item name"
          className="flex-1 min-w-[160px] border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value as Category)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="date"
          value={expiry_date}
          onChange={e => setExpiry(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        />
        <input
          value={quantity}
          onChange={e => setQty(e.target.value)}
          placeholder="Qty"
          className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-400"
        />
        <button
          onClick={submit}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
        >
          + Add
        </button>
      </div>
    </div>
  )
}