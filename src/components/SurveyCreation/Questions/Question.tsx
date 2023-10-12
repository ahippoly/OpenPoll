import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import PossibleAnswer from './PossibleAnswer'
import { EAnswerType } from '@/@types/enums/Questions'
import { useState } from 'react'
import AnswerTypeNumber from './AnswerTypeNumber'
import AnswerTypeZkProof from './AnswerTypeZkProof'
import AnswerTypeMultiple from './AnswerTypeMultipe'

function Question (props : any) {
  const question : Question = props.question
  const [answerType, setAnswerType] = useState<EAnswerType>(EAnswerType.multipleAnswer)

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField label='Question text' value={question.title} />
          <FormControl fullWidth variant='outlined'>
            <InputLabel>Answer type</InputLabel>
            <Select
              label='Answer type'
              defaultValue={EAnswerType.multipleAnswer}
              onChange={(event) => { setAnswerType(event.target.value as EAnswerType) }}
              value={answerType}
            >
              <MenuItem value={EAnswerType.multipleAnswer}>Multiple choices</MenuItem>
              <MenuItem value={EAnswerType.number}>Number</MenuItem>
              <MenuItem value={EAnswerType.fromZkProof}>From ZkProof</MenuItem>
            </Select>
          </FormControl>
          {answerType === EAnswerType.number ? <AnswerTypeNumber /> : null}
          {answerType === EAnswerType.fromZkProof ? <AnswerTypeZkProof /> : null}
          {answerType === EAnswerType.multipleAnswer ? <AnswerTypeMultiple /> : null}

        </Stack>
        {/* <Stack>
          {question.possibleAnswers?.map((possibleAnswer, index) => <PossibleAnswer title={possibleAnswer.title} key={index} />)}
        </Stack> */}
      </CardContent>

    </Card>
  )
}

export default Question
