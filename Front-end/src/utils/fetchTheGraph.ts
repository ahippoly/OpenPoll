import { graphQueryUrl } from '@/config/globalConfig'

export const fetchSurveyList = async () => {
  const surveyList = await fetchWithTheGraph(`
  {
    surveyPublisheds(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
        id
        name
        fileCID
        numberOfQuestions
      }
  }
  `)

  return surveyList.surveyPublisheds
}

export const fetchAnswers = async (fileCID: string) => {
  const answers = await fetchWithTheGraph(`
    {
        surveyAnswereds(
            where: {fileCID: "${fileCID}"}
          ) {
            id
            fileCID
            answers
            zkAnswers
          }
    }
    `)

  return answers.surveyAnswereds
}

const fetchWithTheGraph = async (query: string) => {
  const response = await fetch(graphQueryUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
    }),
  })
  const data = await response.json()
  return data.data
}
