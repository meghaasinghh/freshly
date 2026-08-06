'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link href="/dashboard" className="text-xl font-bold text-green-700">
        🌿 Freshly
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-green-700 font-medium transition"
        >
          Pantry
        </Link>
        <Link
          href="/dashboard/recipes"
          className="text-sm text-gray-500 hover:text-green-700 font-medium transition"
        >
          Recipes
        </Link>
        <Link
          href="/dashboard/scan"
          className="text-sm text-gray-500 hover:text-green-700 font-medium transition"
        >
          Scan
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 px-4 py-1.5 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}