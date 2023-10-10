import { useState } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import './app.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { Button, Divider, Stack } from '@mui/material'

export function App () {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <ResponsiveAppBar />
      <h1>Open Survey</h1>
      <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
        <Button variant='contained'>Answer Survey</Button>
        <Button variant='contained'>Create Survey</Button>
        <Button variant='contained'>Show Stats</Button>
      </Stack>
    </div>
  )
}
