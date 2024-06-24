import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { AuthProvider } from './context/AuthProvider.jsx'
import { LoadingProvider } from './context/LoadingProvider.jsx'
import { AlertProvider } from './context/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AlertProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
