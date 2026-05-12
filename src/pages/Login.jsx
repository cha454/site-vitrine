import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setError('Identifiants invalides. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page login-page">
      <div className="container">
        <div className="login-card scroll-animate-scale">
          <div className="login-header">
            <span className="dashboard-eyebrow">Accès Restreint</span>
            <h1>Connexion Manager</h1>
            <p>Veuillez vous authentifier pour accéder au cockpit de gestion.</p>
          </div>

          <form onSubmit={handleLogin} className="contact-form">
            <div className="form-group">
              <label>Email Professionnel</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@cdoc-support.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button 
              type="submit" 
              className="primary-btn w-full"
              disabled={loading}
            >
              {loading ? 'Authentification...' : 'Se connecter'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Mot de passe oublié ? Contactez l'administrateur.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
