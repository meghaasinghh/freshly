'use client'
import { useEffect, useRef, useState } from 'react'
import { PantryItem, Category } from '@/types'

interface Props {
  onItemFound: (item: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>) => void
}

export function BarcodeScanner({ onItemFound }: Props) {
  const scannerRef = useRef<HTMLDivElement>(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const quaggaRef = useRef<any>(null)

  const stopScanner = () => {
    if (quaggaRef.current) {
      quaggaRef.current.stop()
      quaggaRef.current = null
    }
    setScanning(false)
  }

  const startScanner = async () => {
    setError('')
    setSuccess('')
    setScanning(true)

    const Quagga = (await import('quagga')).default
    quaggaRef.current = Quagga

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: scannerRef.current!,
          constraints: {
            facingMode: 'environment',
            width: 480,
            height: 320,
          },
        },
        decoder: {
          readers: [
            'ean_reader',
            'ean_8_reader',
            'upc_reader',
            'upc_e_reader',
          ],
        },
      },
      (err: any) => {
        if (err) {
          setError('Could not access camera. Please allow camera permission.')
          setScanning(false)
          return
        }
        Quagga.start()
      }
    )

    Quagga.onDetected(async (result: any) => {
      const code = result.codeResult.code
      if (!code) return

      stopScanner()
      setLoading(true)

      try {
        const res = await fetch(`/api/barcode/${code}`)
        if (!res.ok) {
          setError(`Barcode ${code} not found in database. Add manually.`)
          setLoading(false)
          return
        }
        const product = await res.json()
        onItemFound({
          name: product.name,
          category: (product.category as Category) || 'other',
          barcode: code,
        })
        setSuccess(`✅ Found: ${product.name}`)
      } catch (e) {
        setError('Failed to look up product. Try again.')
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    return () => stopScanner()
  }, [])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📷</span>
        <div>
          <h2 className="font-semibold text-gray-900">Barcode Scanner</h2>
          <p className="text-xs text-gray-400">
            Point your camera at a product barcode to auto-fill details
          </p>
        </div>
      </div>

      {/* Camera view */}
      {scanning && (
        <div className="relative mb-4 rounded-lg overflow-hidden bg-black">
          <div ref={scannerRef} className="w-full h-64" />
          {/* Scanning overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-green-400 w-48 h-24 rounded-lg" />
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs">
            Align barcode within the green box
          </p>
        </div>
      )}

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

      {loading && (
        <div className="text-center py-4 text-gray-400 text-sm mb-3">
          🔍 Looking up product...
        </div>
      )}

      <div className="flex gap-3">
        {!scanning ? (
          <button
            onClick={startScanner}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-semibold transition"
          >
            📷 Start Camera
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold transition"
          >
            ⏹ Stop Camera
          </button>
        )}
      </div>
    </div>
  )
}