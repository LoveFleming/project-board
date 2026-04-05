import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import './App.css'

const projects = [
  { id: 'ai-factory', name: 'AI 軟體工廠', icon: '🏭' }
]

function Sidebar() {
  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>📋 Project Board</h1>
        <span>專案管理儀表板</span>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">總覽</div>
        <Link to="/" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">專案 ({projects.length})</div>
        {projects.map(p => (
          <Link 
            key={p.id}
            to={`/project/${p.id}`}
            className={`sidebar-link ${location.pathname === `/project/${p.id}` ? 'active' : ''}`}
          >
            <span className="icon">{p.icon}</span>
            <span>{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
