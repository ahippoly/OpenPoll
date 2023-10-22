import { EAnswerType } from './enums/Questions'

export {}

declare global {
    interface Question
    {
        title: string
        order: number
        answerType: keyof typeof EAnswerType
        possibleAnswers?: string[]
        rangeAnswer?: number[]
        zkAnswer?: SismoGroup
    }

    interface Answers
    {
        answerType: keyof typeof EAnswerType
        questionTitle: string
        totalByEntry: Record<string, number>
    }

    interface FetchedUserAnswer
    {
        fileCID: string
        answers: string[]
        zkAnswers: string[]
    }

}
