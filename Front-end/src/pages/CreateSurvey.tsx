import { Box, Button, Container, Fab, TextField, Typography } from '@mui/material'
import { Fragment, useReducer, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Questions from '@/components/SurveyCreation/Questions/Questions'
import DefineZkProofs from '@/components/SurveyCreation/ZkConditions/DefineZkProofs'
import DefineParameters from '@/components/SurveyCreation/DefineParameters'
import { uploadBackend } from '@/utils/uploadBackend'
import ConfirmCreation from '@/components/SurveyCreation/ConfirmCreation'
import { SismoButtonContext, SurvveyCreationContext } from '@/constants/contexts'
import { clone } from '@/utils/ObjUtils'
import { defaultQuestion1, defaultZkSource0, defaultZkSource1 } from '@/mocks/SurveyMock'

function CreateSurvey () {
  const [surveyObj, setSurveyObj] = useState<Survey>({
    title: '',
    zkProofs: [
      clone(defaultZkSource0),
    ],
    endTimestamp: 0,
    tokenRewardAmount: 0,
    questions: [
      clone(defaultQuestion1),
    ],
  })

  const updateTitle = (title: string) => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.title = title
      return newSurvey
    })
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxWidth: 750,
      margin: 'auto',
      alignItems: 'stretch',
      mb: 8,
    }}
    >
      <SurvveyCreationContext.Provider value={{ surveyObj, setSurveyObj }}>
        <Typography variant='h2'>
          Create new Survey
        </Typography>
        <TextField onChange={(event) => updateTitle(event.target.value)} label='Survey name' variant='outlined' />

        <Questions />
        <DefineZkProofs />
        <DefineParameters />
        <ConfirmCreation />
      </SurvveyCreationContext.Provider>
    </Box>

  )
}

export default CreateSurvey
