import Add from '@mui/icons-material/Add'
import { Fab, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Question from './Question'
import { globalPadding } from '@/constants/globalSX'

const defaultQuestion: Question = {
  title: '',
  answerType: 'multipleAnswer',
  possibleAnswers: ['', '', ''],
  rangeAnswer: [0, 10],
  zkAnswer: undefined,
}

function Questions () {
  const [seed, setSeed] = useState(Math.random())
  const [questions, setQuestions] = useState<Question[]>([JSON.parse(JSON.stringify(defaultQuestion))])

  const addQuestion = () => {
    setQuestions((previousPrevious) => [...previousPrevious, JSON.parse(JSON.stringify(defaultQuestion))])
  }

  const removeQuestion = (index: number) => {
    setQuestions((previous) => {
      const newQuestions = [...previous]
      newQuestions.splice(index, 1)
      return newQuestions
    })
  }

  const onQuestionChange = (index: number, newQuestion: Question) => {
    setQuestions((previous) => {
      const newQuestions = [...previous]
      newQuestions[index] = newQuestion
      return newQuestions
    })
  }

  return (
    <Paper variant='outlined' sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Add Questions
      </Typography>

      <Stack spacing={2}>
        {questions.map((question, index) =>
          (
            <Question
              question={question}
              key={`${index}-Question-${seed}`}
              onDelete={() => removeQuestion(index)}
              onChange={(question: Question) => onQuestionChange(index, question)}
            />))}
      </Stack>

      <Fab color='primary' aria-label='add' variant='extended' onClick={addQuestion} sx={{ alignSelf: 'flex-end' }}>
        <Add sx={{ mr: 1 }} />
        Add Question
      </Fab>

    </Paper>
  )
}

export default Questions
