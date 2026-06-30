import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Companies from './pages/Companies'
import People from './pages/PeoplePage'
import Outreach from './pages/Outreach'
import Applications from './pages/Applications'
import Settings from './pages/Settings'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"            element={<Dashboard />} />
          <Route path="/companies"   element={<Companies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/people"      element={<People />} />
          <Route path="/outreach"    element={<Outreach />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/settings"    element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App