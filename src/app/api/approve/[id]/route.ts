import { NextRequest, NextResponse } from 'next/server'
import { approveTrail } from '@/lib/db'
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
    const trail = await approveTrail(trailId)

    if (!trail) {
      return NextResponse.json({ error: 'Randonnée introuvable' }, { status: 404 })
    }

    // Revalidation ISR (= reconstruire la page statique de cette randonnée)
    // La page devient visible sur le site en quelques secondes
    if (trail.slug) {
      revalidatePath(`/randonnee/${trail.slug}`)
    }
    revalidatePath('/randonnees')
    revalidatePath('/admin/queue')

    return NextResponse.json({ success: true, trail })
  } catch (err) {
    console.error('Erreur approbation:', err)
    return NextResponse.json(
      { error: 'Erreur lors de l\'approbation' },
      { status: 500 }
    )
  }
}
