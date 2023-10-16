import { SismoGroupContext } from '@/constants/contexts'
import { filterDuplicatesArrayObjectByProperty } from '@/utils/ArrayUtils'
import { searchGroupByDescription, searchGroupBySpecs } from '@/utils/sismoApi'
import { Autocomplete, Box, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material'
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'

function SourceFinder (props: any) {
  const [inputValue, setInputValue] = useState('')
  // const [value, setValue] = useState()
  const [options, setOptions] = useState<SismoGroup[]>([])
  const [isDebounced, setIsDebounced] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const currentTimeout = useRef<any | null>()

  const { dataGroup: value, updateSelectedSource } = useContext(SismoGroupContext)

  const isLoading = isDebounced || isFetching

  const updateOptions = useCallback(async () => {
    if (isFetching || !inputValue) return
    setIsFetching(true)
    const allRes = await Promise.all([searchGroupByDescription(inputValue), searchGroupBySpecs(inputValue)])
    setIsFetching(false)
    const groups = filterDuplicatesArrayObjectByProperty(allRes.map((res) => res.groups).flat(), 'id')
      .sort((a, b) => b.numberOfAccounts - a.numberOfAccounts)

    setOptions(groups)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  const onInputChange = (newInputValue: string) => {
    setInputValue(newInputValue)

    setIsDebounced(true)
    clearTimeout(currentTimeout.current)
    currentTimeout.current = setTimeout(() => {
      setIsDebounced(false)
    }, 300)
  }

  useEffect(() => {
    (() => {
      if (isDebounced) return
      updateOptions()
    })()
  }, [isDebounced, updateOptions])

  useEffect(() => {
    updateSelectedSource(value)
  }, [value, updateSelectedSource])

  return (
    <>
      <Autocomplete
        options={options}
        filterSelectedOptions
        includeInputInList
        onInputChange={(event, newInputValue) => onInputChange(newInputValue)}
        filterOptions={(x) => x}
        noOptionsText='No groups'
        value={value}
        loading={isLoading}
        onChange={(event, newValue) => {
          updateSelectedSource(newValue)
        }}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name}
        inputValue={inputValue}
        // onChange={}
        renderInput={(params: any) => <TextField
          {...params}
          label='From datasource description, specs or id'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
                                      />}
        renderOption={(props: any, option: any) =>
          (
            <Box {...props}>

              <Stack sx={{ width: '100%' }} alignItems='stretch'>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='stretch'
                >
                  <Typography variant='h6'>
                    {option.name}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {option.numberOfAccounts}
                  </Typography>
                </Stack>
                <Typography variant='body1'>
                  {option.description}
                </Typography>
              </Stack>
            </Box>

          )}
      />
      {/* <Typography variant='body1'>
        {JSON.stringify(options, null, 2)}
      </Typography> */}
    </>
  )
}

export default SourceFinder
