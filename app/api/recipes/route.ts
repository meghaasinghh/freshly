import { anthropic } from '@/lib/claude'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { expiring, all } = await req.json()

  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: `I have these items expiring soon: ${expiring.join(', ')}. Other items available: ${all.join(', ')}. Suggest 3 practical recipes that prioritize the expiring items. Return ONLY valid JSON, no markdown. Format: {"recipes":[{"name":"...","time":"20 mins","uses":["item1","item2"],"urgent_uses":["expiring item"],"steps":"Clear 3-4 sentence cooking instructions."}]}`
    }]
  })

  const raw = (msg.content[0] as any).text
    .replace(/```json|```/g, '')
    .trim()

  return NextResponse.json(JSON.parse(raw))
}