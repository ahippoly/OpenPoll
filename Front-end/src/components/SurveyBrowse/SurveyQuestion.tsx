import { EAnswerType } from '@/@types/enums/Questions'
import { Box, FormControlLabel, Radio, RadioGroup, Slider, Stack, TextField, Tooltip, Typography } from '@mui/material'
import ZkConditionRequired from './ZkConditionRequired'
import HelpIcon from '@mui/icons-material/Help'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function SurveyQuestionMultipleAnswer (props: any) {
  const question: Question = props.question

  return (
    <Box>
      <RadioGroup>
        {question.possibleAnswers?.map((possibleAnswer, index) => (
          <FormControlLabel label={possibleAnswer} control={<Radio />} value={possibleAnswer} key={index} />
        ))}
      </RadioGroup>
    </Box>
  )
}

function SurveyQuestionNumberAnswer (props: any) {
  const question: Question = props.question

  const rangeAnswer = question.rangeAnswer || [0, 10]

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
        <Slider min={rangeAnswer[0]} max={rangeAnswer[1]} marks={marks} valueLabelDisplay='auto' />
        <TextField
          // onChange={handleInputChange}
          // onBlur={handleBlur}
        //   onChange={(event) => {
        //     updateMinimumCondition(Number(event.target.value))
        //   }}
          sx={{ width: 200 }}
          variant='outlined'
        //   value={zkSource.minimumCondition}
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

const displayByAnswerType = (question: Question) => {
  switch (question.answerType) {
    case EAnswerType.multipleAnswer:
      return (<SurveyQuestionMultipleAnswer question={question} />)
    case EAnswerType.number:
      return (<SurveyQuestionNumberAnswer question={question} />)
    case EAnswerType.fromZkProof:
      return (<SurveyQuestionZkAnswer question={question} />)
    default:
      return <p>default</p>
  }
}

function SurveyQuestion (props: any) {
  const question: Question = props.question

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }} textAlign='left'>
        {question.title}
      </Typography>
      {displayByAnswerType(question)}

    </Box>
  )
}

export default SurveyQuestion
