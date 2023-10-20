import { defaultZkSource1 } from '@/mocks/SurveyMock'
import { clone } from '@/utils/ObjUtils'
import { Box, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function ZkConditionRequired (props: any) {
  const sismoGroup: SismoGroup = props.sismoGroup
  const minimumCondition: number = props.minimumCondition

  return (
    <Box>
      <Stack justifyContent='space-between' alignItems='center' direction='row' spacing={2}>
        <Typography variant='h6' textAlign='left' whiteSpace='nowrap'>
          {sismoGroup?.name} {minimumCondition ? ` > ${minimumCondition}` : ''}
        </Typography>
        <Typography variant='subtitle2' textAlign='left' noWrap>
          <Link underline='hover' component={RouterLink} to={`https://factory.sismo.io/groups-explorer?search=${sismoGroup?.id}`}>
            {sismoGroup?.id}
          </Link>
        </Typography>
      </Stack>
      <Typography variant='subtitle1' textAlign='left'>
        {sismoGroup?.description}
      </Typography>
    </Box>
  )
}

export default ZkConditionRequired
