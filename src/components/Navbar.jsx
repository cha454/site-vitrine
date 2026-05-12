import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar({ activeCount = 0, urgentCount = 0, clientCount = 0, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  const links = user ? [
    { to: '/', label: 'Tableau de bord', end: true },
    { to: '/interventions', label: 'Interventions' },
    { to: '/clients', label: 'Clients' },
    { to: '/users', label: 'Utilisateurs' },
    { to: '/suivi', label: 'Suivi Client' },
  ] : [
    { to: '/suivi', label: 'Suivi Client' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" className="nav-logo" onClick={closeMenu} end>
            <span className="nav-logo-mark" aria-hidden="true">CM</span>
            <span className="nav-logo-copy">
              <strong>CDOC Manager</strong>
              <small>Centre de pilotage</small>
            </span>
          </NavLink>

          {user && (
            <div className="nav-meta" aria-label="Résumé d'activité">
              <span>{activeCount} interventions</span>
              <span>{urgentCount} urgences</span>
            </div>
          )}
        </div>

        <button
          type="button"
          className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label="Ouvrir le menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          id="main-navigation"
          className={`nav-menu ${isMenuOpen ? 'open' : ''}`}
        >
          {links.map((link) => (
            <li key={link.to} className="nav-item">
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {user ? (
            <li className="nav-item">
              <button onClick={onLogout} className="logout-btn">Déconnexion</button>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" onClick={closeMenu}>Connexion</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
