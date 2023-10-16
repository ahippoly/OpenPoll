import { globalPadding } from '@/constants/globalSX'
import Add from '@mui/icons-material/Add'
import { Box, Fab, Paper, Stack, Typography } from '@mui/material'
import ZkProofCondition from './ZkProofCondition'
import { useState, useContext, useEffect } from 'react'
import { SismoButtonContext, SurvveyCreationContext } from '@/constants/contexts'

function DefineZkProofs () {
  const { surveyObj, setSurveyObj } = useContext(SurvveyCreationContext)

  const addZkSource = () => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.zkProofs = [...previous.zkProofs, { minimumCondition: 0 }]
      return newSurvey
    })
  }

  const updateZkSource = (index: number, newZkSource: ZkSource) => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.zkProofs[index] = newZkSource
      return newSurvey
    })
  }

  const removeZkSource = (index: number) => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.zkProofs.splice(index, 1)
      return newSurvey
    })
  }

  return (
    <Paper variant='outlined' sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>

      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Ask For ZkProofs
      </Typography>

      <Stack spacing={2}>
        {(surveyObj.zkProofs as ZkSource[]).map((zkSource, index) =>
          (
            <ZkProofCondition
              key={index}
              zkSource={zkSource}
              updateZkSource={(newZkSource: ZkSource) => updateZkSource(index, newZkSource)}
              removeZkSource={() => removeZkSource(index)}
            />))}
      </Stack>

      <Fab sx={{ alignSelf: 'flex-end' }} color='primary' aria-label='add' variant='extended' onClick={addZkSource}>
        <Add sx={{ mr: 1 }} />
        Add condition
      </Fab>
    </Paper>
  )
}

export default DefineZkProofs
