import { useState } from 'react'
import './FloatingCallButton.css'

function FloatingCallButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="floating-call-container">
      {isExpanded && (
        <div className="call-options">
          <a href="tel:+33123456789" className="call-option">
            <span className="call-icon">📱</span>
            <div className="call-text">
              <strong>Appeler maintenant</strong>
              <span>01 23 45 67 89</span>
            </div>
          </a>
          <a href="mailto:support@cdoc.fr" className="call-option">
            <span className="call-icon">📧</span>
            <div className="call-text">
              <strong>Email</strong>
              <span>support@cdoc.fr</span>
            </div>
          </a>
        </div>
      )}
      
      <button
        className={`floating-call-button ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Options de contact"
      >
        {isExpanded ? '✕' : '📞'}
      </button>
    </div>
  )
}

export default FloatingCallButton
