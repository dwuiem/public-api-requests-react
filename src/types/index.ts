export interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  name: string
}

export interface ExchangeRateData {
  result: number
  info: {
    rate: number
  }
}

export interface DogImageData {
  message: string
  status: string
}

export interface Currency {
  code: string
  name: string
}