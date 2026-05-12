import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import servicesIllustration from '../assets/services-illustration.svg'
import './Page.css'

function About() {
  useScrollAnimation()

  return (
    <div className="page">
      <div className="container">
        <h1 className="scroll-animate">Nos Services</h1>
        <section className="visual-panel scroll-animate">
          <div className="visual-panel-copy">
            <h2>Une assistance claire pour chaque besoin</h2>
            <p>
              Nous couvrons le depannage, la maintenance, l'installation et la
              protection de votre environnement informatique avec une approche
              simple et rassurante.
            </p>
          </div>
          <img
            src={servicesIllustration}
            alt="Illustration des services de maintenance et support informatique"
            className="section-image"
          />
        </section>
        
        <SectionDivider />

        <section className="about-section scroll-animate">
          <h2>🖥️ Dépannage Informatique</h2>
          <p>
            <strong>Ordinateurs lents, écrans bleus, virus ?</strong> Nous diagnostiquons 
            et réparons tous types de problèmes informatiques sur PC et Mac.
          </p>
          <ul className="values-list">
            <li className="scroll-animate-left delay-1">Diagnostic complet de votre matériel</li>
            <li className="scroll-animate-left delay-2">Réparation de pannes matérielles et logicielles</li>
            <li className="scroll-animate-left delay-3">Récupération de données perdues</li>
            <li className="scroll-animate-left delay-4">Réinstallation système d'exploitation</li>
            <li className="scroll-animate-left delay-5">Suppression de virus et malwares</li>
          </ul>
        </section>

        <SectionDivider />

        <section className="about-section scroll-animate">
          <h2>🔧 Maintenance Préventive</h2>
          <p>
            <strong>Évitez les pannes !</strong> Un entretien régulier prolonge la durée 
            de vie de votre matériel et améliore ses performances.
          </p>
          <ul className="values-list">
            <li className="scroll-animate-right delay-1">Nettoyage physique et logiciel</li>
            <li className="scroll-animate-right delay-2">Optimisation des performances</li>
            <li className="scroll-animate-right delay-3">Mises à jour système et logiciels</li>
            <li className="scroll-animate-right delay-4">Vérification de la sécurité</li>
            <li className="scroll-animate-right delay-5">Contrats de maintenance sur mesure</li>
          </ul>
        </section>

        <SectionDivider />

        <section className="about-section scroll-animate">
          <h2>🌐 Installation & Configuration</h2>
          <p>
            <strong>Nouveau matériel ?</strong> Nous installons et configurons tous vos 
            équipements informatiques pour une utilisation optimale.
          </p>
          <ul className="values-list">
            <li className="scroll-animate-left delay-1">Installation de nouveaux ordinateurs</li>
            <li className="scroll-animate-left delay-2">Configuration réseau WiFi et filaire</li>
            <li className="scroll-animate-left delay-3">Paramétrage imprimantes et périphériques</li>
            <li className="scroll-animate-left delay-4">Installation de logiciels professionnels</li>
            <li className="scroll-animate-left delay-5">Transfert de données ancien/nouveau PC</li>
          </ul>
        </section>

        <SectionDivider />

        <section className="about-section scroll-animate">
          <h2>🔒 Sécurité & Protection</h2>
          <p>
            <strong>Protégez vos données !</strong> Nous sécurisons votre environnement 
            informatique contre les menaces en ligne.
          </p>
          <ul className="values-list">
            <li className="scroll-animate-right delay-1">Installation et configuration antivirus</li>
            <li className="scroll-animate-right delay-2">Mise en place de pare-feu</li>
            <li className="scroll-animate-right delay-3">Sécurisation des connexions WiFi</li>
            <li className="scroll-animate-right delay-4">Formation aux bonnes pratiques</li>
            <li className="scroll-animate-right delay-5">Solutions de sauvegarde automatique</li>
          </ul>
        </section>

        <SectionDivider />

        <section className="about-section scroll-animate">
          <h2>📞 Assistance à Distance</h2>
          <p>
            <strong>Besoin d'aide rapidement ?</strong> Notre service d'assistance à distance 
            vous permet de résoudre de nombreux problèmes sans déplacement.
          </p>
          <ul className="values-list">
            <li className="scroll-animate-left delay-1">Prise en main sécurisée de votre ordinateur</li>
            <li className="scroll-animate-left delay-2">Résolution de problèmes logiciels</li>
            <li className="scroll-animate-left delay-3">Configuration et paramétrage</li>
            <li className="scroll-animate-left delay-4">Formation et accompagnement</li>
            <li className="scroll-animate-left delay-5">Tarif réduit par rapport au déplacement</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About
