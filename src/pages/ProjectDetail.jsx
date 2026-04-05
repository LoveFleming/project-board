import { useParams, Link } from 'react-router-dom'
import projectData from '../data/ai-factory.json'

function getStatusLabel(status) {
  if (status === 'done') return { text: '已完成', class: 'green' }
  if (status === 'progress') return { text: '進行中', class: 'blue' }
  return { text: '未開始', class: 'yellow' }
}

function getPriorityLabel(priority) {
  if (priority === 'high') return { text: '高', class: 'red' }
  if (priority === 'medium') return { text: '中', class: 'yellow' }
  return { text: '低', class: 'green' }
}

function ProjectDetail() {
  const { id } = useParams()
  const project = id === 'ai-factory' ? projectData : null

  if (!project) {
    return <div>專案不存在</div>
  }

  const allTasks = project.categories.flatMap(c => c.tasks)
  const done = allTasks.filter(t => t.status === 'done').length
  const progress = allTasks.filter(t => t.status === 'progress').length
  const total = allTasks.length
  const pct = Math.round((done / total) * 100)

  const projectStatus = getStatusLabel(project.status)

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px' }}>
          ← 回到 Dashboard
        </Link>
      </div>

      <div className="project-header">
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>
            {project.icon} {project.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            {project.description}
          </p>
          <div className="project-meta">
            <span className={`badge ${projectStatus.class}`}>{projectStatus.text}</span>
            <span className="badge blue">📅 {project.startDate} → {project.targetDate}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">完成率</div>
          <div className="value" style={{ color: 'var(--success)' }}>{pct}%</div>
          <div className="progress-bar" style={{ marginTop: '8px' }}>
            <div className="fill green" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="stat-card">
          <div className="label">已完成</div>
          <div className="value" style={{ color: 'var(--success)' }}>{done}</div>
          <div className="change up">✅ 已完成的任務</div>
        </div>
        <div className="stat-card">
          <div className="label">進行中</div>
          <div className="value" style={{ color: 'var(--info)' }}>{progress}</div>
          <div className="change">🔧 正在處理</div>
        </div>
        <div className="stat-card">
          <div className="label">未開始</div>
          <div className="value" style={{ color: 'var(--text-muted)' }}>{total - done - progress}</div>
          <div className="change">⬜ 待處理</div>
        </div>
      </div>

      {project.repo && (
        <div style={{ marginBottom: '24px' }}>
          <a href={project.repo} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px' }}>
            📦 GitHub Repo →
          </a>
          {project.dashboard && (
            <>
              <span style={{ margin: '0 12px', color: 'var(--border)' }}>|</span>
              <a href={project.dashboard} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px' }}>
                🖥️ Dashboard →
              </a>
            </>
          )}
        </div>
      )}

      <div className="section-title">📋 分類任務</div>

      {project.categories.map(cat => {
        const catDone = cat.tasks.filter(t => t.status === 'done').length
        const catTotal = cat.tasks.length
        const catPct = Math.round((catDone / catTotal) * 100)

        return (
          <div key={cat.id} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{cat.icon} {cat.name}</h3>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>{catPct}%</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>{cat.description}</div>
            <div className="progress-bar">
              <div className={`fill ${catPct >= 70 ? 'green' : catPct >= 40 ? 'blue' : catPct >= 20 ? 'yellow' : 'red'}`} style={{ width: `${catPct}%` }} />
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>狀態</th>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>任務</th>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>優先級</th>
                </tr>
              </thead>
              <tbody>
                {cat.tasks.map(task => {
                  const status = getStatusLabel(task.status)
                  const priority = getPriorityLabel(task.priority)
                  return (
                    <tr key={task.id} style={{ borderBottom: '1px solid rgba(51,65,85,0.5)' }}>
                      <td style={{ padding: '10px 8px' }}>
                        <span className={`badge ${status.class}`}>{status.text}</span>
                      </td>
                      <td style={{ padding: '10px 8px', fontSize: '14px', textDecoration: task.status === 'done' ? 'line-through' : 'none', opacity: task.status === 'done' ? 0.6 : 1 }}>
                        {task.name}
                      </td>
                      <td style={{ padding: '10px 8px' }}>
                        <span className={`badge ${priority.class}`}>{priority.text}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default ProjectDetail
