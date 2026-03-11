import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">
        Les plus belles randonnées de France
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
        Fiches détaillées, traces GPX, dénivelé, difficulté et photos pour toutes les randonnées pédestres en France.
      </p>
      <Link
        href="/randonnees"
        className="inline-block bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Explorer les randonnées
      </Link>
    </main>
  )
}
