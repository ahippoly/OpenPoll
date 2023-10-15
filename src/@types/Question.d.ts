import { EAnswerType } from './enums/Questions'

export {}

declare global {
    interface Question
    {
        title: string
        answerType: keyof typeof EAnswerType
        possibleAnswers?: string[]
        rangeAnswer?: number[]
        zkAnswer?: SismoGroup
    }

}
