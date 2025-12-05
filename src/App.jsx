import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { SobrietyProvider } from './contexts/SobrietyContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import MapPage from './pages/MapPage'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

function App() {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <SobrietyProvider>
            <Layout user={user} profile={profile}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/map" element={<MapPage profile={profile} />} />
                    <Route path="/dashboard" element={<Dashboard profile={profile} />} />
                    <Route path="/admin" element={<Admin profile={profile} />} />
                </Routes>
            </Layout>
        </SobrietyProvider>
    )
}

export default App
