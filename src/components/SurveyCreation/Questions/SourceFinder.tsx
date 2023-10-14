import { searchGroupByDescription } from '@/utils/sismoApi'
import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material'
import { Fragment, useState } from 'react'

function SourceFinder () {
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState()
  const [options, setOptions] = useState<SismoGroup[]>([])
  const [isDebounced, setIsDebounced] = useState(false)

  const updateOptions = async () => {
    const { groups, errors } = await searchGroupByDescription(inputValue)
    setOptions(groups)
  }

  const onInputChange = (newInputValue: string) => {
    setInputValue(newInputValue)

    if (isDebounced) { return }
    setIsDebounced(true)
    setTimeout(() => {
      updateOptions().finally(() => { setIsDebounced(false) })
    }, 100)
  }

  return (
    <>
      <Autocomplete
        options={options}
        filterSelectedOptions
        onInputChange={(event, newInputValue) => onInputChange(newInputValue)}
        filterOptions={(x) => x}
        noOptionsText='No groups'
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.description}
        inputValue={inputValue}
        // onChange={}
        renderInput={(params: any) => <TextField {...params} label='From datasource description' />}
        renderOption={(props: any, option: any) =>
          (
            <Box {...props}>
              <Stack>
                <Typography variant='h6'>
                  {option.name}
                </Typography>
                <Typography variant='body1'>
                  {option.description}
                </Typography>
              </Stack>
            </Box>)}
      />
      <Typography variant='body1'>
        {JSON.stringify(options, null, 2)}
      </Typography>
    </>
  )
}

export default SourceFinder
