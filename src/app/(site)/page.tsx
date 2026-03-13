import Link from 'next/link'
import Image from 'next/image'
import { DEMO_TRAILS } from '@/lib/demo-data'
import ScrollReveal from '@/components/ui/ScrollReveal'

const DIFFICULTY_MAP = {
  tres_facile:    { label: 'Très facile',    color: 'bg-emerald-100 text-emerald-700' },
  facile:         { label: 'Facile',         color: 'bg-green-100 text-green-700' },
  moyen:          { label: 'Moyen',          color: 'bg-yellow-100 text-yellow-800' },
  difficile:      { label: 'Difficile',      color: 'bg-orange-100 text-orange-700' },
  tres_difficile: { label: 'Très difficile', color: 'bg-red-100 text-red-700' },
}

const TYPE_LABEL = {
  boucle: 'Boucle',
  aller_retour: 'Aller-retour',
  point_a_point: 'Point à point',
}

function formatDuration(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

export default function HomePage() {
  const trails = DEMO_TRAILS

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=85"
            alt="Paysage de randonnée en France"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-white/80 text-base font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              Randonnées en France
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-5 tracking-tight">
              Trouvez votre<br />prochaine aventure
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Des milliers de fiches randonnées détaillées : traces GPX, dénivelé, difficulté et photos pour préparer votre sortie.
            </p>

            <div className="glass rounded-2xl p-2 flex items-center gap-2 max-w-lg">
              <div className="flex-1 flex items-center gap-3 px-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Région, département, nom…"
                  className="flex-1 bg-transparent text-[#111111] placeholder-gray-400 text-base outline-none py-2"
                />
              </div>
              <Link
                href="/randonnees"
                className="bg-[#025C00] hover:bg-[#014800] text-white text-base font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                Explorer
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 z-10 hidden md:flex gap-3">
          {[
            { value: '10 000+', label: 'Randonnées' },
            { value: '96', label: 'Départements' },
            { value: '100%', label: 'Gratuit' },
          ].map(({ value, label }) => (
            <div key={label} className="glass rounded-xl px-4 py-3 text-center min-w-[90px]">
              <p className="text-lg font-bold text-[#111111]">{value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RANDONNÉES MISES EN AVANT ── */}
      <section className="max-w-[1440px] mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#025C00] text-sm font-semibold uppercase tracking-widest mb-2">À la une</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111]">Randonnées sélectionnées</h2>
            </div>
            <Link
              href="/randonnees"
              className="hidden md:flex items-center gap-2 text-base font-medium text-[#025C00] hover:text-[#014800] transition-colors group"
            >
              Voir toutes les randonnées
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trails.map((trail, i) => {
            const diff = DIFFICULTY_MAP[trail.difficulty]
            const href = `/randonnee/${trail.region_slug}/${trail.department_slug}/${trail.slug}`

            return (
              <ScrollReveal key={trail.id} delay={i * 80}>
                <Link href={href} className="group block bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={trail.cover_photo_url}
                      alt={trail.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diff.color}`}>
                        {diff.label}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1">
                      <span className="text-xs font-medium text-[#111111]">{TYPE_LABEL[trail.trail_type]}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1 font-medium">{trail.department_name}</p>
                    <h3 className="font-bold text-[#111111] text-base leading-snug mb-2 line-clamp-2">
                      {trail.name}
                    </h3>
                    <p className="text-base text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {trail.short_description}
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-[#F5F5F5] text-base">
                      <div className="flex items-center gap-1.5 text-[#111111] font-medium">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#025C00" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M3 12h18M3 12l4-4m-4 4 4 4" />
                        </svg>
                        {trail.distance_km} km
                      </div>
                      <div className="w-px h-4 bg-[#E5E7EB]" />
                      <div className="flex items-center gap-1.5 text-[#111111] font-medium">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#025C00" strokeWidth="2.5" strokeLinecap="round">
                          <path d="m3 20 5-10 4 6 3-4 5 8" />
                        </svg>
                        {trail.elevation_gain_m} m D+
                      </div>
                      <div className="w-px h-4 bg-[#E5E7EB]" />
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                        </svg>
                        {formatDuration(trail.duration_min)}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="mt-10 text-center md:hidden">
          <Link
            href="/randonnees"
            className="inline-flex items-center gap-2 bg-[#025C00] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#014800] transition-colors"
          >
            Voir toutes les randonnées
          </Link>
        </ScrollReveal>
      </section>

      {/* ── PAR DIFFICULTÉ ── */}
      <section className="bg-[#F5F5F5] py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <ScrollReveal>
            <p className="text-[#025C00] text-sm font-semibold uppercase tracking-widest mb-2">Tous les niveaux</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-10">Choisissez votre niveau</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { slug: 'tres_facile', label: 'Très facile', desc: 'Idéal en famille', icon: '🌿', color: 'hover:bg-emerald-50 hover:border-emerald-200' },
              { slug: 'facile', label: 'Facile', desc: 'Bonne marche', icon: '🥾', color: 'hover:bg-green-50 hover:border-green-200' },
              { slug: 'moyen', label: 'Moyen', desc: 'Quelques dénivelés', icon: '⛰️', color: 'hover:bg-yellow-50 hover:border-yellow-200' },
              { slug: 'difficile', label: 'Difficile', desc: 'Expérience requise', icon: '🧗', color: 'hover:bg-orange-50 hover:border-orange-200' },
              { slug: 'tres_difficile', label: 'Très difficile', desc: 'Alpinistes confirmés', icon: '🏔️', color: 'hover:bg-red-50 hover:border-red-200' },
            ].map(({ slug, label, desc, icon, color }, i) => (
              <ScrollReveal key={slug} delay={i * 60}>
                <Link
                  href={`/randonnees?difficulte=${slug}`}
                  className={`block bg-white border border-[#E5E7EB] rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${color}`}
                >
                  <span className="text-3xl mb-3 block">{icon}</span>
                  <p className="font-bold text-[#111111] text-base mb-1">{label}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="max-w-[1440px] mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="bg-[#025C00] rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-white/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt pour votre prochaine sortie ?</h2>
              <p className="text-white/75 text-lg mb-8 max-w-lg mx-auto">
                Explorez des milliers de randonnées, téléchargez les traces GPX et partez l'esprit tranquille.
              </p>
              <Link
                href="/randonnees"
                className="inline-flex items-center gap-2 bg-white text-[#025C00] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors text-base"
              >
                Explorer les randonnées
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
