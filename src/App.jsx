import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedGrid from './components/FeaturedGrid'
import PropertyPage from './components/PropertyPage'

function Home() {
  const handleSelect = (item) => {
    // For now, just scroll to featured
    const el = document.getElementById('featured')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero />
      <Categories onSelect={handleSelect} />
      <FeaturedGrid />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:slug" element={<PropertyPage />} />
      </Routes>
      <footer className="border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Isherwood Developments. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
