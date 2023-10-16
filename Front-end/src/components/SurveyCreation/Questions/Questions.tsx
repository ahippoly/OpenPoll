import Add from '@mui/icons-material/Add'
import { Fab, Paper, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Question from './Question'
import { globalPadding } from '@/constants/globalSX'
import { SismoButtonContext, SurvveyCreationContext } from '@/constants/contexts'

const defaultQuestion: Question = {
  title: '',
  answerType: 'multipleAnswer',
  possibleAnswers: ['', '', ''],
  rangeAnswer: [0, 10],
  zkAnswer: undefined,
}

function Questions () {
  const [seed, setSeed] = useState(Math.random())
  const { surveyObj, setSurveyObj } = useContext(SurvveyCreationContext)

  const addQuestion = () => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.questions = [...previous.questions, JSON.parse(JSON.stringify(defaultQuestion))]
      return newSurvey
    })
  }

  const removeQuestion = (index: number) => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.questions.splice(index, 1)
      console.log('🚀 ~ file: Questions.tsx:32 ~ setSurveyObj ~ newSurvey:', newSurvey)

      return newSurvey
    })
  }

  const onQuestionChange = (index: number, newQuestion: Question) => {
    setSurveyObj((previous: Survey) => {
      const newSurvey = { ...previous }
      newSurvey.questions[index] = newQuestion
      return newSurvey
    })
  }

  return (
    <Paper variant='outlined' sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Add Questions
      </Typography>

      <Stack spacing={2}>
        {(surveyObj.questions as Question[]).map((question, index) =>
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
