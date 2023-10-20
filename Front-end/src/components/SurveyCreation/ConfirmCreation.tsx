import { AuthType, ClaimRequest, SismoConnectButton, SismoConnectConfig, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
// import { sismoConfig } from '@/utils/Config'
import { uploadBackend } from '@/utils/uploadBackend'
import { Box, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { SismoButtonContext, SurvveyCreationContext } from '@/constants/contexts'
import LoadingButton from '@mui/lab/LoadingButton'

function ConfirmCreation () {
  const { surveyObj, setSurveyObj } = useContext(SurvveyCreationContext)
  const [isLoading, setIsLoading] = useState(false)

  // const claims: ClaimRequest[] = surveyObj.zkProofs.map((zkProof: ZkSource) => {
  //   return { groupdId: zkProof.dataGroup?.id, value }
  // }

  const submitSurvey = () => {
    if (isLoading) return
    setIsLoading(true)
    uploadBackend({ name: 'super', content: Math.random().toFixed(5) })
      .finally(() => setIsLoading(false))
  }

  return (
    <Box>

      <LoadingButton loading={isLoading} variant='outlined' onClick={submitSurvey}>
        Submit
      </LoadingButton>

    </Box>
  )
}

export default ConfirmCreation
