import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Route appelée par n8n (l'outil d'automatisation) pour forcer la mise à jour
// d'une page après modification — protégée par un mot de passe secret
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { path } = body as { path?: string }

  if (path) {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path })
  }

  // Sans chemin précis, on revalide les pages principales
  revalidatePath('/randonnees')
  revalidatePath('/admin/queue')

  return NextResponse.json({ revalidated: true })
}
