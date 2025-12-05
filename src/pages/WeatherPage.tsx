import React, { useState, useEffect } from 'react'
import { fetchWeather } from '../utils/api'
import type { WeatherData } from '../types'
import '../styles/WeatherPage.scss'

const WeatherPage: React.FC = () => {
  const [city, setCity] = useState('Москва')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadWeather = async () => {
    if (!city.trim()) {
      setError('Введите название города')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchWeather(city)
      
      if (data.cod === 200) {
        setWeather(data)
      } else {
        setError('Город не найден. Попробуйте другой город.')
        setWeather(null)
      }
    } catch (err) {
      setError('Ошибка при получении данных о погоде. Проверьте подключение к интернету.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadWeather()
  }

  // Загрузить погоду при первом рендере
  useEffect(() => {
    loadWeather()
  }, [])

  return (
    <div className="weather-page">
      <h1>🌤️ Прогноз погоды</h1>
      
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите город..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Узнать погоду'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
      
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          
          <div className="weather-main">
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="description">
              {weather.weather[0].description}
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail">
              <span className="label">Ощущается как:</span>
              <span className="value">{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="detail">
              <span className="label">Влажность:</span>
              <span className="value">{weather.main.humidity}%</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="weather-tips">
        <h3>💡 Советы:</h3>
        <ul>
          <li>Попробуйте искать города на английском для лучших результатов</li>
          <li>Проверьте правильность написания города</li>
          <li>Для крупных городов укажите страну через запятую (например: "London, UK")</li>
        </ul>
      </div>
    </div>
  )
}

export default WeatherPage