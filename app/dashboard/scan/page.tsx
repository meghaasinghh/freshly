'use client'
import { useState } from 'react'
import { ReceiptScanner } from '@/components/scanner/ReceiptScanner'
import { BarcodeScanner } from '@/components/scanner/BarcodeScanner'
import { usePantry } from '@/hooks/usePantry'
import { PantryItem } from '@/types'

export default function ScanPage() {
  const { bulkAdd, addItem } = usePantry()
  const [lastAdded, setLastAdded] = useState<string | null>(null)

  const handleItemsFound = async (
    items: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>[]
  ) => {
    await bulkAdd(items)
  }

  const handleBarcodeItem = async (
    item: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>
  ) => {
    await addItem(item)
    setLastAdded(item.name)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Scan & Import</h1>
        <p className="text-gray-400 text-sm mt-1">
          Import items from a receipt or scan a barcode
        </p>
      </div>

      {lastAdded && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
          ✅ <strong>{lastAdded}</strong> added to your pantry! Set the expiry date from the dashboard.
        </div>
      )}

      <div className="flex flex-col gap-6">
        <BarcodeScanner onItemFound={handleBarcodeItem} />
        <ReceiptScanner onItemsFound={handleItemsFound} />
      </div>
    </div>
  )
}