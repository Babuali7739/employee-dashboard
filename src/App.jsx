import { useContext } from 'react'
import { AuthContext, AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import List from './pages/List'
import Details from './pages/Details'
import Analytics from './pages/Analytics'
import NavBar from './component/NavBar'
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


const ProtectedRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>
            }
          />

          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  )
}

export default App