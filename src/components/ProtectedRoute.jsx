import { Navigate } from 'react-router-dom'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth' // Need to install this or use standard hook

// Since I didn't install react-firebase-hooks, I'll use a standard implementation
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return null // Or a loading spinner

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
