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
        <section className="dashboard-hero scroll-animate">
          <div className="dashboard-hero-copy">
            <span className="dashboard-eyebrow">Cockpit de gestion informatique</span>
            <h1>Supervisez les interventions, les clients et les urgences en un coup d'oeil</h1>
            <p className="page-intro dashboard-intro">
              Cette interface centralise l'activite terrain, la priorisation des tickets
              et la performance de votre service de support informatique.
            </p>
          </div>

          <div className="dashboard-hero-panel scroll-animate-right">
            <div className="hero-panel-line">
              <span>Charge active</span>
              <strong>{pendingInterventions} dossiers ouverts</strong>
            </div>
            <div className="hero-panel-line">
              <span>Niveau d'urgence</span>
              <strong>{criticalInterventions} tickets critiques</strong>
            </div>
            <div className="hero-panel-line">
              <span>Taux de resolution</span>
              <strong>{completionRate}% cloture</strong>
            </div>
          </div>
        </section>

        <div className="stats-grid">
          <div className="stat-card scroll-animate-scale delay-1">
            <span className="stat-label">Revenu realize</span>
            <strong className="stat-value">{totalRevenue}€</strong>
            <small>Interventions terminees facturees</small>
          </div>
          <div className="stat-card scroll-animate-scale delay-2">
            <span className="stat-label">Interventions actives</span>
            <strong className="stat-value">{pendingInterventions}</strong>
            <small>Tickets a suivre ou en attente</small>
          </div>
          <div className="stat-card scroll-animate-scale delay-3">
            <span className="stat-label">Base clients</span>
            <strong className="stat-value">{clients.length}</strong>
            <small>Comptes suivis dans la plateforme</small>
          </div>
          <div className="stat-card highlight scroll-animate-scale delay-4">
            <span className="stat-label">Urgences</span>
            <strong className="stat-value">{criticalInterventions}</strong>
            <small>Demandes prioritaires a traiter</small>
          </div>
        </div>

        <SectionDivider />

        <section className="command-deck">
          <article className="command-card scroll-animate">
            <span className="section-kicker">Priorite immediate</span>
            <h3>Focus operationnel</h3>
            <p>
              {criticalInterventions > 0
                ? `${criticalInterventions} urgence${criticalInterventions > 1 ? 's' : ''} demandent une action rapide.`
                : 'Aucune urgence critique en attente actuellement.'}
            </p>
          </article>

          <article className="command-card scroll-animate delay-1">
            <span className="section-kicker">Performance</span>
            <h3>Resolution du flux</h3>
            <p>{completedInterventions} intervention{completedInterventions > 1 ? 's' : ''} cloturee{completedInterventions > 1 ? 's' : ''} avec un taux de resolution de {completionRate}%.</p>
          </article>

          <article className="command-card accent-card scroll-animate delay-2">
            <span className="section-kicker">Lecture metier</span>
            <h3>Signal du jour</h3>
            <p>
              {clients.length} client{clients.length > 1 ? 's' : ''} suivis et {pendingInterventions} dossier{pendingInterventions > 1 ? 's' : ''} actif{pendingInterventions > 1 ? 's' : ''} dans la console.
            </p>
          </article>
        </section>

        <SectionDivider />

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
                  <span className="row-price">{item.price}€</span>
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
