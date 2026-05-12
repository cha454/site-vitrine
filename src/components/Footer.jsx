import { Link } from 'react-router-dom'
import './Footer.css'

function Footer({ activeCount = 0, urgentCount = 0, clientCount = 0, monthlyRevenue = 0 }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>CDOC Manager</h3>
            <p>
              Interface de gestion des interventions informatiques, du suivi client
              et de la priorisation des urgences dans un cockpit unique.
            </p>
            <div className="footer-kpis">
              <div>
                <strong>{activeCount}</strong>
                <span>interventions actives</span>
              </div>
              <div>
                <strong>{urgentCount}</strong>
                <span>tickets urgents</span>
              </div>
              <div>
                <strong>{monthlyRevenue.toLocaleString()} FCFA</strong>
                <span>revenu réalisé</span>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Tableau de bord</Link></li>
              <li><Link to="/interventions">Interventions</Link></li>
              <li><Link to="/clients">Clients</Link></li>
              <li><Link to="/suivi">Suivi d'intervention</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Vision Produit</h4>
            <ul className="footer-links">
              <li><span>Suivi des interventions terrain</span></li>
              <li><span>Lecture immediate des priorites</span></li>
              <li><span>Pipeline client centralise</span></li>
              <li><span>Pilotage rapide des statuts</span></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Lecture Rapide</h4>
            <ul className="footer-contact">
              <li>
                <span>Clients</span>
                <strong>{clientCount}</strong>
              </li>
              <li>
                <span>Flux</span>
                <strong>Temps reel local</strong>
              </li>
              <li>
                <span>Mode</span>
                <strong>Console de gestion futuriste</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CDOC Manager. Interface de gestion des operations.</p>
          <div className="footer-legal">
            <a href="#workflow">Workflow</a>
            <span>•</span>
            <a href="#performance">Performance</a>
            <span>•</span>
            <a href="#support">Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
