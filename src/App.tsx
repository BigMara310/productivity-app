import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Physical from './pages/Physical'
import Intellectual from './pages/Intellectual'
import Financial from './pages/Financial'
import Spiritual from './pages/Spiritual'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/physical" element={<Physical />} />
            <Route path="/intellectual" element={<Intellectual />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/spiritual" element={<Spiritual />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
