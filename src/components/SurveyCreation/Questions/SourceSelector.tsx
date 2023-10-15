import { searchGroupByDescription } from '@/utils/sismoApi'
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Stack, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import SourceFinder from './SourceFinder'
import { SismoGroupContext } from '@/constants/contexts'

function valuetext (value: number) {
  return `${value}°C`
}

function SourceSelector (props: any) {
  // const [selectedDataGroup, setselectedDataGroup] = useState<SismoGroup>()

  const { dataGroup, updateSelectedSource } = useContext(SismoGroupContext)

  return (
    <Stack spacing={2}>
      <Typography component='h2' variant='h6'>Select a Datasource</Typography>
      <Stack spacing={2}>

        {/* <FormControl fullWidth variant='outlined'>
          <InputLabel>From already known data source</InputLabel>
          <Select
            label='From already known data source'
          >
            <MenuItem value={1}>DataSrouce1</MenuItem>
            <MenuItem value={2}>DataSrouce2</MenuItem>
            <MenuItem value={3}>DataSrouce3</MenuItem>
          </Select>
        </FormControl> */}
        <SourceFinder />
      </Stack>
      <Typography>
        Selected Data Group : {dataGroup?.description}
      </Typography>
    </Stack>
  )
}

export default SourceSelector
