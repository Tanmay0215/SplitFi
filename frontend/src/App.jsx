import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import AddFriend from './pages/AddFriend'

const App = () => {
  return (
    <div className="min-h-screen text-gray-300 bg-[#051428]">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/add-friend" element={<AddFriend />} />
      </Routes>
    </div>
  )
}

export default App
