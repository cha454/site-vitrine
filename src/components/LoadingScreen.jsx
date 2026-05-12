import { useState, useEffect } from 'react'
import './LoadingScreen.css'

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className={`loading-screen ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <span className="logo-text">CDOC</span>
          <span className="logo-sub">SUPPORT</span>
        </div>

        <div className="loading-animation">
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="tech-icon">⚡</div>
        </div>

        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div 
              className="loading-progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-progress-text">{progress}%</div>
        </div>

        <div className="loading-status">Initialisation des services...</div>
      </div>
    </div>
  )
}

export default LoadingScreen
