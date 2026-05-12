import { Link } from 'react-router-dom'
import './ServiceArea.css'

function ServiceArea() {
  const zones = [
    { name: "Paris Centre", delay: "0.1s" },
    { name: "Paris 11e", delay: "0.2s" },
    { name: "Paris 12e", delay: "0.3s" },
    { name: "Paris 20e", delay: "0.4s" },
    { name: "Montreuil", delay: "0.5s" },
    { name: "Vincennes", delay: "0.6s" },
    { name: "Saint-Mandé", delay: "0.7s" },
    { name: "Charenton", delay: "0.8s" },
  ]

  return (
    <section className="service-area-section">
      <div className="container">
        <h2 className="service-area-title">🗺️ Zone d'Intervention</h2>
        <p className="service-area-subtitle">
          Nous intervenons dans un rayon de 20km autour de Paris
        </p>

        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-center">
              <div className="center-marker">📍</div>
              <p>Paris Centre</p>
            </div>
            
            <div className="coverage-circle"></div>
            <div className="coverage-circle-outer"></div>

            {zones.map((zone, index) => (
              <div
                key={index}
                className={`zone-marker zone-${index + 1}`}
                style={{ animationDelay: zone.delay }}
              >
                <span className="marker-dot"></span>
                <span className="marker-label">{zone.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="service-area-info">
          <div className="info-card">
            <span className="info-icon">🚗</span>
            <div>
              <strong>Déplacement inclus</strong>
              <p>Dans un rayon de 20km</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">💰</span>
            <div>
              <strong>Frais supplémentaires</strong>
              <p>Au-delà de 20km : 500 FCFA/km</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">🌐</span>
            <div>
              <strong>Assistance à distance</strong>
              <p>Partout en France</p>
            </div>
          </div>
        </div>

        <div className="service-area-cta">
          <p>Vous n'êtes pas sûr d'être dans notre zone ?</p>
          <Link to="/contact" className="check-btn">Vérifier mon adresse</Link>
        </div>
      </div>
    </section>
  )
}

export default ServiceArea
