import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ScrollingGallery from '../components/ScrollingGallery'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import ServiceArea from '../components/ServiceArea'
import SectionDivider from '../components/SectionDivider'
import heroSupport from '../assets/hero-support.svg'
import './Page.css'

function Home() {
  const [supportStatus, setSupportStatus] = useState('En ligne')
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Dépannage rapide pour vos problèmes informatiques'
  useScrollAnimation()

  useEffect(() => {
    let currentText = ''
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex]
        setDisplayText(currentText)
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)
    return () => clearInterval(typingInterval)
  }, [])

  useEffect(() => {

    const statuses = ['En ligne', 'Intervention en cours', 'Disponible']
    const interval = setInterval(() => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setSupportStatus(randomStatus)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page">
      <div className="container">
        <div className="hero hero-layout">
          <div className="hero-copy scroll-animate-left">
            <div className="status-badge">
              <span className="status-dot"></span>
              Support : {supportStatus}
            </div>
            <span className="eyebrow">Support Informatique Professionnel</span>
            <h1 className="hero-title min-h-[80px]">
              {displayText}
              <span className="cursor-blink">|</span>
            </h1>
            <p className="hero-text">
              Intervention à domicile ou à distance. Particuliers et professionnels.
              Disponible 7j/7 pour vos urgences.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="primary-btn">
                Demander une intervention
              </Link>
              <Link to="/about" className="secondary-btn">
                Découvrir nos services
              </Link>
            </div>
          </div>

          <div className="hero-visual scroll-animate-right">
            <img
              src={heroSupport}
              alt="Illustration d'un support informatique avec ordinateur et assistance"
              className="section-image"
            />
          </div>
        </div>

        <section className="stats-grid" aria-label="Points forts">
          <div className="stat-card scroll-animate-scale delay-1">
            <strong>⚡ Intervention rapide</strong>
            <span>Sous 24h ou assistance immédiate à distance</span>
          </div>
          <div className="stat-card scroll-animate-scale delay-2">
            <strong>🛠️ Experts certifiés</strong>
            <span>Techniciens qualifiés et expérimentés</span>
          </div>
          <div className="stat-card scroll-animate-scale delay-3">
            <strong>💰 Tarifs transparents</strong>
            <span>Devis gratuit et sans surprise</span>
          </div>
        </section>

        <SectionDivider />

        <ScrollingGallery />

        <SectionDivider />

        <section className="features">
          <div className="feature-card scroll-animate delay-1">
            <h3>🖥️ Dépannage PC & Mac</h3>
            <p>Réparation matérielle et logicielle, diagnostic complet, récupération de données</p>
          </div>
          <div className="feature-card scroll-animate delay-2">
            <h3>🔧 Maintenance</h3>
            <p>Nettoyage, optimisation, mise à jour système et sécurité</p>
          </div>
          <div className="feature-card scroll-animate delay-3">
            <h3>🌐 Réseau & Internet</h3>
            <p>Installation WiFi, configuration réseau, dépannage connexion</p>
          </div>
          <div className="feature-card scroll-animate delay-1">
            <h3>🔒 Sécurité</h3>
            <p>Antivirus, protection données, suppression malwares</p>
          </div>
          <div className="feature-card scroll-animate delay-2">
            <h3>📱 Smartphones & Tablettes</h3>
            <p>Configuration, synchronisation, résolution de problèmes</p>
          </div>
          <div className="feature-card scroll-animate delay-3">
            <h3>💾 Sauvegarde</h3>
            <p>Mise en place de solutions de backup automatiques</p>
          </div>
        </section>

        <section className="highlight-panel scroll-animate">

          <div>
            <h2>Pourquoi choisir CDOC Support ?</h2>
            <p>
              Nous intervenons rapidement pour résoudre tous vos problèmes informatiques.
              Tarifs clairs, techniciens qualifiés, garantie sur toutes nos interventions.
            </p>
          </div>
          <Link to="/tarifs" className="text-link">
            Voir nos tarifs
          </Link>
        </section>
      </div>

      <Testimonials />
      <SectionDivider />
      <ServiceArea />
      <SectionDivider />
      <FAQ />
    </div>
  )
}

export default Home
