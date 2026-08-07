import { groq } from '@/lib/claude'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { expiring, all } = await req.json()

  const msg = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: `I have these items expiring soon: ${expiring.join(', ')}. Other items available: ${all.join(', ')}. Suggest 3 practical recipes that prioritize the expiring items. Return ONLY valid JSON, no markdown. Format: {"recipes":[{"name":"...","time":"20 mins","uses":["item1","item2"],"urgent_uses":["expiring item"],"steps":"Clear 3-4 sentence cooking instructions."}]}`
    }]
  })

  const raw = msg.choices[0].message.content!
    .replace(/```json|```/g, '')
    .trim()

  return NextResponse.json(JSON.parse(raw))
}