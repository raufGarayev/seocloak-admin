import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AntThemeDesign from './components/layout/antThemeDesign.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import './styles/index.sass'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AntThemeDesign>
          <App />
        </AntThemeDesign>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
