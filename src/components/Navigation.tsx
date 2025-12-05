import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Navigation.scss'

const Navigation: React.FC = () => {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }
  
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
          >
            🌤️ Погода
          </Link>
        </li>
        <li>
          <Link 
            to="/currency" 
            className={isActive('/currency') ? 'active' : ''}
          >
            💱 Конвертер валют
          </Link>
        </li>
        <li>
          <Link 
            to="/dogs" 
            className={isActive('/dogs') ? 'active' : ''}
          >
            🐶 Собаки
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
