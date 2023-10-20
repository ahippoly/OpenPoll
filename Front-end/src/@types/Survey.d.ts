import { EAnswerType } from './enums/Questions'

export {}

declare global {

    interface Survey
    {
        title: string
        zkProofs: ZkSource[]
        endTimestamp: number
        tokenRewardAmount: number // In ether
        questions: Question[]
        answers: Answer[]
    }

    interface ProofRequire
    {
        zkProofs: ZkSource[]
        questions: Question[]
    }

}
