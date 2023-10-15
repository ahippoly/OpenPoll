import { Paper, Typography } from '@mui/material'
import { useReducer } from 'react'
import SurveyItem from './SurveyItem'
import { globalPadding } from '@/constants/globalSX'

export const surveyListReducerFunc = (state: any, action: ReducerPayload) => {

}

// const defaultSurvey: Survey = {
//   title: '',
//   questions: [],
//   zkProofs: [],
// }

function SurveyList () {
  const [surveyList, dispatch] = useReducer<any>(surveyListReducerFunc, [{}])

  return (
    <Paper sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography variant='h6' color='primary'>Survey List</Typography>
      {(surveyList as Survey[])
        .map((survey, index: number) => (
          <SurveyItem key={index} survey={survey} />
        ))}
    </Paper>
  )
}

export default SurveyList
