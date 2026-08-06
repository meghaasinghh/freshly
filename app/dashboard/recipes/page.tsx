'use client'
import { useState } from 'react'
import { usePantry } from '@/hooks/usePantry'
import { useExpiry } from '@/hooks/useExpiry'
import { Recipe } from '@/types'

export default function RecipesPage() {
  const { items } = usePantry()
  const { expiringSoon } = useExpiry(items)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getRecipes = async () => {
    if (items.length === 0) {
      setError('Add some items to your pantry first!')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expiring: expiringSoon.map(i => i.name),
          all: items.map(i => i.name)
        })
      })
      const data = await res.json()
      setRecipes(data.recipes || [])
    } catch (e) {
      setError('Failed to get recipes. Try again!')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recipe Suggestions</h1>
          <p className="text-gray-400 text-sm mt-1">
            AI-generated recipes using your expiring ingredients
          </p>
        </div>
        <button
          onClick={getRecipes}
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          {loading ? '✨ Thinking...' : '✨ Suggest Recipes'}
        </button>
      </div>

      {/* Expiring soon banner */}
      {expiringSoon.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-orange-700 mb-2">⚡ Expiring soon — use these first:</p>
          <div className="flex flex-wrap gap-2">
            {expiringSoon.map(item => (
              <span key={item.id} className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-medium">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🍳</div>
          <p>Claude is finding the best recipes for your ingredients...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && recipes.length === 0 && !error && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">👨‍🍳</div>
          <p>Click "Suggest Recipes" to get personalized ideas<br />based on what's about to expire.</p>
        </div>
      )}

      {/* Recipe cards */}
      <div className="flex flex-col gap-4">
        {recipes.map((recipe, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">🍽️ {recipe.name}</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                ⏱ {recipe.time}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.urgent_uses?.map(u => (
                <span key={u} className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium border border-red-100">
                  ⚡ {u}
                </span>
              ))}
              {recipe.uses?.filter(u => !recipe.urgent_uses?.includes(u)).map(u => (
                <span key={u} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium border border-green-100">
                  {u}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">{recipe.steps}</p>
          </div>
        ))}
      </div>
    </div>
  )
}