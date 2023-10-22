import { globalPadding } from '@/constants/globalSX'
import { Box, Divider, FormControlLabel, Paper, Stack, Switch, Typography } from '@mui/material'
import ZkConditionRequired from './ZkConditionRequired'
import SurveyQuestion from './SurveyQuestion'
import { AuthType, SismoConnectButton, SismoConnectResponse } from '@sismo-core/sismo-connect-react'
import { sismoConfig } from '@/utils/Config'
import SubmitAnswers from './SubmitAnswers'
import { AnswerContext, StatDisplayContext } from '@/constants/contexts'
import { useContext, useEffect, useRef, useState } from 'react'
import { EAnswerType } from '@/@types/enums/Questions'
import { fetchAnswers } from '@/utils/fetchTheGraph'
import AnswerData from './AnswerData'

const baseAnswerGenerator = (survey: Survey) => {
  let index = -1
  const obj: any = {}
  for (const question of survey.questions) {
    index++
    if (question.answerType === EAnswerType.fromZkProof) {
      continue
    }
    obj[index] = -1
  }

  return obj
}

const buildTotalByEntry = (index: number, fetchedAnswers: FetchedUserAnswer[], question: Question) => {
  const totalByEntry: any = {}

  fetchedAnswers.forEach((answer) => {
    const userAnswer = answer.answers[index]

    if (!totalByEntry[userAnswer]) {
      totalByEntry[userAnswer] = 0
    }
    totalByEntry[userAnswer]++
  })

  return totalByEntry
}

const buildTotalByEntryForMutiple = (index: number, fetchedAnswers: FetchedUserAnswer[], question: Question) => {
  const totalByEntry: any = {}
  if (question.answerType !== EAnswerType.multipleAnswer) return totalByEntry

  fetchedAnswers.forEach((answer) => {
    if (question.possibleAnswers === undefined) return totalByEntry

    const userAnswer: any = answer.answers[index]
    const answerTitle = question.possibleAnswers[userAnswer]

    if (!totalByEntry[answerTitle]) {
      totalByEntry[answerTitle] = 0
    }
    totalByEntry[answerTitle]++
  })

  return totalByEntry
}

const buildAnswersList = (survey: Survey, fetchedAnswers: FetchedUserAnswer[]) : Record<string, Answers> => {
  let classicIndex = 0
  let zkIndex = 0
  let index = 0

  const answers: Record<string, Answers> = {}

  for (const question of survey.questions) {
    if (question.answerType !== EAnswerType.fromZkProof) {
      let totalByEntry
      if (question.answerType === EAnswerType.multipleAnswer) { totalByEntry = buildTotalByEntryForMutiple(classicIndex, fetchedAnswers, question) } else { totalByEntry = buildTotalByEntry(classicIndex, fetchedAnswers, question) }

      answers[index] = {
        questionTitle: question.title,
        answerType: question.answerType,
        totalByEntry,
      }

      classicIndex++
    } else {
      answers[index] = {
        questionTitle: question.title,
        answerType: question.answerType,
        totalByEntry: buildTotalByEntry(zkIndex, fetchedAnswers, question),
      }
      zkIndex++
    }
    index++
  }

  return answers
}

const getAnswerFromLocalStorage = (survey: Survey) => {
  const cid = survey.cid
  if (!cid) return baseAnswerGenerator(survey)
  const answerStored = window.localStorage.getItem(`answer-${cid}`)
  if (!answerStored) return baseAnswerGenerator(survey)
  try {
    const answers = JSON.parse(answerStored)
    console.log('🚀 ~ file: SurveyItem.tsx:18 ~ getAnswerFromLocalStorage ~ answers:', answers)
    return answers
  } catch (e) {
    return baseAnswerGenerator(survey)
  }
}

function SurveyItem (props: any) {
  const survey: Survey = props.survey
  const [answers, setAnswers] = useState(baseAnswerGenerator(survey))
  const [userAnswers, setUserAnswers] = useState<Record<string, Answers>>({})
  const { displayStat } = useContext(StatDisplayContext)
  const [showStat, setShowStat] = useState(false)

  const handleSetAnswers = (newAnswers: any) => {
    localStorage.setItem(`answer-${survey.cid}`, JSON.stringify(newAnswers))

    setAnswers(newAnswers)
  }

  useEffect(() => {
    setAnswers(getAnswerFromLocalStorage(survey))
    if (survey.cid) {
      fetchAnswers(survey.cid)
        .then((answers: FetchedUserAnswer[]) => {
          const buildedAnswers = buildAnswersList(survey, answers)
          console.log('🚀 ~ file: SurveyItem.tsx:105 ~ .then ~ buildedAnswers:', buildedAnswers)
          setUserAnswers(buildedAnswers)
        })
    }
  }, [])

  return (
    <Paper sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <AnswerContext.Provider value={{ answers, handleSetAnswers }}>
        <Box>
          <Typography variant='subtitle2' sx={{ position: 'absolute' }}>
            <FormControlLabel control={<Switch checked={showStat} onChange={() => { setShowStat(!showStat) }} />} label='Show Stats' />
          </Typography>
          <Typography variant='h5' sx={{ mb: 2 }}>
            {survey.title}
          </Typography>

          <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', alignSelf: 'center', margin: 'auto', width: 'fit-content', gap: '5px' }}>
            Answer Reward : {survey.tokenRewardAmount}
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'>
              <path d='M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z' />
            </svg>
          </Typography>

          <Box>
            <Paper variant='outlined' sx={{ p: globalPadding, display: 'flex', gap: 2, flexDirection: 'column' }}>
              <Typography
                variant='subtitle2'
                sx={{ textAlign: 'left' }}
              >
                Sismo ZkProofs conditions :
              </Typography>
              <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                {survey.zkProofs.map((zkProof, index) => (<ZkConditionRequired key={index} sismoGroup={zkProof.dataGroup} minimumCondition={zkProof.minimumCondition} />))}
              </Stack>
            </Paper>
          </Box>

          <Stack my={2} p={1} spacing={2} divider={<Divider variant='middle' orientation='horizontal' flexItem />}>
            {survey.questions.map((question, index) => (
              <Box key={index}>
                {showStat
                  ? <AnswerData answers={userAnswers[index]} />
                  : <SurveyQuestion handleSetAnswers={handleSetAnswers} answers={answers} index={index} question={question} />}

              </Box>
            ))}

          </Stack>
          <SubmitAnswers survey={survey} />
        </Box>
      </AnswerContext.Provider>
    </Paper>
  )
}

export default SurveyItem
