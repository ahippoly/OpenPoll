import { globalPadding } from '@/constants/globalSX'
import Add from '@mui/icons-material/Add'
import { Box, Fab, Paper, Typography } from '@mui/material'

function DefineZkProofs () {
  const addZkSource = () => {

  }

  return (
    <Paper variant='outlined' sx={{ p: globalPadding }}>

      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Ask For ZkProofs
      </Typography>

      <Fab color='primary' aria-label='add' variant='extended' onClick={addZkSource}>
        <Add sx={{ mr: 1 }} />
        Add
      </Fab>
    </Paper>
  )
}

export default DefineZkProofs
