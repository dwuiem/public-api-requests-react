import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import WeatherPage from './pages/WeatherPage'
import CurrencyPage from './pages/CurrencyPage'
import DogsPage from './pages/DogsPage'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🌐 Мультистраничное приложение</h1>
          <p>Три полезных сервиса в одном месте</p>
        </header>
        
        <Navigation />
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<WeatherPage />} />
            <Route path="/weather" element={<Navigate to="/" replace />} />
            <Route path="/currency" element={<CurrencyPage />} />
            <Route path="/dogs" element={<DogsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© 2024 Мультистраничное приложение. Все API используются в образовательных целях.</p>
          <p className="disclaimer">
            Для доступа к API собак может потребоваться VPN на территории России.
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App