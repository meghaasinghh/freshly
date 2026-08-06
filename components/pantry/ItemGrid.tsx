import { PantryItem } from '@/types'
import { ItemCard } from './ItemCard'

export function ItemGrid({
  items,
  onRemove
}: {
  items: PantryItem[]
  onRemove: (id: string) => void
}) {
  if (items.length === 0) return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-4xl mb-3">🛒</div>
      <p>Your pantry is empty. Add items above!</p>
    </div>
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map(item => (
        <ItemCard key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  )
}