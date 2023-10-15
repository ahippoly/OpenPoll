import { globalPadding } from '@/constants/globalSX'
import { Box, Paper } from '@mui/material'

function SurveyItem (props: any) {
  return (
    <Paper sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Box>
        <h3>Survey Title</h3>
        <p>Survey Description</p>
      </Box>

    </Paper>
  )
}

export default SurveyItem
