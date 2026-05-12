import './Page.css'
import './Dashboard.css'

function Dashboard({ interventions, clients }) {
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

  return (
    <div className="page dashboard-page">
      <div className="container">
        <section className="dashboard-hero">
          <div className="dashboard-hero-copy">
            <span className="dashboard-eyebrow">Cockpit de gestion informatique</span>
            <h1>Supervisez les interventions, les clients et les urgences en un coup d'oeil</h1>
            <p className="page-intro dashboard-intro">
              Cette interface centralise l'activite terrain, la priorisation des tickets
              et la performance de votre service de support informatique.
            </p>
          </div>

          <div className="dashboard-hero-panel">
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
          <div className="stat-card">
            <span className="stat-label">Revenu realize</span>
            <strong className="stat-value">{totalRevenue}€</strong>
            <small>Interventions terminees facturees</small>
          </div>
          <div className="stat-card">
            <span className="stat-label">Interventions actives</span>
            <strong className="stat-value">{pendingInterventions}</strong>
            <small>Tickets a suivre ou en attente</small>
          </div>
          <div className="stat-card">
            <span className="stat-label">Base clients</span>
            <strong className="stat-value">{clients.length}</strong>
            <small>Comptes suivis dans la plateforme</small>
          </div>
          <div className="stat-card highlight">
            <span className="stat-label">Urgences</span>
            <strong className="stat-value">{criticalInterventions}</strong>
            <small>Demandes prioritaires a traiter</small>
          </div>
        </div>

        <section className="command-deck">
          <article className="command-card">
            <span className="section-kicker">Priorite immediate</span>
            <h3>Focus operationnel</h3>
            <p>
              {criticalInterventions > 0
                ? `${criticalInterventions} urgence${criticalInterventions > 1 ? 's' : ''} demandent une action rapide.`
                : 'Aucune urgence critique en attente actuellement.'}
            </p>
          </article>

          <article className="command-card">
            <span className="section-kicker">Performance</span>
            <h3>Resolution du flux</h3>
            <p>{completedInterventions} intervention{completedInterventions > 1 ? 's' : ''} cloturee{completedInterventions > 1 ? 's' : ''} avec un taux de resolution de {completionRate}%.</p>
          </article>

          <article className="command-card accent-card">
            <span className="section-kicker">Lecture metier</span>
            <h3>Signal du jour</h3>
            <p>
              {clients.length} client{clients.length > 1 ? 's' : ''} suivis et {pendingInterventions} dossier{pendingInterventions > 1 ? 's' : ''} actif{pendingInterventions > 1 ? 's' : ''} dans la console.
            </p>
          </article>
        </section>

        <div className="dashboard-content">
          <section className="recent-activity">
            <div className="section-heading">
              <div>
                <span className="section-kicker">Activite</span>
                <h2>Interventions recentes</h2>
              </div>
              <span className="section-chip">{interventions.length} fiches</span>
            </div>
            <div className="activity-list">
              {interventions.slice(-5).reverse().map(inter => (
                <div key={inter.id} className="activity-item">
                  <div className="activity-info">
                    <strong>{inter.client}</strong>
                    <span>{inter.problem}</span>
                  </div>
                  <div className="activity-meta">
                    <span className="activity-date">{inter.date}</span>
                    <div className={`status-pill ${getStatusTone(inter.status)}`}>{inter.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="quick-stats">
            <div className="section-heading">
              <div>
                <span className="section-kicker">Pilotage</span>
                <h2>Repartition par statut</h2>
              </div>
              <span className="section-chip">Live</span>
            </div>
            <div className="status-bars">
              {['Terminé', 'En cours', 'Urgent'].map(status => {
                const count = interventions.filter(i => i.status === status).length
                const percentage = interventions.length ? (count / interventions.length) * 100 : 0
                return (
                  <div key={status} className="status-bar-group">
                    <div className="status-bar-label">
                      <span>{status}</span>
                      <span>{count} intervention{count > 1 ? 's' : ''}</span>
                    </div>
                    <div className="progress-bg">
                      <div
                        className={`progress-fill ${getStatusTone(status)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
