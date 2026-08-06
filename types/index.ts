export type Category = 'dairy' | 'produce' | 'meat' | 'bakery' | 'pantry' | 'frozen' | 'beverages' | 'other'

export interface PantryItem {
  id: string
  user_id: string
  name: string
  category: Category
  barcode?: string
  quantity?: string
  unit?: string
  expiry_date?: string
  added_at: string
  notes?: string
}

export interface Recipe {
  name: string
  uses: string[]
  urgent_uses: string[]
  time: string
  steps: string
}

export type ExpiryStatus = 'expired' | 'critical' | 'warning' | 'fresh' | 'unknown'