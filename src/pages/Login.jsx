import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  // Activer les animations
  useScrollAnimation()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
      navigate('/')
    } catch (err) {
      console.error("Firebase Auth Error:", err.code, err.message)
      if (err.code === 'auth/invalid-credential') {
        setError('Identifiants invalides (Email ou Mot de passe incorrect).')
      } else if (err.code === 'auth/user-not-found') {
        setError('Aucun compte trouvé avec cet email.')
      } else if (err.code === 'auth/wrong-password') {
        setError('Mot de passe incorrect.')
      } else {
        setError(`Erreur d'authentification : ${err.code}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page login-page">
      <div className="container">
        <div className="login-card">
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
            <p>Pas encore de compte ? <Link to="/register" style={{color: '#3b82f6', textDecoration: 'none'}}>S'inscrire</Link></p>
            <p style={{marginTop: '0.5rem'}}>Mot de passe oublié ? Contactez l'administrateur.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
