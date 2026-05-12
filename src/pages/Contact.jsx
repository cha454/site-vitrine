import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import contactIllustration from '../assets/contact-illustration.svg'
import './Page.css'

function Contact() {
  useScrollAnimation()
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
        <h1 className="scroll-animate">📞 Contactez-nous</h1>
        <p className="page-intro scroll-animate">
          Besoin d'aide ? Remplissez le formulaire ci-dessous ou appelez-nous directement !
        </p>

        <section className="visual-panel scroll-animate">
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

        <SectionDivider />

        <div className="contact-grid">
          <div className="contact-info scroll-animate-left">
            <h3>Coordonnées</h3>
            <div className="info-card">
              <strong>📍 Adresse</strong>
              <p>123 Rue de l'Informatique, 75000 Paris</p>
            </div>
            <div className="info-card">
              <strong>📱 Téléphone</strong>
              <p>01 23 45 67 89</p>
            </div>
            <div className="info-card">
              <strong>📧 Email</strong>
              <p>contact@cdoc-support.fr</p>
            </div>
            <div className="info-card">
              <strong>🕒 Horaires</strong>
              <p>Lundi - Vendredi : 9h - 19h<br />Samedi : 10h - 17h</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form scroll-animate-right">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Votre nom"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="votre@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="urgency">Urgence</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="normal">Normale (Sous 24-48h)</option>
                  <option value="urgent">Urgente (Sous 24h)</option>
                  <option value="critical">Critique (Immédiat)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="problemType">Type de problème</label>
                <select
                  id="problemType"
                  name="problemType"
                  value={formData.problemType}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="hardware">Panne matérielle</option>
                  <option value="software">Problème logiciel / Windows</option>
                  <option value="network">Réseau / Internet</option>
                  <option value="virus">Virus / Sécurité</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Description du problème</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Décrivez votre problème en quelques mots..."
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className={`primary-btn ${submitState}`}
              disabled={submitState === 'sending'}
            >
              {submitState === 'idle' && 'Envoyer la demande'}
              {submitState === 'sending' && 'Envoi en cours...'}
              {submitState === 'success' && '✓ Message envoyé !'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
