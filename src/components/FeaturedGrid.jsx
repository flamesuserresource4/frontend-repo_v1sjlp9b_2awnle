import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function FeaturedGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backend}/properties?limit=6`)
        const data = await res.json()
        setItems(data)
      } catch (e) {}
      setLoading(false)
    }
    load()
  }, [])

  const colors = [
    'from-blue-600 to-blue-800',
    'from-sky-600 to-sky-800',
    'from-slate-700 to-slate-900',
  ]

  return (
    <section id="featured" className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Opportunities</h2>
          <a href="#" className="text-blue-600 hover:underline">View all</a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl animate-pulse bg-slate-200" />
          ))}
          {!loading && items.map((p, idx) => (
            <motion.a
              href={`/property/${p.slug}`}
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors[idx % colors.length]} text-white p-5`}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
              <div className="relative">
                <div className="text-xs uppercase tracking-wider opacity-80">{p.category}</div>
                <h3 className="mt-1 text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm opacity-90 line-clamp-2">{p.summary}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
