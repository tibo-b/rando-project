import { NextRequest, NextResponse } from 'next/server'
import { rejectTrail } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const trailId = parseInt(id, 10)

  if (isNaN(trailId)) {
    return NextResponse.json({ error: 'Identifiant invalide' }, { status: 400 })
  }

  try {
    const trail = await rejectTrail(trailId)

    if (!trail) {
      return NextResponse.json({ error: 'Randonnée introuvable' }, { status: 404 })
    }

    revalidatePath('/admin/queue')

    return NextResponse.json({ success: true, trail })
  } catch (err) {
    console.error('Erreur rejet:', err)
    return NextResponse.json(
      { error: 'Erreur lors du rejet' },
      { status: 500 }
    )
  }
}
