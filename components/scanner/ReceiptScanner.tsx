'use client'
import { useState } from 'react'
import { PantryItem } from '@/types'

interface Props {
  onItemsFound: (items: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>[]) => void
}

export function ReceiptScanner({ onItemsFound }: Props) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const parseReceipt = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/parse-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      if (data.items && data.items.length > 0) {
        onItemsFound(data.items)
        setSuccess(`✅ Found ${data.items.length} items! Check your pantry.`)
        setText('')
      } else {
        setError('No items found. Try adding more detail to your receipt text.')
      }
    } catch (e) {
      setError('Failed to parse receipt. Try again!')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🧾</span>
        <div>
          <h2 className="font-semibold text-gray-900">Receipt Scanner</h2>
          <p className="text-xs text-gray-400">Paste your receipt text and AI will extract all items</p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Paste receipt text here...&#10;e.g. Organic Milk 1L, Greek Yogurt 500g, Chicken Breast 400g, Sourdough Bread..."
        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-400 resize-none h-32 mb-3"
      />

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-3">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-2 rounded-lg mb-3">
          {success}
        </div>
      )}

      <button
        onClick={parseReceipt}
        disabled={loading || !text.trim()}
        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-semibold transition"
      >
        {loading ? '⏳ Parsing receipt...' : '✨ Parse with AI'}
      </button>
    </div>
  )
}