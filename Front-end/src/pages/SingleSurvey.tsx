import { ELoadingState } from '@/@types/enums/Loading'
import SurveyItem from '@/components/SurveyBrowse/SurveyItem'
import { defaultSurvey } from '@/mocks/SurveyMock'
import { clone } from '@/utils/ObjUtils'
import { fetchFileCID } from '@/utils/fetchIPFS'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router'

function SingleSurvey () {
  const [loadingState, setLoadingState] = useState<ELoadingState>(ELoadingState.notLoaded)
  const [survey, setSurvey] = useState<Survey | undefined>(undefined)
  const [fetchCount, setFetchCount] = useState(0)
  const { cid } = useParams<{cid: string}>()

  const processCID = () => {
    if (!cid) return
    setLoadingState(ELoadingState.loading)
    setFetchCount(fetchCount + 1)
    fetchFileCID(cid)
      .then((surveyData: Survey) => {
        surveyData.cid = cid
        setSurvey(surveyData)
        setLoadingState(ELoadingState.loaded)
      })
      .catch((error: any) => {
        console.error(error)
        setLoadingState(ELoadingState.notLoaded)
      })
  }

  if (loadingState === ELoadingState.notLoaded && fetchCount < 10) {
    setLoadingState(ELoadingState.loading)
    processCID()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 750,
        margin: 'auto',
        alignItems: 'stretch',
        mb: 8,
      }}
    >
      {/* <Typography variant='h2'>Single Survey</Typography> */}
      {survey ? <SurveyItem survey={survey} /> : null}

    </Box>
  )
}

export default SingleSurvey
