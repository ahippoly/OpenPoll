import { AuthType, ClaimRequest, SismoConnectButton, SismoConnectConfig, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
// import { sismoConfig } from '@/utils/Config'
import { uploadBackend } from '@/utils/uploadBackend'
import { Box, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { SismoButtonContext, SurvveyCreationContext } from '@/constants/contexts'
import LoadingButton from '@mui/lab/LoadingButton'

const sismoConfig : SismoConnectConfig = {
  // you will need to get an appId from the Factory
  appId: '0xce36ae7bbc3221fdba8b40923b7efd32',
}

function ConfirmCreation () {
  const { surveyObj, setSurveyObj } = useContext(SurvveyCreationContext)
  const [isLoading, setIsLoading] = useState(false)

  // const claims: ClaimRequest[] = surveyObj.zkProofs.map((zkProof: ZkSource) => {
  //   return { groupdId: zkProof.dataGroup?.id, value }
  // }

  const submitSurvey = () => {
    if (isLoading) return
    setIsLoading(true)
    uploadBackend({ name: 'super', content: 'test' })
      .finally(() => setIsLoading(false))
  }

  return (
    <Box>

      {/* <SismoConnectButton
        config={sismoConfig}
    // request multiple proofs of account ownership
    // (here Vault ownership and Twitter account ownership)
        auths={[
          { authType: AuthType.VAULT },
        ]}
    // request multiple proofs of group membership
    // (here the groups with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a and 0x8b64c959a715c6b10aa8372100071ca7)
        claims={[]}
        text='Submit with Sismo'
        onResponse={async (response: SismoConnectResponse) => {
          // Send the response to your server to verify it
          // thanks to the @sismo-core/sismo-connect-server package
        }}
        onResponseBytes={async (bytes: string) => {
          // Send the response to your contract to verify it
          // thanks to the @sismo-core/sismo-connect-solidity package
        }}
      /> */}

      <LoadingButton loading={isLoading} variant='outlined' onClick={submitSurvey}>
        Submit
      </LoadingButton>

    </Box>
  )
}

export default ConfirmCreation
