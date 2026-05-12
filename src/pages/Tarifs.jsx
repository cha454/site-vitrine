import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import pricingIllustration from '../assets/pricing-illustration.svg'
import PricingTable from '../components/PricingTable'
import './Page.css'

function Tarifs() {
  useScrollAnimation()
  const tarifs = [
    {
      id: 1,
      category: "Dépannage à domicile",
      items: [
        { service: "Diagnostic et devis", price: "Gratuit" },
        { service: "Intervention standard (1h)", price: "25 000 FCFA" },
        { service: "Intervention urgente (-24h)", price: "40 000 FCFA" },
        { service: "Forfait demi-journée (4h)", price: "80 000 FCFA" },
        { service: "Déplacement (dans un rayon de 20km)", price: "Inclus" }
      ]
    },
    {
      id: 2,
      category: "Assistance à distance",
      items: [
        { service: "Intervention courte (-30min)", price: "10 000 FCFA" },
        { service: "Intervention standard (1h)", price: "18 000 FCFA" },
        { service: "Forfait 5 heures", price: "80 000 FCFA" },
        { service: "Abonnement mensuel (2h/mois)", price: "30 000 FCFA/mois" }
      ]
    },
    {
      id: 3,
      category: "Prestations spécifiques",
      items: [
        { service: "Installation système d'exploitation", price: "30 000 FCFA" },
        { service: "Récupération de données", price: "À partir de 50 000 FCFA" },
        { service: "Nettoyage virus/malware", price: "25 000 FCFA" },
        { service: "Configuration réseau WiFi", price: "20 000 FCFA" },
        { service: "Sauvegarde et transfert de données", price: "15 000 FCFA" },
        { service: "Formation personnalisée (1h)", price: "15 000 FCFA" }
      ]
    },
    {
      id: 4,
      category: "Contrats de maintenance",
      items: [
        { service: "Particulier (1 visite/trimestre)", price: "60 000 FCFA/an" },
        { service: "Professionnel (1 visite/mois)", price: "200 000 FCFA/an" },
        { service: "Entreprise (support prioritaire)", price: "Sur devis" }
      ]
    }
  ]

  return (
    <div className="page">
      <div className="container">
        <h1 className="scroll-animate">💰 Nos Tarifs</h1>
        <p className="blog-intro scroll-animate">
          Tarifs transparents et sans surprise. Tous nos prix sont nets.
        </p>

        <section className="visual-panel visual-panel-accent scroll-animate">
          <div className="visual-panel-copy">
            <h2>Des prix simples a comprendre</h2>
            <p>
              Chaque prestation est presentee de facon lisible pour vous aider a
              choisir rapidement la formule adaptee a votre besoin.
            </p>
          </div>
          <img
            src={pricingIllustration}
            alt="Illustration d'une grille tarifaire de services informatiques"
            className="section-image"
          />
        </section>

        <SectionDivider />

        <div className="promo-banner scroll-animate-scale">
          <h3>🎁 Offre spéciale</h3>
          <p>
            Diagnostic gratuit + 10% de réduction sur votre première intervention !
          </p>
        </div>

        {tarifs.map((tarif, index) => (
          <div key={tarif.id} className={`scroll-animate-${index % 2 === 0 ? 'left' : 'right'}`}>
            <PricingTable 
              category={tarif.category}
              items={tarif.items}
            />
            {index < tarifs.length - 1 && <SectionDivider />}
          </div>
        ))}

        <SectionDivider />

        <section className="about-section important-note scroll-animate">
          <h2>ℹ️ Informations importantes</h2>
          <ul className="values-list">
            <li className="scroll-animate-left delay-1">Tous les tarifs sont en FCFA</li>
            <li className="scroll-animate-left delay-2">Devis gratuit et sans engagement</li>
            <li className="scroll-animate-left delay-3">Paiement par CB, Mobile Money ou espèces</li>
            <li className="scroll-animate-left delay-4">Garantie 3 mois sur toutes nos interventions</li>
            <li className="scroll-animate-left delay-5">Tarifs dégressifs pour les professionnels</li>
            <li className="scroll-animate-left delay-1">Possibilité de forfaits personnalisés</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Tarifs
