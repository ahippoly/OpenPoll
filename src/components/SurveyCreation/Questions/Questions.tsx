import Add from '@mui/icons-material/Add'
import { Fab, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Question from './Question'
import { globalPadding } from '@/constants/globalSX'

function Questions () {
  const [questions, setQuestions] = useState<Question[]>([{
    title: 'Oui',
    answerType: 'multipleAnswer',
    possibleAnswers: [{
      title: 'Nope',
    }],
    value: 0,
  }])

  const defaultQuestion: Question = {
    title: 'Oui',
    answerType: 'multipleAnswer',
    possibleAnswers: [{
      title: 'Nope',
    }],
    value: 0,
  }

  const addQuestion = () => {
    setQuestions((previousPrevious) => [...previousPrevious, defaultQuestion])
  }

  return (
    <Paper variant='outlined' sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Add Questions
      </Typography>

      <Stack spacing={2}>
        {questions.map((question, index) => (<Question question={question} key={index} />))}
      </Stack>

      <Fab color='primary' aria-label='add' variant='extended' onClick={addQuestion} sx={{ alignSelf: 'flex-end' }}>
        <Add sx={{ mr: 1 }} />
        Add
      </Fab>

    </Paper>
  )
}

export default Questions
