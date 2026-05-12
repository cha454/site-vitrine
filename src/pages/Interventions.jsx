import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import './Page.css'
import './Interventions.css'

function Interventions({ interventions, onAdd, onDelete, onUpdateStatus }) {
  useScrollAnimation()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('Tous')
  const [newInter, setNewInter] = useState({
    client: '',
    problem: '',
    status: 'En cours',
    date: new Date().toISOString().split('T')[0],
    price: 0
  })

  const getStatusTone = (status) => {
    if (status === 'Terminé') return 'is-done'
    if (status === 'Urgent') return 'is-urgent'
    return 'is-active'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(newInter)
    setNewInter({
      client: '',
      problem: '',
      status: 'En cours',
      date: new Date().toISOString().split('T')[0],
      price: 0
    })
    setShowForm(false)
  }

  const filteredInterventions = interventions.filter(i => 
    filter === 'Tous' || i.status === filter
  )

  const stats = [
    { label: 'Toutes', value: interventions.length, icon: '📋', status: 'Tous' },
    { label: 'Urgentes', value: interventions.filter(i => i.status === 'Urgent').length, icon: '🚨', status: 'Urgent' },
    { label: 'En cours', value: interventions.filter(i => i.status === 'En cours').length, icon: '⏳', status: 'En cours' },
    { label: 'Terminées', value: interventions.filter(i => i.status === 'Terminé').length, icon: '✅', status: 'Terminé' }
  ]

  return (
    <div className="page interventions-page">
      <div className="container">
        <header className="management-header scroll-animate">
          <div className="header-main">
            <span className="dashboard-eyebrow">Opérations</span>
            <h1>Interventions</h1>
          </div>
          <div className="header-actions">
            <button className="primary-btn" onClick={() => setShowForm(true)}>
              + Nouvelle Intervention
            </button>
          </div>
        </header>

        <div className="quick-stats-bar scroll-animate">
          {stats.map((s, i) => (
            <div 
              key={s.label} 
              className={`stat-pill ${filter === s.status ? 'active' : ''} delay-${i+1}`}
              onClick={() => setFilter(s.status)}
            >
              <span className="pill-icon">{s.icon}</span>
              <div className="pill-info">
                <span className="pill-label">{s.label}</span>
                <span className="pill-value">{s.value}</span>
              </div>
            </div>
          ))}
        </div>

        <SectionDivider />

        <div className="management-container scroll-animate">
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
                  <span className="row-price">{item.price}€</span>
                  <div className="row-actions">
                    <span className={`row-status ${getStatusTone(item.status)}`}>
                      {item.status}
                    </span>
                    <button 
                      className="delete-btn" 
                      onClick={() => onDelete(item.id)}
                      title="Supprimer"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">Aucune intervention trouvée.</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Création */}
      {showForm && (
        <div className="management-modal">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowForm(false)}>&times;</button>
            <h2>Nouvelle Intervention</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Nom du client</label>
                <input 
                  type="text" 
                  required 
                  value={newInter.client}
                  onChange={e => setNewInter({...newInter, client: e.target.value})}
                  placeholder="Ex: Jean Dupont"
                />
              </div>
              <div className="form-group">
                <label>Description du problème</label>
                <textarea 
                  required 
                  value={newInter.problem}
                  onChange={e => setNewInter({...newInter, problem: e.target.value})}
                  placeholder="Ex: Écran bleu au démarrage"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Prix (€)</label>
                  <input 
                    type="number" 
                    value={newInter.price}
                    onChange={e => setNewInter({...newInter, price: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select 
                    value={newInter.status}
                    onChange={e => setNewInter({...newInter, status: e.target.value})}
                  >
                    <option value="En cours">En cours</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="primary-btn w-full">Créer la fiche</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Interventions
