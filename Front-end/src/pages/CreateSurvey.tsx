import { Box, Button, Container, Fab, TextField, Typography } from '@mui/material'
import { Fragment } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Questions from '@/components/SurveyCreation/Questions/Questions'
import DefineZkProofs from '@/components/SurveyCreation/DefineZkProofs'
import DefineParameters from '@/components/SurveyCreation/DefineParameters'
import { uploadBackend } from '@/utils/uploadBackend'

function CreateSurvey () {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxWidth: 600,
      margin: 'auto',
      alignItems: 'stretch',
      mb: 8,
    }}
    >

      <Typography variant='h2'>
        Create new Poll
      </Typography>
      <TextField label='Poll name' variant='outlined' />

      <Questions />
      <DefineZkProofs />
      <DefineParameters />
      <Button onClick={() => uploadBackend({ name: 'super', content: 'test' })}>
        Submit
      </Button>
    </Box>

  )
}

export default CreateSurvey
