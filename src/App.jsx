import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db, auth } from './firebase'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Interventions from './pages/Interventions'
import Clients from './pages/Clients'
import Tracking from './pages/Tracking'
import Login from './pages/Login'
import './App.css'

// Composant pour gérer les transitions et le scroll
function PageWrapper({ children }) {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  )
}

function App() {
  const [interventions, setInterventions] = useState([])
  const [clients, setClients] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  )

  // Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Fetch Interventions
  useEffect(() => {
    const q = query(collection(db, 'interventions'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setInterventions(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return () => unsubscribe()
  }, [])

  // Fetch Clients
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'clients'), (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
    }, 30000)

    return () => window.clearInterval(timer)
  }, [])

  const addIntervention = async (inter) => {
    try {
      await addDoc(collection(db, 'interventions'), inter)
    } catch (error) {
      console.error("Error adding intervention:", error)
    }
  }

  const deleteIntervention = async (id) => {
    try {
      await deleteDoc(doc(db, 'interventions', id))
    } catch (error) {
      console.error("Error deleting intervention:", error)
    }
  }

  const updateInterventionStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'interventions', id), { status })
      
      // Envoi d'email SMTP si l'intervention est terminée
      if (status === 'Terminé') {
        const inter = interventions.find(i => i.id === id)
        if (inter && inter.clientEmail) {
          fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: inter.clientEmail,
              subject: `Votre réparation est prête ! (Dossier n°${id})`,
              text: `Bonjour ${inter.client}, votre matériel est prêt à être récupéré.`,
              html: `<p>Bonjour <strong>${inter.client}</strong>,</p><p>Nous avons le plaisir de vous informer que votre réparation (<strong>${inter.problem}</strong>) est terminée.</p><p>Vous pouvez venir le récupérer pendant nos horaires d'ouverture.</p>`
            })
          }).catch(err => console.error("SMTP fail:", err))
        }
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const addClient = async (client) => {
    try {
      await addDoc(collection(db, 'clients'), client)
    } catch (error) {
      console.error("Error adding client:", error)
    }
  }

  const deleteClient = async (id) => {
    try {
      await deleteDoc(doc(db, 'clients', id))
    } catch (error) {
      console.error("Error deleting client:", error)
    }
  }

  const handleLogout = () => signOut(auth)

  const urgentCount = interventions.filter((item) => item.status === 'Urgent').length
  const activeCount = interventions.filter((item) => item.status !== 'Terminé').length
  const monthlyRevenue = interventions
    .filter((item) => item.status === 'Terminé')
    .reduce((total, item) => total + item.price, 0)
  const todayLabel = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  })

  return (
    <Router>
      <LoadingScreen />
      <ScrollToTop />
      <div className="App">
        <div className="app-background" aria-hidden="true">
          <div className="bg-grid"></div>
          <div className="bg-orb bg-orb-1"></div>
          <div className="bg-orb bg-orb-2"></div>
          <div className="bg-orb bg-orb-3"></div>
          <div className="bg-circuit bg-circuit-1"></div>
          <div className="bg-circuit bg-circuit-2"></div>
          <div className="bg-chip">
            <span className="chip-core"></span>
            <span className="chip-pin chip-pin-top"></span>
            <span className="chip-pin chip-pin-right"></span>
            <span className="chip-pin chip-pin-bottom"></span>
            <span className="chip-pin chip-pin-left"></span>
          </div>
          <div className="bg-diagnostic">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="bg-spark bg-spark-1"></div>
          <div className="bg-spark bg-spark-2"></div>
        </div>

        <div className="app-shell-top">
          <div className="app-shell-inner container">
            <div className="shell-status">
              <span className="shell-dot" aria-hidden="true"></span>
              Systeme operationnel
            </div>

            <div className="shell-feed" aria-label="Indicateurs rapides">
              <span>{todayLabel}</span>
              <span>{currentTime}</span>
              <span>{monthlyRevenue.toLocaleString()} FCFA facturés</span>
              <span>{urgentCount} priorités critiques</span>
            </div>
          </div>
        </div>

        <Navbar
          activeCount={activeCount}
          urgentCount={urgentCount}
          clientCount={clients.length}
          user={user}
          onLogout={handleLogout}
        />
        <main className="app-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <PageWrapper><Dashboard interventions={interventions} clients={clients} /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/interventions" element={
              <ProtectedRoute>
                <PageWrapper><Interventions interventions={interventions} onAdd={addIntervention} onDelete={deleteIntervention} onUpdateStatus={updateInterventionStatus} /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/clients" element={
              <ProtectedRoute>
                <PageWrapper><Clients clients={clients} interventions={interventions} onAdd={addClient} onDelete={deleteClient} /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/suivi" element={<PageWrapper><Tracking interventions={interventions} /></PageWrapper>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer
          activeCount={activeCount}
          urgentCount={urgentCount}
          clientCount={clients.length}
          monthlyRevenue={monthlyRevenue}
        />
      </div>
    </Router>
  )
}

export default App
