import { searchGroupByDescription } from '@/utils/sismoApi'
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import SourceFinder from './SourceFinder'

function valuetext (value: number) {
  return `${value}°C`
}

function SourceSelector () {
  const [value, setValue] = useState<number[]>([20, 37])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <Box>
      <Typography component='h2' variant='h6'>Select a Datasource</Typography>
      <Stack spacing={2}>

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
        <SourceFinder />
      </Stack>

      <Button onClick={() => searchGroupByDescription('aave')}>
        Salut
      </Button>
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

export default SourceSelector
