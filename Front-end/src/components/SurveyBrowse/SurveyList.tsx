import { Box, Paper, Typography } from '@mui/material'
import { useReducer } from 'react'
import SurveyItem from './SurveyItem'
import { globalPadding } from '@/constants/globalSX'
import { EAnswerType } from '@/@types/enums/Questions'
import { defaultSurvey } from '@/mocks/SurveyMock'
import { stringifyObject } from '@/utils/ObjUtils'

export const surveyListReducerFunc = (state: any, action: ReducerPayload) => {

}

function SurveyList () {
  const [surveyList, dispatch] = useReducer<any>(surveyListReducerFunc, [JSON.parse(JSON.stringify(defaultSurvey))])

  return (
    <Box sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography variant='h6' color='primary'>Survey List</Typography>
      {(surveyList as Survey[])
        .map((survey, index: number) => (
          <Box key={index}>
            {/* <p> {stringifyObject(survey)} </p> */}
            <SurveyItem key={index} survey={survey} />
          </Box>
        ))}
    </Box>
  )
}

export default SurveyList
