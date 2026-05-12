import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import './Page.css'
import './Tracking.css'

function Tracking({ interventions }) {
  useScrollAnimation()
  const [trackingNumber, setTrackingNumber] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    // Simulation de recherche par ID (numéro de dossier)
    const found = interventions.find(i => i.id.toString().endsWith(trackingNumber) || i.id.toString() === trackingNumber)

    if (found) {
      setResult(found)
    } else {
      setError('Aucun dossier trouvé avec ce numéro. Veuillez vérifier votre saisie.')
    }
  }

  const getStepStatus = (stepStatus) => {
    const statuses = ['En diagnostic', 'En réparation', 'Prêt']
    const currentStatus = result.status === 'Terminé' ? 'Prêt' : 
                         result.status === 'Urgent' ? 'En réparation' : 'En diagnostic'
    
    const currentIndex = statuses.indexOf(currentStatus)
    const stepIndex = statuses.indexOf(stepStatus)

    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'current'
    return 'pending'
  }

  return (
    <div className="page tracking-page">
      <div className="container">
        <header className="management-header scroll-animate">
          <div className="header-main">
            <span className="dashboard-eyebrow">Espace Client</span>
            <h1>Suivi d'Intervention</h1>
          </div>
        </header>

        <section className="tracking-search scroll-animate-scale">
          <div className="search-card">
            <h2>Consulter l'état de votre réparation</h2>
            <p>Entrez votre numéro de dossier (reçu par SMS ou email) pour suivre l'avancement en temps réel.</p>
            
            <form onSubmit={handleTrack} className="tracking-form">
              <input 
                type="text" 
                placeholder="Ex: 171549..." 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                required
              />
              <button type="submit" className="primary-btn">Suivre mon colis</button>
            </form>
            {error && <p className="error-text">{error}</p>}
          </div>
        </section>

        {result && (
          <div className="tracking-result scroll-animate">
            <SectionDivider />
            
            <div className="result-card">
              <div className="result-header">
                <div className="dossier-info">
                  <span>Dossier n°</span>
                  <strong>{result.id}</strong>
                </div>
                <div className={`status-badge ${result.status === 'Terminé' ? 'is-done' : 'is-active'}`}>
                  {result.status}
                </div>
              </div>

              <div className="tracking-visual">
                <div className="steps-container">
                  <div className={`step ${getStepStatus('En diagnostic')}`}>
                    <div className="step-icon">🔍</div>
                    <span className="step-label">Diagnostic</span>
                  </div>
                  <div className="step-line"></div>
                  <div className={`step ${getStepStatus('En réparation')}`}>
                    <div className="step-icon">🛠️</div>
                    <span className="step-label">Réparation</span>
                  </div>
                  <div className="step-line"></div>
                  <div className={`step ${getStepStatus('Prêt')}`}>
                    <div className="step-icon">🎁</div>
                    <span className="step-label">Prêt / Terminé</span>
                  </div>
                </div>
              </div>

              <div className="result-details">
                <div className="detail-item">
                  <span>Client</span>
                  <strong>{result.client}</strong>
                </div>
                <div className="detail-item">
                  <span>Problème</span>
                  <strong>{result.problem}</strong>
                </div>
                <div className="detail-item">
                  <span>Date d'entrée</span>
                  <strong>{result.date}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        <SectionDivider />
        
        <section className="tracking-help scroll-animate">
          <h3>Besoin d'aide ?</h3>
          <p>Si vous avez perdu votre numéro de dossier ou si vous avez une question urgente, contactez notre support technique au <strong>01 23 45 67 89</strong>.</p>
        </section>
      </div>
    </div>
  )
}

export default Tracking
