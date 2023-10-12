import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material'
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
      <Typography component='h2' variant='h6'>Select a Datasource</Typography>
      <TextField variant='outlined' label='From data source Id' />
      <FormControl fullWidth variant='outlined'>
        <InputLabel>From already known data source</InputLabel>
        <Select
          label='From already known data source'
        >
          <MenuItem value={1}>DataSrouce1</MenuItem>
          <MenuItem value={2}>DataSrouce2</MenuItem>
          <MenuItem value={3}>DataSrouce3</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        options={['Source1', 'Source2', 'Source3']}
        sx={{ width: 300 }}
        renderInput={(params: any) => <TextField {...params} label='From datasource description' />}
      />
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
