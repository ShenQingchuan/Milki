import { StrictMode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './providers'
import { MainLayout } from './layouts/main-layout'

import './styles/tailwind.css'
import './styles/global.css'
import './i18n'
import { useTranslator } from './hooks'

function App() {
  const t = useTranslator()

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAME} - ${t('site-slogan')}`
  }, [])

  return (
    <MainLayout />
  )
}

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  )
