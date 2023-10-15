import { createContext, useState } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './app.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Button, CssBaseline, Divider, Stack } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import CreateSurvey from './pages/CreateSurvey'
import BrowseSurvey from './pages/BrowseSurvey'

export function App () {
  const [count, setCount] = useState(0)
  const [pageIndex, setPageIndex] = useState(1)
  const GlobalContext = createContext('global')

  function definePageRender () {
    switch (pageIndex) {
      case 1 :
        return <CreateSurvey />
      case 2 :
        return <BrowseSurvey />
      default:
        return <MainPage />
    }
  }

  return (
    <div className='App'>
      <GlobalContext.Provider value='global'>
        <CssBaseline />
        <ResponsiveAppBar />
        {definePageRender()}
      </GlobalContext.Provider>
    </div>
  )
}
