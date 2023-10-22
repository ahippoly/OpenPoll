import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useReducer, useState } from 'react'
import SurveyItem from './SurveyItem'
import { globalPadding } from '@/constants/globalSX'
import { EAnswerType } from '@/@types/enums/Questions'
import { defaultSurvey } from '@/mocks/SurveyMock'
import { stringifyObject } from '@/utils/ObjUtils'
import { graphQueryUrl } from '@/config/globalConfig'
import { fetchSurveyList } from '@/utils/fetchTheGraph'
import { ELoadingState } from '@/@types/enums/Loading'
import { fetchFileCID } from '@/utils/fetchIPFS'

export const surveyListReducerFunc = (state: any, action: ReducerPayload) => {
  const surveyList = state as Survey[]

  switch (action.type) {
    case 'add':
      return [...surveyList, action.value]
    default:
      return state
  }
}

function SurveyList () {
  const [surveyList, dispatch] = useReducer(surveyListReducerFunc, [])
  const [loadingState, setLoadingState] = useState<ELoadingState>(ELoadingState.notLoaded)
  const [emittedSurveyList, setEmittedSurveyList] = useState<EmittedSurvey[]>([])

  if (loadingState === ELoadingState.notLoaded) {
    setLoadingState(ELoadingState.loading)
    fetchSurveyList()
      .then((emittedSurveyList: EmittedSurvey[]) => {
        setEmittedSurveyList(emittedSurveyList)
        setLoadingState(ELoadingState.loaded)
      })
      .catch((error: any) => {
        console.error(error)
        setLoadingState(ELoadingState.notLoaded)
      })
  }

  const processFilesCID = () => {
    if (!emittedSurveyList || emittedSurveyList.length === 0) return
    emittedSurveyList.forEach((emittedSurvey: EmittedSurvey) => {
      fetchFileCID(emittedSurvey.fileCID)
        .then((surveyData: Survey) => {
          surveyData.cid = emittedSurvey.fileCID
          dispatch({ type: 'add', value: surveyData })
        })
    })
  }

  useEffect(() => {
    processFilesCID()
  }, [emittedSurveyList])

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
