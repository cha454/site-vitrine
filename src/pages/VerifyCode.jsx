import { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { useNavigate, useLocation } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Login.css'

function VerifyCode() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { email, uid } = location.state || {}
  
  useScrollAnimation()

  useEffect(() => {
    if (!uid) {
      navigate('/register')
    }
  }, [uid, navigate])

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        if (userData.verificationCode === code) {
          // Code correct
          await updateDoc(doc(db, 'users', uid), {
            verified: true,
            verificationCode: null // On efface le code après usage
          })
          alert("Compte vérifié avec succès !")
          navigate('/')
        } else {
          setError('Code de vérification incorrect.')
        }
      } else {
        setError('Erreur lors de la récupération des données utilisateur.')
      }
    } catch (err) {
      console.error("Verification Error:", err)
      setError(`Erreur lors de la vérification : ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page login-page">
      <div className="container">
        <div className="login-card">
          <div className="login-header">
            <span className="dashboard-eyebrow">Sécurité</span>
            <h1>Vérifier votre email</h1>
            <p>Un code de vérification a été envoyé à <strong>{email}</strong>.</p>
          </div>

          <form onSubmit={handleVerify} className="contact-form">
            <div className="form-group">
              <label>Code à 6 chiffres</label>
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                maxLength="6"
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '5px' }}
                required
              />
            </div>
            {error && <p className="error-text" style={{color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem'}}>{error}</p>}
            <button 
              type="submit" 
              className="primary-btn w-full"
              disabled={loading}
            >
              {loading ? 'Vérification...' : 'Vérifier le code'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Vous n'avez pas reçu le code ? Contactez le support.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyCode
