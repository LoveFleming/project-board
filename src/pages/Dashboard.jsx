import projectData from '../data/ai-factory.json'

function getStatusIcon(status) {
  if (status === 'done') return '✅'
  if (status === 'progress') return '🔧'
  return '⬜'
}

function getStatusClass(status) {
  if (status === 'done') return 'done'
  if (status === 'progress') return 'progress'
  return 'todo'
}

function getProgressColor(pct) {
  if (pct >= 70) return 'green'
  if (pct >= 40) return 'blue'
  if (pct >= 20) return 'yellow'
  return 'red'
}

function Dashboard() {
  const project = projectData
  const allTasks = project.categories.flatMap(c => c.tasks)
  const done = allTasks.filter(t => t.status === 'done').length
  const progress = allTasks.filter(t => t.status === 'progress').length
  const total = allTasks.length
  const pct = Math.round((done / total) * 100)

  const completedMilestones = project.milestones.filter(m => m.status === 'done').length

  return (
    <div>
      <div className="page-header">
        <h2>📊 Dashboard</h2>
        <p>專案管理總覽</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">專案數</div>
          <div className="value">1</div>
          <div className="change up">AI 軟體工廠</div>
        </div>
        <div className="stat-card">
          <div className="label">總任務</div>
          <div className="value">{total}</div>
          <div className="change">{done} 完成 / {progress} 進行中</div>
        </div>
        <div className="stat-card">
          <div className="label">完成率</div>
          <div className="value">{pct}%</div>
          <div className="change up">持續推進中</div>
        </div>
        <div className="stat-card">
          <div className="label">里程碑</div>
          <div className="value">{completedMilestones}/{project.milestones.length}</div>
          <div className="change up">已完成 {completedMilestones} 個</div>
        </div>
      </div>

      <div className="section-title">🏭 AI 軟體工廠 — 大盤表</div>

      <div className="category-grid">
        {project.categories.map(cat => {
          const catDone = cat.tasks.filter(t => t.status === 'done').length
          const catTotal = cat.tasks.length
          const catPct = Math.round((catDone / catTotal) * 100)

          return (
            <div key={cat.id} className="category-card">
              <h3>{cat.icon} {cat.name}</h3>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {cat.description}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>{catDone}/{catTotal} 完成</span>
                <span style={{ fontWeight: 600 }}>{catPct}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className={`fill ${getProgressColor(catPct)}`}
                  style={{ width: `${catPct}%` }}
                />
              </div>
              <ul className="task-list">
                {cat.tasks.map(task => (
                  <li key={task.id} className={`task-item ${task.status === 'done' ? 'done-text' : ''}`}>
                    <span className={`status ${getStatusClass(task.status)}`}>
                      {getStatusIcon(task.status)}
                    </span>
                    {task.name}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="section-title" style={{ marginTop: '40px' }}>🏁 里程碑</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {project.milestones.map(m => (
          <div key={m.id} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>
              {m.status === 'done' ? '✅' : m.status === 'progress' ? '🔧' : '⬜'}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{m.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{m.note}</div>
            </div>
            {m.date && (
              <span className={`badge ${m.status === 'done' ? 'green' : m.status === 'progress' ? 'blue' : 'yellow'}`}>
                {m.date}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
