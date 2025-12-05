import React, { useState, useEffect } from 'react'
import { convertCurrency, getCurrencies } from '../utils/api'
import '../styles/CurrencyPage.scss'

const CurrencyPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('RUB')
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [currencies] = useState<string[]>(getCurrencies())
  const [rate, setRate] = useState<number>(0)
  const [error, setError] = useState<string>('')

  const performConversion = async () => {
    const numAmount = parseFloat(amount)
    
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult('Введите корректную сумму')
      setError('')
      return
    }
    
    if (fromCurrency === toCurrency) {
      setResult(`${amount} ${fromCurrency} = ${amount} ${toCurrency}`)
      setRate(1)
      setError('')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const data = await convertCurrency(numAmount, fromCurrency, toCurrency)
      
      if (data && typeof data.result === 'number') {
        setResult(`${amount} ${fromCurrency} = ${data.result.toFixed(2)} ${toCurrency}`)
        setRate(data.info?.rate || 0)
      } else {
        setError('Некорректный ответ от сервера')
        setResult('')
      }
    } catch (err: any) {
      console.error('Conversion error:', err)
      setError(`Ошибка: ${err.message || 'Не удалось конвертировать валюту'}`)
      setResult('')
    } finally {
      setLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Разрешаем только числа и одну точку для десятичных
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Выполнить конвертацию при изменении параметров
  useEffect(() => {
    const timer = setTimeout(() => {
      if (amount && parseFloat(amount) > 0) {
        performConversion()
      } else if (amount === '') {
        setResult('')
        setError('')
      }
    }, 800) // Увеличил задержку для дебаунса
    
    return () => clearTimeout(timer)
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className="currency-page">
      <h1>💱 Конвертер валют</h1>
      
      <div className="converter">
        <div className="input-section">
          <div className="amount-input">
            <label htmlFor="amount">Сумма:</label>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Введите сумму"
              disabled={loading}
            />
          </div>
          
          <div className="currency-selection">
            <div className="currency-select">
              <label htmlFor="from">Из:</label>
              <select
                id="from"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                disabled={loading}
              >
                {currencies.map(currency => (
                  <option key={`from-${currency}`} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              className="swap-button"
              onClick={handleSwapCurrencies}
              disabled={loading}
              title="Поменять валюты местами"
            >
              ⇄
            </button>
            
            <div className="currency-select">
              <label htmlFor="to">В:</label>
              <select
                id="to"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                disabled={loading}
              >
                {currencies.map(currency => (
                  <option key={`to-${currency}`} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="result-section">
          {loading ? (
            <div className="loading">Конвертация...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : result ? (
            <>
              <div className="result">{result}</div>
              {rate > 0 && fromCurrency !== toCurrency && (
                <div className="rate-info">
                  1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                </div>
              )}
            </>
          ) : (
            <div className="placeholder">Введите сумму для конвертации</div>
          )}
        </div>
        
        <div className="converter-tips">
          <h3>📊 Популярные курсы:</h3>
          <ul>
            <li>USD → RUB: ~90-100 руб.</li>
            <li>EUR → RUB: ~95-105 руб.</li>
            <li>USD → EUR: ~0.9-1.0</li>
          </ul>
          <p className="note">
            *Курсы обновляются в реальном времени
          </p>
        </div>
      </div>
    </div>
  )
}

export default CurrencyPage