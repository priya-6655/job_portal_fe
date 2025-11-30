import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import FilePath from './Components/root/FilePath.jsx'
import AuthProvider from './Components/Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FilePath />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
