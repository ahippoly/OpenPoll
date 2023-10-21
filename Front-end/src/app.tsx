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

import { WagmiConfig, createConfig, sepolia } from 'wagmi'
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from 'connectkit'
import SingleSurvey from './pages/SingleSurvey'

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.VITE_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,

    // Required
    appName: 'OpenSurvey',
    chains: [sepolia],

    // Optional
    appDescription: 'OpenSurvey is a decentralized survey platform.',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

export function App () {
  const GlobalContext = createContext('global')

  return (
    <div className='App'>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <GlobalContext.Provider value='global'>
            <BrowserRouter>

              <ResponsiveAppBar />

              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/browse/*' element={<BrowseSurvey />} />
                <Route path='/create' element={<CreateSurvey />} />
                <Route path='/survey/:cid' element={<SingleSurvey />} />
              </Routes>
            </BrowserRouter>
            <CssBaseline />
            {/* {definePageRender()} */}
          </GlobalContext.Provider>
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  )
}
