import { Link } from 'react-router-dom'
import './Testimonials.css'

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Particulier",
      avatar: "👩",
      rating: 5,
      text: "Service impeccable ! Mon ordinateur était complètement bloqué, le technicien est intervenu rapidement et a tout résolu en moins d'une heure. Je recommande vivement !",
      date: "Il y a 2 semaines"
    },
    {
      id: 2,
      name: "Jean Martin",
      role: "Gérant PME",
      avatar: "👨",
      rating: 5,
      text: "Nous faisons appel à CDOC depuis 2 ans pour la maintenance de notre parc informatique. Toujours réactifs et professionnels. Un vrai partenaire de confiance.",
      date: "Il y a 1 mois"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Freelance",
      avatar: "👩‍💼",
      rating: 5,
      text: "J'ai perdu toutes mes données suite à un crash de disque dur. L'équipe a réussi à tout récupérer ! Un grand merci pour leur expertise et leur patience.",
      date: "Il y a 3 semaines"
    },
    {
      id: 4,
      name: "Pierre Durand",
      role: "Retraité",
      avatar: "👴",
      rating: 5,
      text: "Très pédagogue et patient. Le technicien a pris le temps de m'expliquer comment mieux protéger mon ordinateur. Tarifs honnêtes et transparents.",
      date: "Il y a 1 semaine"
    },
    {
      id: 5,
      name: "Amélie Bernard",
      role: "Étudiante",
      avatar: "👩‍🎓",
      rating: 5,
      text: "Mon Mac ne démarrait plus à 2 jours de rendre mon mémoire. Intervention en urgence le jour même, problème résolu en 30 minutes. Vous m'avez sauvé la vie !",
      date: "Il y a 4 jours"
    },
    {
      id: 6,
      name: "Thomas Petit",
      role: "Commerçant",
      avatar: "👨‍💼",
      rating: 5,
      text: "Installation complète du réseau WiFi de ma boutique. Travail soigné, propre et rapide. Le système fonctionne parfaitement depuis 6 mois.",
      date: "Il y a 2 mois"
    }
  ]

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="testimonials-title">💬 Ils nous font confiance</h2>
        <p className="testimonials-subtitle">
          Découvrez les avis de nos clients satisfaits
        </p>

        <div className="testimonials-stats">
          <div className="stat-box">
            <strong>4.9/5</strong>
            <span>Note moyenne</span>
          </div>
          <div className="stat-box">
            <strong>500+</strong>
            <span>Clients satisfaits</span>
          </div>
          <div className="stat-box">
            <strong>98%</strong>
            <span>Taux de satisfaction</span>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              
              <p className="testimonial-text">"{testimonial.text}"</p>
              
              <p className="testimonial-date">{testimonial.date}</p>
            </div>
          ))}
        </div>

        <div className="testimonials-cta">
          <p>Besoin du meme niveau de service pour votre materiel ?</p>
          <Link to="/contact" className="review-btn">
            Demander une intervention
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
