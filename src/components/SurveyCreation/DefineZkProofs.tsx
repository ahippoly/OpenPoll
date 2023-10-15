import { globalPadding } from '@/constants/globalSX'
import Add from '@mui/icons-material/Add'
import { Box, Fab, Paper, Stack, Typography } from '@mui/material'
import ZkProofCondition from './ZkConditions/ZkProofCondition'
import { useState } from 'react'

function DefineZkProofs () {
  const [zkSources, setZkSources] = useState<ZkSource[]>([])

  const addZkSource = () => {
    setZkSources((previous) => [...previous, {
      minimumCondition: 10,
      dataGroup: undefined,
    }])
  }

  const updateZkSource = (index: number, newZkSource: ZkSource) => {
    setZkSources((previous) => {
      const newZkSources = [...previous]
      newZkSources[index] = newZkSource
      return newZkSources
    })
  }

  return (
    <Paper variant='outlined' sx={{ p: globalPadding }}>

      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Ask For ZkProofs
      </Typography>

      <p>{JSON.stringify(zkSources)}</p>

      <Stack spacing={2}>
        {zkSources.map((zkSource, index) =>
          (
            <ZkProofCondition
              key={index}
              zkSource={zkSource}
              updateZkSource={(newZkSource: ZkSource) => updateZkSource(index, newZkSource)}
            />))}
      </Stack>

      <Fab color='primary' aria-label='add' variant='extended' onClick={addZkSource}>
        <Add sx={{ mr: 1 }} />
        Add
      </Fab>
    </Paper>
  )
}

export default DefineZkProofs
