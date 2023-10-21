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

        <SubmitAnswers survey={survey} />

      </Box>

    </Paper>
  )
}

export default SurveyItem
