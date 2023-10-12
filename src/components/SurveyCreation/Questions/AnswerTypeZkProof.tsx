import { Box, Slider } from '@mui/material'
import { useState } from 'react'

function valuetext (value: number) {
  return `${value}°C`
}

function AnswerTypeZkProof () {
  const [value, setValue] = useState<number[]>([20, 37])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
      />
    </Box>
  )
}

export default AnswerTypeZkProof
