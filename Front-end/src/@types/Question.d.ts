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

    interface Answer
    {
        answerType: keyof typeof EAnswerType
        questionIndex: number
        totalByEntry: string[]
    }

}
