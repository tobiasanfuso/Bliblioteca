import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeContextProvider from './services/themeContext/ThemeContextProvider.jsx'
import AuthContextProvider from './services/authContext/AuthContextProvider.jsx'
import TranslateContextProvider from './services/translateContext/TranslateContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslateContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </TranslateContextProvider>
  </StrictMode>,
)
