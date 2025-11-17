import { Link, useLocation } from 'react-router-dom'
import { Building2, Home, Layers, Map, Hammer } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="text-blue-600" />
          <span className="font-semibold text-slate-900">Isherwood Developments</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className={`flex items-center gap-2 hover:text-blue-600 ${isActive('/') ? 'text-blue-600' : 'text-slate-700'}`}>
            <Home size={18} /> Home
          </Link>
          <a href="#categories" className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
            <Layers size={18} /> Categories
          </a>
          <a href="#featured" className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
            <Map size={18} /> Featured
          </a>
          <a href="#developments" className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
            <Hammer size={18} /> Developments
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/test" className="text-xs px-3 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800">System Check</a>
        </div>
      </div>
    </header>
  )
}
