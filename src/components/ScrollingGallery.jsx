import heroSupport from '../assets/hero-support.svg'
import servicesIllustration from '../assets/services-illustration.svg'
import pricingIllustration from '../assets/pricing-illustration.svg'
import contactIllustration from '../assets/contact-illustration.svg'
import './ScrollingGallery.css'

const galleryItems = [
  {
    title: 'Diagnostic PC',
    description: 'Analyse rapide des pannes et solutions claires.',
    image: heroSupport,
  },
  {
    title: 'Services Sur Mesure',
    description: 'Maintenance, reseau, installation et securite.',
    image: servicesIllustration,
  },
  {
    title: 'Tarifs Transparents',
    description: 'Des prix lisibles et des interventions sans surprise.',
    image: pricingIllustration,
  },
  {
    title: 'Contact Rapide',
    description: 'Demande d intervention simple et assistance reactive.',
    image: contactIllustration,
  },
]

function GalleryTrack({ hidden = false }) {
  return (
    <div className="gallery-track" aria-hidden={hidden}>
      {galleryItems.map((item) => (
        <article key={`${hidden ? 'clone' : 'base'}-${item.title}`} className="gallery-card">
          <img
            src={item.image}
            alt={hidden ? '' : item.title}
            className="gallery-image"
            loading="lazy"
          />
          <div className="gallery-overlay">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function ScrollingGallery() {
  return (
    <section className="scrolling-gallery-section" aria-labelledby="scrolling-gallery-title">
      <div className="container">
        <div className="gallery-heading">
          <span className="gallery-eyebrow">Visuels En Mouvement</span>
          <h2 id="scrolling-gallery-title">Nos interventions et services en images</h2>
          <p>
            Une galerie defilante pour presenter rapidement l univers CDOC Support
            et les prestations mises en avant.
          </p>
        </div>

        <div className="gallery-marquee">
          <GalleryTrack />
          <GalleryTrack hidden />
        </div>
      </div>
    </section>
  )
}

export default ScrollingGallery
