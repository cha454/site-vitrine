import { Link } from 'react-router-dom'
import { useState } from 'react'
import './FAQ.css'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Quels sont vos délais d'intervention ?",
      answer: "Pour une intervention standard, nous intervenons sous 48h. En cas d'urgence, nous pouvons intervenir sous 24h voire le jour même selon disponibilité. L'assistance à distance est disponible immédiatement."
    },
    {
      question: "Intervenez-vous à domicile ou en entreprise ?",
      answer: "Oui, nous nous déplaçons à domicile et en entreprise dans un rayon de 20km autour de Paris. Au-delà, des frais de déplacement supplémentaires peuvent s'appliquer. Nous proposons également une assistance à distance pour de nombreux problèmes."
    },
    {
      question: "Proposez-vous un devis gratuit ?",
      answer: "Oui, le diagnostic et le devis sont totalement gratuits et sans engagement. Nous établissons un devis détaillé avant toute intervention pour que vous sachiez exactement ce que vous allez payer."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les paiements par carte bancaire, espèces, chèque et virement bancaire. Pour les entreprises, nous proposons également le paiement à 30 jours sur facture."
    },
    {
      question: "Offrez-vous une garantie sur vos interventions ?",
      answer: "Oui, toutes nos interventions sont garanties 3 mois. Si le même problème réapparaît dans les 3 mois suivant notre intervention, nous revenons gratuitement pour le résoudre."
    },
    {
      question: "Puis-je récupérer mes données perdues ?",
      answer: "Dans la plupart des cas, oui. Nous disposons d'outils professionnels de récupération de données. Le taux de réussite dépend de la nature de la panne et de l'état du disque dur. Nous effectuons un diagnostic gratuit pour évaluer les chances de récupération."
    },
    {
      question: "Travaillez-vous sur Mac et PC ?",
      answer: "Oui, nos techniciens sont formés pour intervenir aussi bien sur PC Windows que sur Mac. Nous gérons également les problèmes sur Linux et les appareils mobiles (smartphones, tablettes)."
    },
    {
      question: "Proposez-vous des contrats de maintenance ?",
      answer: "Oui, nous proposons des contrats de maintenance adaptés aux particuliers et aux entreprises. Ces contrats incluent des visites préventives régulières, un support prioritaire et des tarifs préférentiels."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">❓ Questions Fréquentes</h2>
        <p className="faq-subtitle">
          Trouvez rapidement les réponses à vos questions les plus courantes
        </p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Vous ne trouvez pas la réponse à votre question ?</p>
          <Link to="/contact" className="faq-contact-btn">
            Contactez-nous
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQ
