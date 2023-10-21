import { Box, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { globalPadding } from '@/constants/globalSX'
import { SurvveyCreationContext } from '@/constants/contexts'
import { useContext, useEffect, useState } from 'react'

function DefineParameters () {
  const { surveyObj, setSurveyObj } = useContext(SurvveyCreationContext)
  const [hasTokenRewards, setHasTokenRewards] = useState(false)

  const setEndTimestamp = (endTimestamp: number) => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.endTimestamp = endTimestamp
      return newSurvey
    })
  }

  const setTokenAmount = (tokenAmount: number) => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.tokenRewardAmount = tokenAmount
      return newSurvey
    })
  }

  const onCheckNoEndTime = (event: any) => {
    if (surveyObj.endTimestamp === 0) { setEndTimestamp(Date.now()) } else { setEndTimestamp(0) }
  }

  const onCheckHasReward = (event: any) => {
    if (hasTokenRewards) {
      setTokenAmount(0)
      setHasTokenRewards(false)
    } else { setHasTokenRewards(true) }
  }

  return (
    <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', p: globalPadding }}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Define Parameters
      </Typography>
      {surveyObj.endTimestamp !== 0
        ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label='Set end of the poll' />
          </LocalizationProvider>)
        : null}
      <FormControlLabel control={<Checkbox onChange={onCheckNoEndTime} checked={surveyObj.endTimestamp === 0} />} label='This poll has no end time' />
      <FormControlLabel onChange={onCheckHasReward} checked={hasTokenRewards} control={<Checkbox />} label='Define tokens as reward (in ether)' />

      {hasTokenRewards
        ? (
          <TextField
          // onChange={handleInputChange}
          // onBlur={handleBlur}
            onChange={(event) => {
              setTokenAmount(Number(event.target.value))
            }}
            sx={{ width: 200 }}
            variant='outlined'
            value={surveyObj.tokenRewardAmount}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              inputMode: 'numeric',
              pattern: '[0-9]*',
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />)
        : null}

    </Paper>
  )
}

export default DefineParameters
