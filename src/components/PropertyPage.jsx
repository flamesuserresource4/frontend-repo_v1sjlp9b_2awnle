import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageCircle, Send } from 'lucide-react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PropertyPage() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${backend}/properties/${slug}`)
      const d = await res.json()
      setData(d)
      setMessages([{ role: 'assistant', content: `Hi! Ask me anything about ${d.name}.` }])
    }
    load()
  }, [slug])

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    try {
      const res = await fetch(`${backend}/properties/${slug}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const j = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: j.reply }])
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I could not get an answer right now.' }])
    }
  }

  if (!data) return <div className="pt-24 max-w-5xl mx-auto px-4">Loading...</div>

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-200">
              <img src={data.images?.[0] || 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop'} alt="" className="w-full h-full object-cover" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-slate-900">{data.name}</h1>
            <p className="mt-2 text-slate-700">{data.summary}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <div className="text-sm text-slate-500">Category</div>
                <div className="font-medium">{data.category}</div>
              </div>
              {data.city && <div className="rounded-xl border p-4">
                <div className="text-sm text-slate-500">Location</div>
                <div className="font-medium">{data.city}, {data.province}</div>
              </div>}
              {data.price && <div className="rounded-xl border p-4">
                <div className="text-sm text-slate-500">Price</div>
                <div className="font-medium">${data.price.toLocaleString()}</div>
              </div>}
              {data.size_sqft && <div className="rounded-xl border p-4">
                <div className="text-sm text-slate-500">Size</div>
                <div className="font-medium">{data.size_sqft.toLocaleString()} sq ft</div>
              </div>}
            </div>

            {data.highlights?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-900">Highlights</h3>
                <ul className="mt-2 grid sm:grid-cols-2 gap-2 list-disc list-inside text-slate-700">
                  {data.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border p-4 sticky top-24">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <MessageCircle size={18} /> Ask about this property
              </div>
              <div className="mt-4 h-72 overflow-y-auto space-y-3 pr-2">
                {messages.map((m, i) => (
                  <div key={i} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-50 text-slate-900' : 'bg-slate-100 text-slate-800'}`}>
                    {m.content.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={sendMessage} className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
