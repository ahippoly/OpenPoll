import { graphQueryUrl } from '@/config/globalConfig'

export const fetchSurveyList = async () => {
  const surveyList = await fetchWithTheGraph(`
  {
    surveyPublisheds(first: 5) {
      id
      name
      fileCID
      numberOfQuestions
    }
  }
  `)

  return surveyList.surveyPublisheds
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
