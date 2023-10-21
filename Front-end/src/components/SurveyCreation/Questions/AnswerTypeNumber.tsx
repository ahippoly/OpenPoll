import { QuestionContext } from '@/constants/contexts'
import { Box, Slider } from '@mui/material'
import { useContext, useState } from 'react'

function valuetext (value: number) {
  return `${value}°C`
}

function AnswerTypeNumber () {
  const [value, setValue] = useState<number[]>([20, 37])
  const { question, onQuestionChange } = useContext(QuestionContext)

  const handleChange = (event: Event, newValue: number | number[]) => {
    onQuestionChange({
      ...question,
      rangeAnswer: newValue,
    })
  }

  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={question.rangeAnswer}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
      />
    </Box>
  )
}

export default AnswerTypeNumber
