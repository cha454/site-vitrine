import { useState } from 'react'
import './Page.css'
import './Interventions.css'

function Interventions({ interventions, onAdd, onDelete, onUpdateStatus }) {
  const getStatusTone = (status) => {
    if (status === 'Terminé') return 'is-done'
    if (status === 'Urgent') return 'is-urgent'
    return 'is-active'
  }

  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('Tous')
  const [selectedIntervention, setSelectedIntervention] = useState(null)
  const [newInter, setNewInter] = useState({
    client: '',
    problem: '',
    status: 'En cours',
    date: new Date().toISOString().split('T')[0],
    price: 0
  })

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
  const filteredRevenue = filteredInterventions.reduce((total, item) => total + item.price, 0)
  const filteredDone = filteredInterventions.filter((item) => item.status === 'Terminé').length

  const getInterventionInsight = (item) => {
    if (item.status === 'Urgent') {
      return {
        priority: 'Priorite maximale',
        action: 'Prevenir le technicien et traiter le dossier avant toute autre intervention planifiee.',
        followUp: 'Appel client recommande dans l’heure.'
      }
    }

    if (item.status === 'Terminé') {
      return {
        priority: 'Mission cloturee',
        action: 'Verifier la satisfaction client et archiver la resolution dans le suivi.',
        followUp: 'Envoi de compte-rendu ou de facture conseille.'
      }
    }

    return {
      priority: 'Suivi actif',
      action: 'Confirmer le prochain point de contact et la disponibilite des ressources.',
      followUp: 'Mettre a jour le statut des que l’intervention evolue.'
    }
  }

  return (
    <div className="page interventions-page">
      <div className="container">
        <section className="management-hero">
          <div>
            <span className="management-kicker">Operations terrain</span>
            <h1>Gestion des interventions</h1>
            <p className="page-intro management-intro">
              Creez, filtrez et mettez a jour les interventions en gardant une lecture
              immediate des priorites, des delais et du volume d'activite.
            </p>
          </div>

          <div className="hero-mini-grid">
            <div className="hero-mini-card">
              <span>Ouvertes</span>
              <strong>{interventions.filter((item) => item.status !== 'Terminé').length}</strong>
            </div>
            <div className="hero-mini-card">
              <span>Urgentes</span>
              <strong>{interventions.filter((item) => item.status === 'Urgent').length}</strong>
            </div>
            <div className="hero-mini-card">
              <span>Total</span>
              <strong>{interventions.length}</strong>
            </div>
          </div>
        </section>

        <div className="page-header">
          <div className="section-heading-block">
            <span className="section-kicker">Workflow</span>
            <h2>Suivi et creation</h2>
          </div>
          <button
            className="primary-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Annuler' : '+ Nouvelle Intervention'}
          </button>
        </div>

        {showForm && (
          <section className="form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Nouvelle Intervention</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Client</label>
                  <input 
                    type="text" 
                    value={newInter.client} 
                    onChange={e => setNewInter({...newInter, client: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Prix (€)</label>
                  <input 
                    type="number" 
                    value={newInter.price} 
                    onChange={e => setNewInter({...newInter, price: parseInt(e.target.value)})}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Problème</label>
                <textarea 
                  value={newInter.problem} 
                  onChange={e => setNewInter({...newInter, problem: e.target.value})}
                  required 
                ></textarea>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    value={newInter.date} 
                    onChange={e => setNewInter({...newInter, date: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select 
                    value={newInter.status} 
                    onChange={e => setNewInter({...newInter, status: e.target.value})}
                  >
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">Enregistrer</button>
            </form>
          </section>
        )}

        <div className="filter-tabs">
          {['Tous', 'En cours', 'Terminé', 'Urgent'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="interventions-list">
          <div className="table-header-bar">
            <div>
              <span className="section-kicker">Liste</span>
              <h3>Interventions visibles</h3>
            </div>
            <span className="results-badge">{filteredInterventions.length} resultat{filteredInterventions.length > 1 ? 's' : ''}</span>
          </div>

          <div className="data-strip">
            <div className="data-pill">
              <span>Valeur visible</span>
              <strong>{filteredRevenue}€</strong>
            </div>
            <div className="data-pill">
              <span>Cloturees</span>
              <strong>{filteredDone}</strong>
            </div>
            <div className="data-pill">
              <span>Lecture</span>
              <strong>{filter === 'Tous' ? 'Vue globale' : filter}</strong>
            </div>
          </div>

          <table className="management-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Problème</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterventions.map(inter => (
                <tr key={inter.id}>
                  <td>{inter.date}</td>
                  <td><strong>{inter.client}</strong></td>
                  <td>{inter.problem}</td>
                  <td>{inter.price}€</td>
                  <td>
                    <select
                      className={`status-select ${getStatusTone(inter.status)}`}
                      value={inter.status}
                      onChange={(e) => onUpdateStatus(inter.id, e.target.value)}
                    >
                      <option value="En cours">En cours</option>
                      <option value="Terminé">Terminé</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="row-action-btn"
                        onClick={() => setSelectedIntervention(inter)}
                      >
                        Voir
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(inter.id)}
                        aria-label={`Supprimer l'intervention de ${inter.client}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedIntervention && (
          <div className="detail-overlay" onClick={() => setSelectedIntervention(null)}>
            <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="detail-close"
                type="button"
                onClick={() => setSelectedIntervention(null)}
                aria-label="Fermer les details de l'intervention"
              >
                ×
              </button>

              <div className="detail-header">
                <div>
                  <span className="section-kicker">Dossier intervention</span>
                  <h2>{selectedIntervention.client}</h2>
                </div>
                <span className={`status-pill ${getStatusTone(selectedIntervention.status)}`}>
                  {selectedIntervention.status}
                </span>
              </div>

              <div className="detail-grid">
                <div className="detail-card">
                  <span className="detail-label">Probleme declare</span>
                  <strong>{selectedIntervention.problem}</strong>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Date planifiee</span>
                  <strong>{selectedIntervention.date}</strong>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Montant</span>
                  <strong>{selectedIntervention.price}€</strong>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Lecture prioritaire</span>
                  <strong>{getInterventionInsight(selectedIntervention).priority}</strong>
                </div>
              </div>

              <div className="detail-panel">
                <h3>Action recommandee</h3>
                <p>{getInterventionInsight(selectedIntervention).action}</p>
              </div>

              <div className="detail-panel">
                <h3>Suivi conseille</h3>
                <p>{getInterventionInsight(selectedIntervention).followUp}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Interventions
