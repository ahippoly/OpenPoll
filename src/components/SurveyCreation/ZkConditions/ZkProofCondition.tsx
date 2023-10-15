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

  return (
    <>
      <SismoGroupContext.Provider value={{ dataGroup: zkSource.dataGroup, updateSelectedSource: onUpdateSelectedSource }}>
        <SourceSelector />
        <Typography>
          Choose minimum condition
        </Typography>
        <Stack direction='row' spacing={2}>
          <Slider />
          <TextField
          // value={value}
          // onChange={handleInputChange}
          // onBlur={handleBlur}
            sx={{ width: 200 }}
            variant='outlined'
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
