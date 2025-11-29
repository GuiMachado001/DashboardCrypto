# 🚀 CryptoPro - Dashboard de Criptomoedas em Tempo Real

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=d3.js&logoColor=white)

> Um dashboard financeiro interativo que consome dados reais do mercado de criptomoedas, focado em visualização de dados e performance.

## 📸 Preview

![Screenshot do Projeto](./crypto-dash/public/screenshot.png)

## 💡 Sobre o Projeto

Este projeto foi desenvolvido para simular uma interface profissional de exchange (como Binance ou CoinMarketCap). O objetivo principal foi consolidar conhecimentos em **Consumo de APIs**, **Gerenciamento de Estado Complexo** e **Visualização de Dados**.

Diferente de listas simples, este dashboard implementa paginação real via API e renderização condicional de modais para detalhamento de dados (Drill-down).

## ✨ Funcionalidades

- **📡 Dados em Tempo Real:** Consumo da API pública da CoinGecko.
- **📊 Visualização de Dados:** Gráficos de área (Sparklines) mostrando a tendência dos últimos 7 dias usando `Recharts`.
- **🔎 Filtro Inteligente:** Pesquisa instantânea por nome ou símbolo da moeda.
- **📄 Paginação Server-Side:** Navegação entre páginas carregando novos dados da API sob demanda.
- **📱 Modal Interativo:** Clique em qualquer linha para abrir um card flutuante com detalhes avançados (Máxima/Mínima 24h, Volume, Gráfico expandido).
- **🎨 Dark Mode UI:** Interface moderna e responsiva focada na legibilidade.

## 🛠️ Tecnologias Utilizadas

- **React.js (Vite):** Para construção da interface e performance.
- **Axios:** Para requisições HTTP assíncronas e tratamento de erros.
- **Recharts:** Biblioteca para composição dos gráficos financeiros.
- **CSS Modules/Standard:** Estilização responsiva e customizada (sem frameworks CSS pesados).

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU-USUARIO/crypto-dashboard.git](https://github.com/SEU-USUARIO/crypto-dashboard.git)
