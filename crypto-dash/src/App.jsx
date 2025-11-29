import { useState, useEffect } from 'react'
import axios from 'axios'
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null) // Para o Modal

  const fetchCoins = async (pageNum) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${pageNum}&sparkline=true`
      )
      setCoins(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Erro na API", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoins(page)
  }, [page])

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dashboard-container">
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="logo">CryptoPro 🚀</div>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Pesquisar moeda..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      <main>
        <div className="market-header">
          <div>
            <h2>Mercado em Tempo Real</h2>
            <p>Página {page} - A mostrar top 20 por valor de mercado</p>
          </div>
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>⬅ Anterior</button>
            <button onClick={() => setPage(page + 1)}>Próxima ➡</button>
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loading">A carregar dados...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Moeda</th>
                  <th>Preço</th>
                  <th>24h %</th>
                  <th>Tendência (7d)</th>
                  <th>Mkt Cap</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin) => (
                  <tr key={coin.id} onClick={() => setSelectedCoin(coin)} className="clickable-row">
                    <td>#{coin.market_cap_rank}</td>
                    <td>
                      <div className="coin-cell">
                        <img src={coin.image} alt={coin.name} />
                        <div className="coin-name">
                          <span>{coin.name}</span>
                          <small>{coin.symbol.toUpperCase()}</small>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">${coin.current_price.toLocaleString()}</td>
                    <td className={coin.price_change_percentage_24h > 0 ? 'green-text' : 'red-text'}>
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                    <td className="chart-cell">
                      <div style={{ width: 100, height: 40 }}>
                         <MiniChart data={coin.sparkline_in_7d.price} color={coin.price_change_percentage_24h > 0 ? '#00ff88' : '#ff4d4d'} />
                      </div>
                    </td>
                    <td>${(coin.market_cap / 1000000).toFixed(0)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {selectedCoin && (
        <div className="modal-overlay" onClick={() => setSelectedCoin(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCoin(null)}>×</button>
            
            <div className="modal-header">
              <img src={selectedCoin.image} alt={selectedCoin.name} />
              <h2>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</h2>
            </div>

            <div className="modal-stats">
              <div className="stat-box">
                <span>Preço Atual</span>
                <h3>${selectedCoin.current_price.toLocaleString()}</h3>
              </div>
              <div className="stat-box">
                <span>Máxima 24h</span>
                <h3>${selectedCoin.high_24h.toLocaleString()}</h3>
              </div>
              <div className="stat-box">
                <span>Mínima 24h</span>
                <h3>${selectedCoin.low_24h.toLocaleString()}</h3>
              </div>
              <div className="stat-box">
                <span>Volume Total</span>
                <h3>${selectedCoin.total_volume.toLocaleString()}</h3>
              </div>
            </div>
            
            <div className="modal-chart">
               <p>Histórico de Preço (7 Dias)</p>
               <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    <AreaChart data={formatData(selectedCoin.sparkline_in_7d.price)}>
                      <Tooltip contentStyle={{background: '#333', border: 'none'}} />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="rgba(136, 132, 216, 0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

const MiniChart = ({ data, color }) => (
  <ResponsiveContainer>
    <AreaChart data={formatData(data)}>
      <Area type="monotone" dataKey="value" stroke={color} fillOpacity={0} strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
)

const formatData = (prices) => prices.map(price => ({ value: price }))

export default App