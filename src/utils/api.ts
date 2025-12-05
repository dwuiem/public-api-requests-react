// Базовые URL API
const DOG_API_URL = 'https://dog.ceo/api'
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'

// Новый API для валют (FastForex)
const FASTFOREX_API_URL = 'https://api.fastforex.io/fetch-one'
const FASTFOREX_API_KEY = 'b38adc61e7-e6b98654fd-t6qwp2'

// API ключ для погоды
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || ''

// Список пород собак
const DOG_BREEDS = [
  'shiba',
  'retriever',
  'husky',
  'poodle',
  'beagle',
  'boxer',
  'bulldog',
  'chihuahua'
] as const

// ===========================
//  API собак
// ===========================

export const fetchDogImage = async (breed?: string): Promise<string> => {
  try {
    let url: string

    if (breed && DOG_BREEDS.includes(breed.toLowerCase() as typeof DOG_BREEDS[number])) {
      url = `${DOG_API_URL}/breed/${breed}/images/random`
    } else {
      url = `${DOG_API_URL}/breeds/image/random`
    }

    console.log('Fetching dog from:', url)

    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    })

    console.log('Dog API response status:', response.status)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Dog API data:', data)

    if (data.status !== 'success') {
      throw new Error('API returned error status')
    }

    return data.message
  } catch (error: any) {
    console.error('Error fetching dog image:', error)
    throw new Error(`Не удалось загрузить изображение: ${error.message || 'Неизвестная ошибка'}`)
  }
}

export const getRandomBreed = (): string => {
  return DOG_BREEDS[Math.floor(Math.random() * DOG_BREEDS.length)]
}

// ===========================
// API погоды
// ===========================

export const fetchWeather = async (city: string): Promise<any> => {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error(
        'Weather API key is not configured. Добавьте VITE_WEATHER_API_KEY в .env файл'
      )
    }

    const url = `${WEATHER_API_URL}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`

    console.log('Fetching weather from:', url)

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}

// ===========================
// 💱 API валют (FastForex.io)
// ===========================

export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
): Promise<any> => {
  try {
    const url = `${FASTFOREX_API_URL}?from=${from}&to=${to}`

    console.log('Fetching currency from:', url)

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-API-Key': FASTFOREX_API_KEY
      }
    })

    console.log('Currency API response status:', response.status)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Currency API data:', data)

    if (!data.result || !data.result[to]) {
      throw new Error('Неверный формат ответа API')
    }

    const rate = data.result[to]
    const converted = rate * amount

    return {
      rate,
      result: converted,
      from,
      to,
      amount
    }
  } catch (error: any) {
    console.error('Error converting currency:', error)
    throw new Error(`Ошибка конвертации: ${error.message || 'Неизвестная ошибка'}`)
  }
}

export const getCurrencies = () => {
  return ['USD', 'EUR', 'RUB', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD']
}
