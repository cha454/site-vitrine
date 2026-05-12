import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import Dashboard from './pages/Dashboard'
import Interventions from './pages/Interventions'
import Clients from './pages/Clients'
import Tracking from './pages/Tracking'
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
  const [interventions, setInterventions] = useState(() => {
    const saved = localStorage.getItem('interventions')
    return saved ? JSON.parse(saved) : [
      { id: 1, client: "Jean Dupont", problem: "Écran bleu", status: "En cours", date: "2024-05-11", price: 25000 },
      { id: 2, client: "Marie Curie", problem: "Installation Windows", status: "Terminé", date: "2024-05-10", price: 30000 },
      { id: 3, client: "Albert Einstein", problem: "Récupération de données", status: "Urgent", date: "2024-05-11", price: 50000 }
    ]
  })

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('clients')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Jean Dupont", email: "jean@dupont.fr", phone: "0612345678" },
      { id: 2, name: "Marie Curie", email: "marie@curie.fr", phone: "0622334455" },
      { id: 3, name: "Albert Einstein", email: "albert@einstein.fr", phone: "0633445566" }
    ]
  })
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  )

  useEffect(() => {
    localStorage.setItem('interventions', JSON.stringify(interventions))
  }, [interventions])

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients))
  }, [clients])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))
    }, 30000)

    return () => window.clearInterval(timer)
  }, [])

  const addIntervention = (inter) => {
    setInterventions([...interventions, { ...inter, id: Date.now() }])
  }

  const deleteIntervention = (id) => {
    setInterventions(interventions.filter(i => i.id !== id))
  }

  const updateInterventionStatus = (id, status) => {
    setInterventions(interventions.map(i => i.id === id ? { ...i, status } : i))
  }

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
        />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<PageWrapper><Dashboard interventions={interventions} clients={clients} /></PageWrapper>} />
            <Route path="/interventions" element={<PageWrapper><Interventions interventions={interventions} onAdd={addIntervention} onDelete={deleteIntervention} onUpdateStatus={updateInterventionStatus} /></PageWrapper>} />
            <Route path="/clients" element={<PageWrapper><Clients clients={clients} interventions={interventions} /></PageWrapper>} />
            <Route path="/suivi" element={<PageWrapper><Tracking interventions={interventions} /></PageWrapper>} />
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
