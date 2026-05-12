import servicesIllustration from '../assets/services-illustration.svg'
import './Page.css'

function About() {
  return (
    <div className="page">
      <div className="container">
        <h1>Nos Services</h1>
        <section className="visual-panel">
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
        
        <section className="about-section">
          <h2>🖥️ Dépannage Informatique</h2>
          <p>
            <strong>Ordinateurs lents, écrans bleus, virus ?</strong> Nous diagnostiquons 
            et réparons tous types de problèmes informatiques sur PC et Mac.
          </p>
          <ul className="values-list">
            <li>Diagnostic complet de votre matériel</li>
            <li>Réparation de pannes matérielles et logicielles</li>
            <li>Récupération de données perdues</li>
            <li>Réinstallation système d'exploitation</li>
            <li>Suppression de virus et malwares</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🔧 Maintenance Préventive</h2>
          <p>
            <strong>Évitez les pannes !</strong> Un entretien régulier prolonge la durée 
            de vie de votre matériel et améliore ses performances.
          </p>
          <ul className="values-list">
            <li>Nettoyage physique et logiciel</li>
            <li>Optimisation des performances</li>
            <li>Mises à jour système et logiciels</li>
            <li>Vérification de la sécurité</li>
            <li>Contrats de maintenance sur mesure</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🌐 Installation & Configuration</h2>
          <p>
            <strong>Nouveau matériel ?</strong> Nous installons et configurons tous vos 
            équipements informatiques pour une utilisation optimale.
          </p>
          <ul className="values-list">
            <li>Installation de nouveaux ordinateurs</li>
            <li>Configuration réseau WiFi et filaire</li>
            <li>Paramétrage imprimantes et périphériques</li>
            <li>Installation de logiciels professionnels</li>
            <li>Transfert de données ancien/nouveau PC</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🔒 Sécurité & Protection</h2>
          <p>
            <strong>Protégez vos données !</strong> Nous sécurisons votre environnement 
            informatique contre les menaces en ligne.
          </p>
          <ul className="values-list">
            <li>Installation et configuration antivirus</li>
            <li>Mise en place de pare-feu</li>
            <li>Sécurisation des connexions WiFi</li>
            <li>Formation aux bonnes pratiques</li>
            <li>Solutions de sauvegarde automatique</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>📞 Assistance à Distance</h2>
          <p>
            <strong>Besoin d'aide rapidement ?</strong> Notre service d'assistance à distance 
            vous permet de résoudre de nombreux problèmes sans déplacement.
          </p>
          <ul className="values-list">
            <li>Prise en main sécurisée de votre ordinateur</li>
            <li>Résolution de problèmes logiciels</li>
            <li>Configuration et paramétrage</li>
            <li>Formation et accompagnement</li>
            <li>Tarif réduit par rapport au déplacement</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About
