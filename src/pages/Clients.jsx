import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import './Page.css'
import './Interventions.css' // Réutilisation des styles de gestion

function Clients({ clients, interventions, onAdd, onDelete }) {
  useScrollAnimation()
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: ''
  })

  const getClientStats = (clientName) => {
    const clientInters = interventions.filter(i => i.client === clientName)
    const totalSpent = clientInters.reduce((sum, i) => sum + i.price, 0)
    return {
      count: clientInters.length,
      spent: totalSpent,
      lastDate: clientInters.length > 0 ? clientInters[0].date : 'Aucune'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(newClient)
    setNewClient({ name: '', email: '', phone: '', address: '', company: '' })
    setShowForm(false)
  }

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page clients-page">
      <div className="container">
        <header className="management-header scroll-animate">
          <div className="header-main">
            <span className="dashboard-eyebrow">Répertoire</span>
            <h1>Clients</h1>
          </div>
          <div className="header-actions">
            <button className="primary-btn" onClick={() => setShowForm(true)}>
              + Nouveau Client
            </button>
          </div>
        </header>

        <div className="dashboard-controls scroll-animate">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Rechercher un client (nom, email...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <SectionDivider />

        <div className="clients-grid">
          {filteredClients.length > 0 ? (
            filteredClients.map((client, i) => {
              const stats = getClientStats(client.name)
              return (
                <div key={client.id} className={`client-card scroll-animate delay-${(i % 3) + 1}`}>
                  <div className="client-card-header">
                    <div className="client-avatar">
                      {client.name.charAt(0)}
                    </div>
                    <div className="client-badge">
                      {stats.count > 0 ? `${stats.count} interventions` : 'Nouveau'}
                    </div>
                  </div>
                  
                  <h3 className="client-name">{client.name}</h3>
                  <p className="client-company">{client.company || 'Particulier'}</p>
                  
                  <div className="client-contact-info">
                    <div className="contact-item">
                      <span>📧</span> {client.email}
                    </div>
                    <div className="contact-item">
                      <span>📱</span> {client.phone}
                    </div>
                  </div>

                  <div className="client-mini-stats">
                    <div className="mini-stat">
                      <span>Total facturé</span>
                      <strong>{stats.spent}€</strong>
                    </div>
                    <div className="mini-stat">
                      <span>Dernière visite</span>
                      <strong>{stats.lastDate}</strong>
                    </div>
                  </div>

                  <div className="client-card-footer">
                    <button className="action-btn-sm">Modifier</button>
                    <button className="action-btn-sm" onClick={() => onDelete(client.id)}>Supprimer</button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-results">Aucun client trouvé.</div>
          )}
        </div>
      </div>

      {/* Modal Création Client */}
      {showForm && (
        <div className="management-modal">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowForm(false)}>&times;</button>
            <h2>Ajouter un Client</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Nom complet</label>
                <input 
                  type="text" 
                  required 
                  value={newClient.name}
                  onChange={e => setNewClient({...newClient, name: e.target.value})}
                  placeholder="Ex: Marie Martin"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    required 
                    value={newClient.email}
                    onChange={e => setNewClient({...newClient, email: e.target.value})}
                    placeholder="marie@exemple.com"
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input 
                    type="tel" 
                    required 
                    value={newClient.phone}
                    onChange={e => setNewClient({...newClient, phone: e.target.value})}
                    placeholder="06 00 00 00 00"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Entreprise (Optionnel)</label>
                <input 
                  type="text" 
                  value={newClient.company}
                  onChange={e => setNewClient({...newClient, company: e.target.value})}
                  placeholder="Nom de la société"
                />
              </div>
              <button type="submit" className="primary-btn w-full">Enregistrer le client</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clients
