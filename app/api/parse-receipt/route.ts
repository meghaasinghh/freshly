import { groq } from '@/lib/claude'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { text } = await req.json()
  const today = new Date().toISOString().split('T')[0]

  const msg = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Extract grocery items from this receipt and estimate expiry dates from today (${today}). Return ONLY valid JSON with no markdown. Format: {"items":[{"name":"...","category":"dairy|produce|meat|bakery|pantry|frozen|beverages|other","expiry_date":"YYYY-MM-DD","quantity":"...","unit":"..."}]}. Use realistic estimates: milk 7d, bread 5d, produce 5-10d, meat 3-5d, yogurt 14d, cheese 21d. Receipt: ${text}`
    }]
  })

  const raw = msg.choices[0].message.content!
    .replace(/```json|```/g, '')
    .trim()

  return NextResponse.json(JSON.parse(raw))
}