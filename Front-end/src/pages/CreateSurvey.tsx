import { Box, Container, Fab, TextField, Typography } from '@mui/material'
import { Fragment } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Questions from '@/components/SurveyCreation/Questions/Questions'
import DefineZkProofs from '@/components/SurveyCreation/DefineZkProofs'
import DefineParameters from '@/components/SurveyCreation/DefineParameters'

function CreateSurvey () {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxWidth: 600,
      margin: 'auto',
      alignItems: 'stretch',
    }}
    >

      <Typography variant='h2'>
        Create new Poll
      </Typography>
      <TextField label='Poll name' variant='outlined' />

      <Questions />
      <DefineZkProofs />
      <DefineParameters />
    </Box>

  )
}

export default CreateSurvey
