import { EAnswerType } from '@/@types/enums/Questions'
import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { LineChart } from '@mui/x-charts/LineChart'

const buildDataArrayFromAnswers = (answers: Answers) => {
  const dataArray: any = []
  let index = 0
  if (!answers) return dataArray
  Object.entries(answers.totalByEntry).forEach(([key, value]) => {
    dataArray[index] = {
      id: index,
      value,
      label: key,
    }
    index++
  })
  return dataArray
}

const buildLineDataObj = (answers: Answers) => {
  const dataObj: any = {
    xAxis: [],
    series: [],
  }
  let index = 0
  if (!answers) return dataObj
  Object.entries(answers.totalByEntry).forEach(([key, value]) => {
    dataObj.xAxis[index] = key
    dataObj.series[index] = value
    index++
  })
  return dataObj
}

function CircleChart (props: any) {
  const answers : Answers = props.answers

  const dataArray = buildDataArrayFromAnswers(answers)
  if (dataArray.length === 0) return noDataYet()
  console.log('🚀 ~ file: AnswerData.tsx:22 ~ AnswerData ~ dataArray:', dataArray)

  return (
    <PieChart
      sx={{ margin: 'auto' }}
      series={[{
        data: dataArray,
      }]}
      width={400}
      height={400}
    />

  )
}

function ChartLinesType (props: any) {
  const answers : Answers = props.answers

  const lineDataObj = buildLineDataObj(answers)
  if (lineDataObj.series.length === 0) return noDataYet()

  return (
    <LineChart
      xAxis={[{ data: lineDataObj.xAxis }]}
      series={[
        {
          data: lineDataObj.series,
        },
      ]}
      height={300}
    />
  )
}

function noDataYet () {
  return (
    <Box>
      <Typography>
        No data yet
      </Typography>
    </Box>
  )
}

function AnswerData (props: any) {
  const answers : Answers = props.answers

  return (
    <Box>

      <Typography variant='h5' sx={{ mb: 2 }} textAlign='left'>
        {answers.questionTitle}
      </Typography>
      {(() => {
        if (!answers) return noDataYet()
        if (answers.answerType === EAnswerType.multipleAnswer) {
          return <CircleChart answers={answers} />
        } else {
          return <ChartLinesType answers={answers} />
        }
      })()}
    </Box>
  )
}

export default AnswerData
