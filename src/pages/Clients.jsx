import { useState } from 'react'
import './Page.css'
import './Interventions.css'

function Clients({ clients, interventions = [] }) {
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const clientsWithCompanyMail = clients.filter((client) => client.email.includes('@')).length

  const getClientStats = (client) => {
    const relatedInterventions = interventions.filter((item) => item.client === client.name)
    const revenue = relatedInterventions
      .filter((item) => item.status === 'Terminé')
      .reduce((total, item) => total + item.price, 0)
    const urgent = relatedInterventions.filter((item) => item.status === 'Urgent').length
    const lastIntervention = relatedInterventions.at(-1)

    return {
      total: relatedInterventions.length,
      revenue,
      urgent,
      lastStatus: lastIntervention?.status || 'Aucun dossier',
      lastDate: lastIntervention?.date || 'Non disponible'
    }
  }

  return (
    <div className="page clients-page">
      <div className="container">
        <section className="management-hero">
          <div>
            <span className="management-kicker">Base relationnelle</span>
            <h1>Gestion des clients</h1>
            <p className="page-intro management-intro">
              Recherchez rapidement un client, accedez a ses coordonnees et gardez une
              vue centrale sur votre portefeuille actif.
            </p>
          </div>

          <div className="hero-mini-grid">
            <div className="hero-mini-card">
              <span>Contacts</span>
              <strong>{clients.length}</strong>
            </div>
            <div className="hero-mini-card">
              <span>Affiches</span>
              <strong>{filteredClients.length}</strong>
            </div>
            <div className="hero-mini-card">
              <span>Joignables</span>
              <strong>{clientsWithCompanyMail}</strong>
            </div>
          </div>
        </section>

        <div className="page-header">
          <div className="section-heading-block">
            <span className="section-kicker">Recherche</span>
            <h2>Annuaire clients</h2>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Rechercher un client..."
              className="blog-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="interventions-list">
          <div className="table-header-bar">
            <div>
              <span className="section-kicker">Base de donnees</span>
              <h3>Clients visibles</h3>
            </div>
            <span className="results-badge">{filteredClients.length} contact{filteredClients.length > 1 ? 's' : ''}</span>
          </div>

          <table className="management-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td>
                    <div className="client-main">
                      <strong>{client.name}</strong>
                      <span>Client actif</span>
                    </div>
                  </td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                    <button
                      className="row-action-btn"
                      onClick={() => setSelectedClient(client)}
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedClient && (
          <div className="detail-overlay" onClick={() => setSelectedClient(null)}>
            <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="detail-close"
                type="button"
                onClick={() => setSelectedClient(null)}
                aria-label="Fermer la fiche client"
              >
                ×
              </button>

              <div className="detail-header">
                <div>
                  <span className="section-kicker">Fiche client</span>
                  <h2>{selectedClient.name}</h2>
                </div>
                <span className="results-badge">Client actif</span>
              </div>

              <div className="detail-grid">
                <div className="detail-card">
                  <span className="detail-label">Email</span>
                  <strong>{selectedClient.email}</strong>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Telephone</span>
                  <strong>{selectedClient.phone}</strong>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Interventions</span>
                  <strong>{getClientStats(selectedClient).total}</strong>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Revenu genere</span>
                  <strong>{getClientStats(selectedClient).revenue}€</strong>
                </div>
              </div>

              <div className="detail-panel">
                <h3>Etat du compte</h3>
                <p>
                  Dernier statut connu : {getClientStats(selectedClient).lastStatus}. Date du dernier passage :
                  {' '}{getClientStats(selectedClient).lastDate}.
                </p>
              </div>

              <div className="detail-panel">
                <h3>Signal relation client</h3>
                <p>
                  {getClientStats(selectedClient).urgent > 0
                    ? `${getClientStats(selectedClient).urgent} urgence(s) reliee(s) a ce client ont ete detectees.`
                    : 'Aucune urgence recente sur ce compte, relation actuellement stable.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Clients
