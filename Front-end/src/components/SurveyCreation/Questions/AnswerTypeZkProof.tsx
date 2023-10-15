import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import SourceSelector from './SourceSelector'
import { QuestionContext, SismoGroupContext } from '@/constants/contexts'

function AnswerTypeZkProof () {
  const { question, onQuestionChange } = useContext(QuestionContext)

  const updateSelectedSource = (newSource: SismoGroup) => {
    onQuestionChange({
      ...question,
      zkAnswer: newSource,
    })
  }

  return (
    <SismoGroupContext.Provider value={{ dataGroup: question.zkAnswer, updateSelectedSource }}>
      <SourceSelector />
    </SismoGroupContext.Provider>
  )
}

export default AnswerTypeZkProof
