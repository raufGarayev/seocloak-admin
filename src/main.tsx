import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.sass'
import { BrowserRouter } from 'react-router-dom'
import AntThemeDesign from './components/layout/antThemeDesign.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AntThemeDesign>
        <App />
      </AntThemeDesign>
    </BrowserRouter>
  </React.StrictMode>
)
