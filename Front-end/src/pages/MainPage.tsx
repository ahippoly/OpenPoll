import { Button, Divider, Stack } from '@mui/material'
import { Fragment } from 'react'

function MainPage () {
  return (
    <>
      <h1>Open Survey</h1>
      <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
        <Button variant='contained'>Answer Survey</Button>
        <Button variant='contained'>Create Survey</Button>
        <Button variant='contained'>Show Stats</Button>
      </Stack>
    </>

  )
}

export default MainPage
