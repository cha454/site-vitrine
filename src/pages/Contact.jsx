import { useState } from 'react'
import contactIllustration from '../assets/contact-illustration.svg'
import './Page.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    urgency: 'normal',
    problemType: '',
    message: ''
  })
  const [submitState, setSubmitState] = useState('idle')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide'
    }
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide (ex: 06 12 34 56 78)'
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'La description doit faire au moins 10 caractères'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Nettoyer l'erreur quand l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }

    if (submitState === 'success') {
      setSubmitState('idle')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setSubmitState('sending')

    await new Promise((resolve) => {
      window.setTimeout(resolve, 900)
    })

    setFormData({
      name: '',
      email: '',
      phone: '',
      urgency: 'normal',
      problemType: '',
      message: ''
    })
    setSubmitState('success')
  }

  return (
    <div className="page">
      <div className="container">
        <h1>📞 Contactez-nous</h1>
        <p className="page-intro">
          Besoin d'aide ? Remplissez le formulaire ci-dessous ou appelez-nous directement !
        </p>

        <section className="visual-panel">
          <div className="visual-panel-copy">
            <h2>Une demande rapide, un traitement plus simple</h2>
            <p>
              Ajoutez les details de votre panne et votre niveau d'urgence.
              Nous pouvons ainsi preparer une intervention plus efficace.
            </p>
          </div>
          <img
            src={contactIllustration}
            alt="Illustration d'un formulaire de contact pour assistance informatique"
            className="section-image"
          />
        </section>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Coordonnées</h2>
            <div className="contact-block">
              <p className="contact-label">📱 <strong>Téléphone</strong></p>
              <p className="contact-highlight">01 23 45 67 89</p>
              <p className="contact-meta">Lun-Ven: 8h-20h | Sam: 9h-18h</p>
            </div>
            
            <div className="contact-block">
              <p className="contact-label">📧 <strong>Email</strong></p>
              <p className="contact-highlight">support@cdoc.fr</p>
              <p className="contact-meta">Réponse sous 24h</p>
            </div>

            <div className="contact-block">
              <p className="contact-label">📍 <strong>Adresse</strong></p>
              <p>123 Avenue de la République</p>
              <p>75011 Paris, France</p>
            </div>

            <div className="contact-note">
              <strong>⚡ Urgence ?</strong>
              <span>Appelez-nous directement pour une intervention rapide !</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Demande d'intervention</h2>
            
            {submitState === 'success' && (
              <div className="form-success" role="status" aria-live="polite">
                Votre demande a bien été envoyée ! Nous vous recontacterons rapidement.
              </div>
            )}

            <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jean Dupont"
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jean.dupont@email.com"
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone">Téléphone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06 12 34 56 78"
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Urgence *</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                required
              >
                <option value="normal">Normal (sous 48h)</option>
                <option value="urgent">Urgent (sous 24h)</option>
                <option value="critical">Critique (intervention immédiate)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="problemType">Type de problème *</label>
              <select
                id="problemType"
                name="problemType"
                value={formData.problemType}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="slow">Ordinateur lent</option>
                <option value="virus">Virus / Malware</option>
                <option value="crash">Plantages / Écrans bleus</option>
                <option value="network">Problème réseau / Internet</option>
                <option value="hardware">Panne matérielle</option>
                <option value="install">Installation / Configuration</option>
                <option value="data">Récupération de données</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="message">Description du problème *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez votre problème en détail..."
              ></textarea>
              {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={submitState === 'sending'}
            >
              {submitState === 'sending' ? 'Envoi en cours...' : '📨 Envoyer la demande'}
            </button>
            
            <p className="form-note">
              * Champs obligatoires
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
