'use client'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

const links = [
  { href: '/dashboard', label: 'Pantry', icon: '🫙' },
  { href: '/dashboard/recipes', label: 'Recipes', icon: '🍳' },
  { href: '/dashboard/scan', label: 'Scan', icon: '📷' },
]

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-3 flex items-center justify-between sticky top-0 z-50"
    >
      <Link href="/dashboard">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl">🌿</span>
          <span className="text-lg font-bold text-green-700" style={{ fontFamily: 'DM Serif Display, serif' }}>
            freshly
          </span>
        </motion.div>
      </Link>

      <div className="flex items-center gap-1">
        {links.map(link => {
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </motion.div>
            </Link>
          )
        })}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="ml-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  )
}