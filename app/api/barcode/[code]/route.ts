import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { code: string } }
) {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${params.code}.json`
  )
  const data = await res.json()

  if (data.status !== 1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  const p = data.product
  return NextResponse.json({
    name: p.product_name || p.generic_name || 'Unknown Product',
    category: p.categories_tags?.[0]?.replace('en:', '') || 'other',
    brand: p.brands || '',
  })
}