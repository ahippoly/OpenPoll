import { EAnswerType } from '@/@types/enums/Questions'
import { Box, FormControlLabel, Radio, RadioGroup, Slider, Stack, TextField, Tooltip, Typography } from '@mui/material'
import ZkConditionRequired from './ZkConditionRequired'
import HelpIcon from '@mui/icons-material/Help'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useContext, useEffect, useState } from 'react'
import { AnswerContext } from '@/constants/contexts'

function SurveyQuestionMultipleAnswer (props: any) {
  const question: Question = props.question
  const value = props.value === undefined ? -1 : props.value
  const setValue = props.setValue

  return (
    <Box>
      <RadioGroup
        value={value}
        onChange={(event) => { setValue(Number(event.target.value)) }}
      >
        {question.possibleAnswers?.map((possibleAnswer, index) => (
          <FormControlLabel label={possibleAnswer} control={<Radio />} value={index} key={index} />
        ))}
      </RadioGroup>
    </Box>
  )
}

function SurveyQuestionNumberAnswer (props: any) {
  const question: Question = props.question
  const rangeAnswer = question.rangeAnswer || [0, 10]

  const value = props.value
  console.log('🚀 ~ file: SurveyQuestion.tsx:33 ~ SurveyQuestionNumberAnswer ~ value:', value)
  const setValue = props.setValue

  const marks = [
    {
      value: rangeAnswer[0],
      label: rangeAnswer[0],
    },
    {
      value: rangeAnswer[1],
      label: rangeAnswer[1],
    },
  ]

  return (
    <Box>
      <Stack direction='row' spacing={2}>
        <Slider onChange={(event, newValue) => { setValue(newValue) }} value={value} min={rangeAnswer[0]} max={rangeAnswer[1]} marks={marks} valueLabelDisplay='auto' />
        <TextField
          // onChange={handleInputChange}
          // onBlur={handleBlur}
          onChange={(event) => {
            setValue(Number(event.target.value))
          }}
          sx={{ width: 200 }}
          variant='outlined'
          value={value}
          inputProps={{
            step: 10,
            min: rangeAnswer[0],
            max: rangeAnswer[1],
            inputMode: 'numeric',
            pattern: '[0-9]*',
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Stack>
    </Box>
  )
}

function SurveyQuestionZkAnswer (props: any) {
  const question: Question = props.question

  return (
    <Box>
      <Typography variant='subtitle2' textAlign='left'>
        ZkProof answer
        <Tooltip color='primary' title='For this question, your answer will be the ZkProof value from the dataGroup'>
          <HelpIcon />
        </Tooltip> :
      </Typography>
      <ZkConditionRequired sismoGroup={question.zkAnswer} />

    </Box>
  )
}

const displayByAnswerType = (question: Question, value: any, setValue: Function) => {
  switch (question.answerType) {
    case EAnswerType.multipleAnswer:
      return (<SurveyQuestionMultipleAnswer value={value} setValue={setValue} question={question} />)
    case EAnswerType.number:
      return (<SurveyQuestionNumberAnswer value={value} setValue={setValue} question={question} />)
    case EAnswerType.fromZkProof:
      return (<SurveyQuestionZkAnswer question={question} />)
    default:
      return <p>default</p>
  }
}

function SurveyQuestion (props: any) {
  const question: Question = props.question
  const handleSetAnswers = props.handleSetAnswers
  const answers = props.answers
  const index = props.index
  const value = answers[index]

  const setValueState = (newValue: any) => {
    handleSetAnswers({
      ...answers,
      [index]: newValue,
    })
  }

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }} textAlign='left'>
        {question.title}
      </Typography>
      {displayByAnswerType(question, value, setValueState)}

    </Box>
  )
}

export default SurveyQuestion
