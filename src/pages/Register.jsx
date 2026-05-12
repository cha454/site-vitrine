import { useState } from 'react'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Login.css' // On réutilise les styles de base du login

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  useScrollAnimation()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setError('Les mots de passe ne correspondent pas.')
    }
    
    setLoading(true)
    setError('')
    
    try {
      // 1. Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // 2. Générer un code de vérification à 6 chiffres
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      // 3. Sauvegarder le code et le statut dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        verified: false,
        verificationCode: verificationCode,
        createdAt: new Date().toISOString()
      })
      
      // 4. Envoyer le code par email via l'API SMTP
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: "Votre code de vérification - Site Vitrine",
          text: `Votre code de vérification est : ${verificationCode}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
              <h2>Bienvenue !</h2>
              <p>Merci de vous être inscrit. Voici votre code de vérification pour finaliser votre inscription :</p>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; color: #3b82f6;">
                ${verificationCode}
              </div>
              <p style="margin-top: 20px; font-size: 14px; color: #64748b;">Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>
            </div>
          `
        })
      })
      
      // 5. Rediriger vers la page de vérification
      navigate('/verify', { state: { email, uid: user.uid } })
      
    } catch (err) {
      console.error("Registration Error:", err)
      if (err.code === 'auth/email-already-in-use') {
        setError('Cet email est déjà utilisé.')
      } else {
        setError(`Erreur lors de l'inscription : ${err.message}`)
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
            <span className="dashboard-eyebrow">Rejoignez-nous</span>
            <h1>Créer un compte</h1>
            <p>Inscrivez-vous pour accéder au tableau de bord.</p>
          </div>

          <form onSubmit={handleRegister} className="contact-form">
            <div className="form-group">
              <label>Email Professionnel</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
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
            <div className="form-group">
              <label>Confirmer le mot de passe</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="error-text" style={{color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem'}}>{error}</p>}
            <button 
              type="submit" 
              className="primary-btn w-full"
              disabled={loading}
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Déjà un compte ? <Link to="/login" style={{color: '#3b82f6', textDecoration: 'none'}}>Se connecter</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
