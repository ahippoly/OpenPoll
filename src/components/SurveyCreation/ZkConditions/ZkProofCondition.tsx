import { Input, Slide, Slider, Stack, TextField, Typography } from '@mui/material'
import SourceSelector from '../Questions/SourceSelector'
import { SismoGroupContext } from '@/constants/contexts'

function ZkProofCondition (props: any) {
  const zkSource: ZkSource = props.zkSource
  const updateZkSource: (newZkSource: ZkSource) => void = props.updateZkSource

  const onUpdateSelectedSource = (newSource: SismoGroup) => {
    updateZkSource({
      ...zkSource,
      dataGroup: newSource,
    })
  }

  const updateMinimumCondition = (newMinimumCondition: number) => {
    updateZkSource({
      ...zkSource,
      minimumCondition: newMinimumCondition,
    })
  }

  return (
    <>
      <SismoGroupContext.Provider value={{ dataGroup: zkSource.dataGroup, updateSelectedSource: onUpdateSelectedSource }}>
        <SourceSelector />
        <Typography component='h2' variant='h6'>Select a Datasource</Typography>
        <Stack direction='row' spacing={2}>
          <Slider
            value={zkSource.minimumCondition}
            onChange={(event, newValue) => {
              updateMinimumCondition(newValue as number)
            }}
          />
          <TextField
          // onChange={handleInputChange}
          // onBlur={handleBlur}
            onChange={(event) => {
              updateMinimumCondition(Number(event.target.value))
            }}
            sx={{ width: 200 }}
            variant='outlined'
            value={zkSource.minimumCondition}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              inputMode: 'numeric',
              pattern: '[0-9]*',
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Stack>

      </SismoGroupContext.Provider>
    </>
  )
}

export default ZkProofCondition
