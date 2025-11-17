import { Building, Building2, Factory, Hotel, Landmark, Layers, Warehouse } from 'lucide-react'

const groups = [
  {
    title: 'Property Types',
    items: [
      { label: 'Land', value: 'land', icon: Landmark },
      { label: 'Residential', value: 'residential', icon: Building },
      { label: 'Commercial', value: 'commercial', icon: Building2 },
      { label: 'Hotels', value: 'hospitality', icon: Hotel },
    ]
  },
  {
    title: 'Development',
    items: [
      { label: 'High Rise', value: 'high rise', icon: Layers },
      { label: 'Mid Rise', value: 'mid rise', icon: Layers },
      { label: 'Low Rise', value: 'low rise', icon: Layers },
    ]
  },
  {
    title: 'Commercial Uses',
    items: [
      { label: 'Plaza', value: 'plaza', icon: Building2 },
      { label: 'Office / Medical', value: 'office', icon: Building },
      { label: 'Industrial', value: 'industrial', icon: Factory },
      { label: 'Warehouse', value: 'industrial', icon: Warehouse },
    ]
  }
]

export default function Categories({ onSelect }) {
  return (
    <section id="categories" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-slate-700 font-semibold">{group.title}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => onSelect?.(item)}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
                  >
                    <item.icon className="text-blue-600" size={20} />
                    <span className="text-slate-800">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
