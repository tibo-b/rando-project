'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  trailId: number
  dbConnected: boolean
}

export default function ApproveRejectButtons({ trailId, dbConnected }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)
  const [done, setDone] = useState<'approved' | 'rejected' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleAction(action: 'approve' | 'reject') {
    if (!dbConnected) {
      setError('Base de données non connectée — action impossible en mode démo')
      return
    }

    setLoading(action)
    setError(null)

    try {
      const res = await fetch(
        `/api/${action === 'approve' ? 'approve' : 'reject'}/${trailId}`,
        { method: 'POST' }
      )

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Erreur inconnue')
      }

      setDone(action === 'approve' ? 'approved' : 'rejected')

      // Retour à la file d'attente après 1 seconde
      setTimeout(() => router.push('/admin/queue'), 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(null)
    }
  }

  if (done) {
    return (
      <div className={`rounded-lg p-4 border text-sm font-medium text-center ${
        done === 'approved'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        {done === 'approved' ? '✓ Randonnée approuvée — mise en ligne' : '✗ Randonnée rejetée'}
        <span className="block text-xs font-normal mt-1 opacity-70">Redirection en cours...</span>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
        Action
      </h2>

      {error && (
        <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => handleAction('approve')}
          disabled={loading !== null}
          className="flex-1 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading === 'approve' ? 'Publication...' : 'Approuver et publier'}
        </button>

        <button
          onClick={() => handleAction('reject')}
          disabled={loading !== null}
          className="flex-1 bg-white text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading === 'reject' ? 'Rejet...' : 'Rejeter'}
        </button>
      </div>

      {!dbConnected && (
        <p className="mt-2 text-xs text-gray-400 text-center">
          Les boutons fonctionneront une fois la base de données lancée
        </p>
      )}
    </div>
  )
}
