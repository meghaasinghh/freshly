'use client'
import { usePantry } from '@/hooks/usePantry'
import { useExpiry } from '@/hooks/useExpiry'
import { AddItemForm } from '@/components/pantry/AddItemForm'
import { ItemGrid } from '@/components/pantry/ItemGrid'

export default function Dashboard() {
  const { items, loading, addItem, removeItem } = usePantry()
  const { expired, critical, warning, fresh } = useExpiry(items)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-2">🌿 Freshly</h1>
      <p className="text-gray-400 text-sm mb-6">Track what's in your pantry, reduce food waste.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Items', val: items.length, color: 'text-gray-700' },
          { label: 'Expired', val: expired.length, color: 'text-red-600' },
          { label: 'Expiring Soon', val: critical.length + warning.length, color: 'text-yellow-600' },
          { label: 'Fresh', val: fresh.length, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.val}</div>
          </div>
        ))}
      </div>

      <AddItemForm onAdd={addItem} />

      {loading
        ? <div className="text-center py-12 text-gray-400">Loading pantry...</div>
        : <ItemGrid items={items} onRemove={removeItem} />
      }
    </div>
  )
}