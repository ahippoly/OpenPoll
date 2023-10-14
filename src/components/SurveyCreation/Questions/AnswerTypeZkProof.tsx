import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import SourceSelector from './SourceSelector'

function valuetext (value: number) {
  return `${value}°C`
}

function AnswerTypeZkProof () {
  return (
    <SourceSelector />
  )
}

export default AnswerTypeZkProof
