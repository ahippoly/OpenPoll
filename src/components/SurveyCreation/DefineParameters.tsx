import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { globalPadding } from '@/constants/globalSX'

function DefineParameters () {
  return (
    <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', p: globalPadding }}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Define Parameters
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label='Set end of the poll' />
        <FormControlLabel control={<Checkbox />} label='Define tokens as reward' />
      </LocalizationProvider>
    </Paper>
  )
}

export default DefineParameters
