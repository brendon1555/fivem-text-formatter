import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './contexts/ThemeContext'
import { TourProvider } from './contexts/TourContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TourProvider>
        <App />
      </TourProvider>
    </ThemeProvider>
  </React.StrictMode>,
)