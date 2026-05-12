import './BlogCard.css'

function BlogCard({ article, onLike, onClick }) {
  return (
    <article 
      className="blog-card"
      onClick={() => onClick(article)}
    >
      <div className="blog-card-header">
        <span className="blog-category">{article.category}</span>
        <span className="blog-date">{article.date}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="blog-card-footer">
        <button 
          className="like-btn" 
          onClick={(e) => {
            e.stopPropagation()
            onLike(article.id)
          }}
        >
          ❤️ {article.likes}
        </button>
        <button className="read-more">Lire la suite</button>
      </div>
    </article>
  )
}

export default BlogCard