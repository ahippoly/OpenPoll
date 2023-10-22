import { EAnswerType } from '@/enums/Questions'
import { Box, Typography } from '@mui/material'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import { LineChart } from '@mui/x-charts/LineChart'
import { DefaultizedPieValueType } from '@mui/x-charts/models/seriesType'

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

  const TOTAL = dataArray.map((item: any) => item.value).reduce((a: any, b: any) => a + b, 0)

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL
    return `${(percent * 100).toFixed(0)}%`
  }
  console.log('🚀 ~ file: AnswerData.tsx:22 ~ AnswerData ~ dataArray:', dataArray)

  return (
  // <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <PieChart
      series={[{
        data: dataArray,
        arcLabel: getArcLabel,
      }]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      // width={600}
      height={250}
    />
  // </Box>
  )
}

function ChartLinesType (props: any) {
  const answers : Answers = props.answers

  const lineDataObj = buildLineDataObj(answers)
  console.log('🚀 ~ file: AnswerData.tsx:75 ~ ChartLinesType ~ lineDataObj:', lineDataObj)
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
