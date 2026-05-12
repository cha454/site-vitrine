import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import './Page.css'
import './Blog.css'

const MOCK_ARTICLES = [
  {
    id: 1,
    title: "Comment sécuriser votre ordinateur ?",
    category: "Sécurité",
    excerpt: "Découvrez les 5 étapes essentielles pour protéger vos données personnelles contre les menaces en ligne.",
    content: "La sécurité informatique est devenue une priorité absolue. Commencez par utiliser des mots de passe complexes...",
    date: "2024-05-10",
    likes: 12
  },
  {
    id: 2,
    title: "Nettoyage PC : pourquoi c'est important ?",
    category: "Maintenance",
    excerpt: "Un ordinateur lent est souvent le signe d'un encombrement. Apprenez à libérer de l'espace efficacement.",
    content: "Au fil du temps, votre système accumule des fichiers temporaires et des logiciels inutiles...",
    date: "2024-05-08",
    likes: 8
  },
  {
    id: 3,
    title: "Bien choisir ses composants PC",
    category: "Hardware",
    excerpt: "Gaming, bureautique ou montage vidéo ? Guide complet pour choisir le matériel adapté à vos besoins.",
    content: "Le choix du processeur et de la carte graphique dépend énormément de votre usage principal...",
    date: "2024-05-05",
    likes: 15
  },
  {
    id: 4,
    title: "Les nouveautés de Windows 11",
    category: "Logiciel",
    excerpt: "Tour d'horizon des dernières fonctionnalités de Microsoft pour améliorer votre productivité.",
    content: "Windows 11 apporte une interface repensée et de nouveaux outils comme les widgets et les bureaux virtuels...",
    date: "2024-05-01",
    likes: 5
  }
]

function Blog({ onLike }) {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)

  // Simulation d'un chargement de données avec useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setArticles(MOCK_ARTICLES)
      setLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  // Mise à jour du titre de la page
  useEffect(() => {
    document.title = "CDOC Support - Blog"
  }, [])

  const categories = ['Tous', ...new Set(MOCK_ARTICLES.map(a => a.category))]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, likes: article.likes + 1 } : article
    ))
    if (onLike) onLike()
  }

  return (
    <div className="page blog-page">
      <div className="container">
        <h1>📰 Notre Blog</h1>
        <p className="page-intro">
          Retrouvez nos derniers conseils et astuces pour entretenir votre matériel informatique.
        </p>

        <div className="blog-controls">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Rechercher un article..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="blog-input"
            />
          </div>
          
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="blog-loading">
            <div className="spinner"></div>
            <p>Chargement des articles...</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <BlogCard 
                  key={article.id}
                  article={article}
                  onLike={handleLike}
                  onClick={setSelectedArticle}
                />
              ))
            ) : (
              <div className="no-results">
                <p>Aucun article ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal d'article */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedArticle(null)}>×</button>
            <div className="modal-header">
              <span className="blog-category">{selectedArticle.category}</span>
              <span className="blog-date">{selectedArticle.date}</span>
            </div>
            <h2>{selectedArticle.title}</h2>
            <div className="modal-body">
              <p className="article-full-content">{selectedArticle.content}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="modal-footer">
              <button className="primary-btn" onClick={() => setSelectedArticle(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog