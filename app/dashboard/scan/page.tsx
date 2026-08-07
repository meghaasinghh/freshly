'use client'
import { ReceiptScanner } from '@/components/scanner/ReceiptScanner'
import { usePantry } from '@/hooks/usePantry'
import { PantryItem } from '@/types'

export default function ScanPage() {
  const { bulkAdd } = usePantry()

  const handleItemsFound = async (
    items: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>[]
  ) => {
    await bulkAdd(items)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Scan & Import</h1>
        <p className="text-gray-400 text-sm mt-1">
          Import items from a receipt or add via barcode
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <ReceiptScanner onItemsFound={handleItemsFound} />

        {/* Barcode section - coming soon */}
        <div className="bg-white rounded-xl border border-dashed border-gray-200 p-6 text-center">
          <div className="text-3xl mb-2">📷</div>
          <h2 className="font-semibold text-gray-700 mb-1">Barcode Scanner</h2>
          <p className="text-sm text-gray-400">Coming soon — scan product barcodes with your webcam</p>
        </div>
      </div>
    </div>
  )
}