import { useState, useEffect } from 'react'
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)

  // Função para buscar os dados
  const fetchCoins = async () => {
    try {
      // Usamos AXIOS para buscar dados.
      // sparkline=true é o segredo: ele traz os dados para o gráfico!
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
      )
      setCoins(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
      alert("Erro na API da CoinGecko (Tente esperar 1 minuto)")
    }
  }

  // useEffect com array vazio [] significa: "Rode isso apenas quando a tela carregar"
  useEffect(() => {
    fetchCoins()
  }, [])

  if (loading) return <div className="loading">Carregando Criptos... 🪙</div>

  return (
    <div className="container">
      <header>
        <h1>Crypto Dashboard 📈</h1>
        <p>Top 10 Moedas em Tempo Real</p>
      </header>

      <div className="grid">
        {coins.map((coin) => (
          <div key={coin.id} className="card">
            <div className="card-header">
              <img src={coin.image} alt={coin.name} className="coin-logo" />
              <div>
                <h2>{coin.name}</h2>
                <span className="symbol">{coin.symbol.toUpperCase()}</span>
              </div>
            </div>

            <div className="price-info">
              <h3>$ {coin.current_price.toLocaleString()}</h3>
              <span className={coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>

            {/* AQUI ESTÁ O GRÁFICO (RECHARTS) */}
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={formatData(coin.sparkline_in_7d.price)}>
                  {/* Removemos eixos e grids para ficar minimalista (Sparkline) */}
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={coin.price_change_percentage_24h > 0 ? '#00ff88' : '#ff4d4d'} 
                    fill={coin.price_change_percentage_24h > 0 ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 77, 77, 0.1)'} 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Função auxiliar para transformar array de numeros [10, 20] em objetos [{value: 10}, {value: 20}]
// O Recharts PRECISA disso.
const formatData = (prices) => {
  return prices.map(price => ({ value: price }))
}

export default App