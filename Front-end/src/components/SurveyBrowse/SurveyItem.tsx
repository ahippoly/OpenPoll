import { globalPadding } from '@/constants/globalSX'
import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import ZkConditionRequired from './ZkConditionRequired'
import SurveyQuestion from './SurveyQuestion'
import { AuthType, SismoConnectButton, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
import { sismoConfig } from '@/utils/Config'
import SubmitAnswers from './SubmitAnswers'

function SurveyItem (props: any) {
  const survey: Survey = props.survey

  return (
    <Paper sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Box>
        <Typography variant='h5' sx={{ mb: 2 }}>
          {survey.title}
        </Typography>

        <Box>
          <Typography variant='h6'>
            Sismo ZkProofs conditions for this survey :
          </Typography>
          <Paper variant='outlined' sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
              {survey.zkProofs.map((zkProof, index) => (<ZkConditionRequired key={index} sismoGroup={zkProof.dataGroup} minimumCondition={zkProof.minimumCondition} />))}
            </Stack>
          </Paper>
        </Box>

        <Stack spacing={2} divider={<Divider variant='middle' orientation='horizontal' flexItem />}>
          {survey.questions.map((question, index) => (
            <SurveyQuestion key={index} question={question} />
          ))}

        </Stack>

        <SismoConnectButton
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
            console.log('🚀 ~ file: SurveyItem.tsx:49 ~ onResponse={ ~ response:', response)
            // Send the response to your server to verify it
            // thanks to the @sismo-core/sismo-connect-server package
          }}
          onResponseBytes={async (bytes: string) => {
            console.log('🚀 ~ file: SurveyItem.tsx:144 ~ bytes', bytes)
            // Send the response to your contract to verify it
            // thanks to the @sismo-core/sismo-connect-solidity package
          }}
        />

        <SubmitAnswers />

      </Box>

    </Paper>
  )
}

export default SurveyItem
