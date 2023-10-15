import { Avatar, Box, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, Fragment, SetStateAction, cloneElement, useContext, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Add from '@mui/icons-material/Add'
import { QuestionContext } from '@/constants/contexts'
function generate (element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    }),
  )
}

function AnswerTypeMultiple (props: any) {
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>(['', '', ''])
  // const setPossibleAnswers: Dispatch<SetStateAction<string[]>> = props.setPossibleAnswers
  // const possibleAnswers: string[] = props.possibleAnswers
  const seed = useRef(Math.random())
  const { question, onQuestionChange } = useContext(QuestionContext)

  const addAnswer = () => {
    console.log('🚀 ~ file: AnswerTypeMultipe.tsx:21 ~ AnswerTypeMultiple ~ question:', question)

    onQuestionChange({
      ...question,
      possibleAnswers: [...question.possibleAnswers, ''],
    })
  }

  const deleteAnswer = (index: number) => {
    onQuestionChange({
      ...question,
      possibleAnswers: question.possibleAnswers.filter((_: any, i: number) => i !== index),
    })
  }

  const onAnswerChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const newPossibleAnswers = [...question.possibleAnswers]
    newPossibleAnswers[index] = event.target.value
    onQuestionChange({
      ...question,
      possibleAnswers: newPossibleAnswers,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <List>
        {question.possibleAnswers.map((answer: string, index: number) => (
          <ListItem
            key={`${index}-Answer-${seed.current}}`}
            sx={{ display: 'flex', gap: 2 }}
            secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick={(event) => deleteAnswer(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <CheckBoxIcon />
              </Avatar>
            </ListItemAvatar>
            <TextField value={answer} onChange={(event: ChangeEvent<HTMLInputElement>) => onAnswerChange(event, index)} sx={{ flex: '1' }}>{answer}</TextField>
          </ListItem>
        ))}
      </List>
      {/* <TextField label='Add answer' variant='standard' /> */}
      <Fab color='primary' variant='extended' aria-label='add' sx={{ ml: 'auto' }} onClick={addAnswer}>
        <Add sx={{ mr: 1 }} />
        Add choice
      </Fab>
    </Box>

  )
}

export default AnswerTypeMultiple
