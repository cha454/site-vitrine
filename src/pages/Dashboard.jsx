import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import './Page.css'
import './Dashboard.css'

function Dashboard({ interventions, clients }) {
  useScrollAnimation()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tous')

  const getStatusTone = (status) => {
    if (status === 'Terminé') return 'is-done'
    if (status === 'Urgent') return 'is-urgent'
    return 'is-active'
  }

  const totalRevenue = interventions
    .filter(i => i.status === 'Terminé')
    .reduce((acc, i) => acc + i.price, 0)

  const pendingInterventions = interventions.filter(i => i.status !== 'Terminé').length
  const criticalInterventions = interventions.filter(i => i.status === 'Urgent').length
  const completedInterventions = interventions.filter((i) => i.status === 'Terminé').length
  const completionRate = interventions.length
    ? Math.round((interventions.filter((i) => i.status === 'Terminé').length / interventions.length) * 100)
    : 0

  const filteredInterventions = interventions.filter(i => {
    const matchesSearch = i.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         i.problem.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'Tous' || i.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="page dashboard-page">
      <div className="container">
        <section className="dashboard-header scroll-animate">
          <div className="header-main">
            <span className="dashboard-eyebrow">Tableau de Bord</span>
            <h1>Gestion du Support</h1>
          </div>
          <div className="header-stats">
            <div className="mini-stat">
              <span className="mini-label">En ligne</span>
              <span className="mini-value text-green">Oui</span>
            </div>
            <div className="mini-stat">
              <span className="mini-label">Dernier Sync</span>
              <span className="mini-value">À l'instant</span>
            </div>
          </div>
        </section>

        <div className="stats-grid">
          <div className="stat-card scroll-animate-scale delay-1">
            <div className="stat-icon">💶</div>
            <div className="stat-info">
              <span className="stat-label">Revenu</span>
              <strong className="stat-value">{totalRevenue} FCFA</strong>
            </div>
          </div>
          <div className="stat-card scroll-animate-scale delay-2">
            <div className="stat-icon">🔧</div>
            <div className="stat-info">
              <span className="stat-label">Actives</span>
              <strong className="stat-value">{pendingInterventions}</strong>
            </div>
          </div>
          <div className="stat-card scroll-animate-scale delay-3">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-label">Clients</span>
              <strong className="stat-value">{clients.length}</strong>
            </div>
          </div>
          <div className="stat-card highlight scroll-animate-scale delay-4">
            <div className="stat-icon">🚨</div>
            <div className="stat-info">
              <span className="stat-label">Urgences</span>
              <strong className="stat-value">{criticalInterventions}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-controls scroll-animate">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Rechercher un client ou un problème..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="Tous">Tous les statuts</option>
              <option value="Urgent">Urgent</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
        </div>

        <div className="dashboard-content scroll-animate">
          <div className="table-header">
            <span>Client</span>
            <span>Problème</span>
            <span>Date</span>
            <span>Prix</span>
            <span>Statut</span>
          </div>
          <div className="table-body">
            {filteredInterventions.length > 0 ? (
              filteredInterventions.map((item) => (
                <div key={item.id} className="table-row">
                  <span className="row-client">{item.client}</span>
                  <span className="row-problem">{item.problem}</span>
                  <span className="row-date">{item.date}</span>
                  <span className="row-price">{item.price} FCFA</span>
                  <span className={`row-status ${getStatusTone(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-results">Aucune intervention trouvée.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
