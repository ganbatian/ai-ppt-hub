import React, { useState } from 'react'
import { Presentation, Search, ExternalLink, Heart, Star, Sparkles, Layout, Monitor, FileText, BarChart3, Palette, Wand2 } from 'lucide-react'

const categories = [
  { id: 'all', name: '全部' },
  { id: 'ai-gen', name: 'AI 生成' },
  { id: 'template', name: '模板设计' },
  { id: 'speak', name: '演讲辅助' },
  { id: 'data', name: '数据可视化' },
]

const tools = [
  { name: 'Gamma', category: 'ai-gen', desc: 'AI 驱动的演示文稿生成，输入主题自动生成精美 PPT', url: 'https://gamma.app', hot: true, free: true, rating: 4.9, features: ['AI 生成', '一键美化', '多格式导出'] },
  { name: 'Beautiful.ai', category: ['ai-gen', 'template'], desc: '智能设计工具，自动调整布局让演示更专业', url: 'https://beautiful.ai', hot: true, free: false, rating: 4.8, features: ['智能排版', '团队协作', '模板库'] },
  { name: 'Tome', category: 'ai-gen', desc: 'AI 故事化演示工具，适合创意展示', url: 'https://tome.app', hot: true, free: true, rating: 4.7, features: ['AI 叙事', '自动设计', '多媒体嵌入'] },
  { name: 'SlidesAI', category: 'ai-gen', desc: 'Google Slides 插件，AI 生成演示内容', url: 'https://slidesai.io', free: true, rating: 4.5, features: ['Slides 集成', '主题生成', '多语言'] },
  { name: 'Presentations.AI', category: 'ai-gen', desc: '专业 AI 演示文稿制作平台', url: 'https://presentations.ai', free: true, rating: 4.5, features: ['AI 生成', '品牌定制', '团队协作'] },
  { name: 'Pitch', category: ['template', 'speak'], desc: '团队演示协作平台，现代模板设计', url: 'https://pitch.com', hot: true, free: false, rating: 4.6, features: ['协作编辑', '分析数据', '品牌工具'] },
  { name: 'Canva AI', category: ['template', 'ai-gen'], desc: 'Canva 的 AI 演示功能，海量模板和 AI 辅助设计', url: 'https://canva.com', hot: true, free: true, rating: 4.7, features: ['海量模板', 'AI 设计', '免费使用'] },
  { name: 'Microsoft Designer', category: ['ai-gen', 'template'], desc: '微软推出的 AI 设计工具，与 PowerPoint 深度集成', url: 'https://designer.microsoft.com', free: true, rating: 4.5, features: ['PPT 集成', 'AI 图像', '智能布局'] },
  { name: 'Decktopus', category: 'ai-gen', desc: 'AI 演示文稿生成器，支持自定义品牌和主题', url: 'https://decktopus.com', free: true, rating: 4.4, features: ['AI 内容', '自定义品牌', '在线演示'] },
  { name: 'Kroma', category: 'template', desc: '高端演示模板，适合商业和投资场景', url: 'https://kroma.ai', free: false, rating: 4.5, features: ['商业模板', '图表库', '品牌套件'] },
  { name: 'Slidebean', category: ['ai-gen', 'template'], desc: 'AI 辅助的演示文稿制作，专注商业路演', url: 'https://slidebean.com', free: false, rating: 4.4, features: ['AI 布局', '路演模板', '数据分析'] },
  { name: 'Prezi', category: ['speak', 'data'], desc: '独特的缩放式演示工具，让展示更生动', url: 'https://prezi.com', hot: true, free: false, rating: 4.5, features: ['缩放动画', '协作编辑', '视频演示'] },
]

function App() {
  const [activeCat, setActiveCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ppt-favorites') || '[]') } catch { return [] }
  })

  const toggleFav = (name) => {
    setFavorites(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name])
  }

  const filtered = tools.filter(t => {
    const matchCat = activeCat === 'all' || (Array.isArray(t.category) ? t.category.includes(activeCat) : t.category === activeCat)
    const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.includes(searchQuery)
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-white/10 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Presentation className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI PPT Hub</h1>
              <p className="text-sm text-white/50">AI 演示文稿工具聚合</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            用 AI 打造精彩演示
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">精选 12 款 AI PPT 工具，让每场演示都专业出彩</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCat === c.id
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' : 'bg-gray-900 text-white/60 hover:text-white hover:bg-gray-800'}`}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索 PPT 工具..."
            className="w-full bg-gray-900 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-violet-500/50 transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filtered.map(tool => {
            const isFav = favorites.includes(tool.name)
            const cats = Array.isArray(tool.category) ? tool.category : [tool.category]
            return (
              <div key={tool.name} className="bg-gray-900 border border-white/5 rounded-2xl p-6 hover:border-violet-500/20 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{tool.name}</h3>
                      {tool.hot && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">HOT</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tool.free ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {tool.free ? '免费' : '付费'}
                      </span>
                      <span className="text-xs text-yellow-400">★ {tool.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleFav(tool.name)} className={`p-1.5 rounded-lg transition-colors ${isFav ? 'text-violet-400' : 'text-white/20 hover:text-white/50'}`}>
                      <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-white/20 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-3">{tool.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.features.map(f => (
                    <span key={f} className="text-xs bg-white/5 text-white/40 px-2 py-1 rounded-lg">{f}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <footer className="border-t border-white/5 pt-8 pb-6 text-center text-white/30 text-xs">
          <p className="flex items-center justify-center gap-1 mb-2">Made with <Heart className="w-3 h-3 text-red-400" /> AI PPT Hub</p>
          <p>&copy; 2024 · 让 AI 助力你的每一次演示</p>
        </footer>
      </div>
    </div>
  )
}

export default App
