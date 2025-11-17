import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-400/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="text-blue-300 text-sm tracking-widest uppercase">Commercial • Residential • Development</span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            Isherwood Developments
          </h1>
          <p className="mt-4 text-slate-300 text-lg">
            Premium land, commercial assets, hotels and purpose-built developments across Ontario. Explore featured opportunities and active projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#categories" className="px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-500">Browse by Category</a>
            <a href="#featured" className="px-5 py-2.5 rounded-md bg-white/10 text-white hover:bg-white/20">View Featured</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
        >
          {[
            'Land','Residential','Commercial','Industrial','Hotels','Retirement'
          ].map((label) => (
            <div key={label} className="px-3 py-2 rounded-md bg-white/5 text-sm text-slate-200 border border-white/10 text-center">
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
