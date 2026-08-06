'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { PantryItem } from '@/types'

export function usePantry() {
  const [items, setItems] = useState<PantryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pantry_items')
      .select('*')
      .order('expiry_date', { ascending: true, nullsFirst: false })
    if (error) setError(error.message)
    else setItems(data as PantryItem[])
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const addItem = async (item: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('pantry_items').insert({ ...item, user_id: user.id })
    if (!error) fetchItems()
  }

  const removeItem = async (id: string) => {
    await supabase.from('pantry_items').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const bulkAdd = async (newItems: Omit<PantryItem, 'id' | 'user_id' | 'added_at'>[]) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const rows = newItems.map(i => ({ ...i, user_id: user.id }))
    const { error } = await supabase.from('pantry_items').insert(rows)
    if (!error) fetchItems()
  }

  return { items, loading, error, addItem, removeItem, bulkAdd, refetch: fetchItems }
}