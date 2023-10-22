import { Card, CardContent, Fab, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { EAnswerType } from '@/enums/Questions'
import { createContext, useState } from 'react'
import AnswerTypeNumber from './AnswerTypeNumber'
import AnswerTypeZkProof from './AnswerTypeZkProof'
import AnswerTypeMultiple from './AnswerTypeMultipe'
import Delete from '@mui/icons-material/Delete'
import { QuestionContext, SismoGroupContext } from '@/constants/contexts'

function Question (props : any) {
  const question : Question = props.question
  const removeQuestion : () => void = props.onDelete
  const onQuestionChange : (newQuestion: Question) => void = props.onChange

  const onTitleChange = (event: any) => {
    onQuestionChange({
      ...question,
      title: event.target.value,
    })
  }

  const onAnsWerTypeChange = (event: any) => {
    onQuestionChange({
      ...question,
      answerType: event.target.value,
    })
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} direction='column' alignItems='stretch'>
          <TextField label='Question text' value={question.title} onChange={onTitleChange} />
          <FormControl fullWidth variant='outlined'>
            <InputLabel>Answer type</InputLabel>
            <Select
              label='Answer type'
              defaultValue={EAnswerType.multipleAnswer}
              onChange={onAnsWerTypeChange}
              value={question.answerType}
            >
              <MenuItem value={EAnswerType.multipleAnswer}>Multiple choices</MenuItem>
              <MenuItem value={EAnswerType.number}>Number</MenuItem>
              <MenuItem value={EAnswerType.fromZkProof}>From ZkProof</MenuItem>
            </Select>
          </FormControl>
          <QuestionContext.Provider value={{ question, onQuestionChange }}>
            {question.answerType === EAnswerType.number ? <AnswerTypeNumber /> : null}
            {question.answerType === EAnswerType.fromZkProof ? <AnswerTypeZkProof /> : null}
            {question.answerType === EAnswerType.multipleAnswer ? <AnswerTypeMultiple /> : null}
          </QuestionContext.Provider>

          <Fab onClick={(event) => removeQuestion()} color='error' aria-label='add' variant='extended' sx={{ alignSelf: 'flex-end' }}>
            <Delete sx={{ mr: 1 }} />
            Remove
          </Fab>
        </Stack>
        {/* <Stack>
          {question.possibleAnswers?.map((possibleAnswer, index) => <PossibleAnswer title={possibleAnswer.title} key={index} />)}
        </Stack> */}
      </CardContent>

    </Card>
  )
}

export default Question
