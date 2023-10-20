import SurveyList from '@/components/SurveyBrowse/SurveyList'
import { Box, Typography } from '@mui/material'

function BrowseSurvey () {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxWidth: 750,
      margin: 'auto',
      alignItems: 'stretch',
    }}
    >
      <Typography variant='h2'>Browse Survey</Typography>
      <SurveyList />
    </Box>
  )
}

export default BrowseSurvey
