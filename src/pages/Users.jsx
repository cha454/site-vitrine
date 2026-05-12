import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionDivider from '../components/SectionDivider'
import './Page.css'
import './Interventions.css' // On réutilise les styles de tableau

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  useScrollAnimation()

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const toggleUserVerification = async (userId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        verified: !currentStatus
      })
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Erreur lors de la mise à jour de l'utilisateur.")
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Supprimer cet utilisateur ? Cela ne supprimera pas son compte Auth, seulement ses données Firestore.")) {
      try {
        await deleteDoc(doc(db, 'users', userId))
      } catch (error) {
        console.error("Error deleting user:", error)
        alert("Erreur lors de la suppression.")
      }
    }
  }

  return (
    <div className="page interventions-page">
      <div className="container">
        <header className="management-header scroll-animate">
          <div className="header-main">
            <span className="dashboard-eyebrow">Administration</span>
            <h1>Gestion des Utilisateurs</h1>
          </div>
        </header>

        <SectionDivider />

        <div className="management-container scroll-animate">
          <div className="table-header">
            <span>Email</span>
            <span>Date d'inscription</span>
            <span>Statut</span>
            <span style={{ textAlign: 'right' }}>Actions</span>
          </div>
          <div className="table-body">
            {loading ? (
              <div className="no-results">Chargement des utilisateurs...</div>
            ) : users.length > 0 ? (
              users.map((user) => (
                <div key={user.id} className="table-row">
                  <span className="row-client">{user.email}</span>
                  <span className="row-date">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                  </span>
                  <span className={`row-status ${user.verified ? 'is-done' : 'is-urgent'}`}>
                    {user.verified ? 'Vérifié' : 'Non vérifié'}
                  </span>
                  <div className="row-actions">
                    <button 
                      className="primary-btn" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                      onClick={() => toggleUserVerification(user.id, user.verified)}
                    >
                      {user.verified ? 'Invalider' : 'Valider'}
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDeleteUser(user.id)}
                      title="Supprimer"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">Aucun utilisateur trouvé.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
