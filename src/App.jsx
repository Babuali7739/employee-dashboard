import { useContext } from 'react'
import {AuthContext, AuthProvider} from './context/AuthContext'
import Login from './pages/Login'
import List from './pages/List'
import Details from './pages/Details'
import Analytics from './pages/Analytics'
import { Navigate } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function ProtectedRoute ({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
} 


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <AuthProvider>

          <Login/>
          </AuthProvider>
      } />
        <Route path='/list' element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        } 
        />

        <Route path='/details/:id' element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        } 
        />

        <Route path='/analytics' element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } 
        />  

      </Routes>
    </BrowserRouter>
  )
}

export default App
