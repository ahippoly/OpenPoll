import { EAnswerType } from '../enums/Questions'

export {}

declare global {

    interface Survey
    {
        title: string
        zkProofs: ZkSource[]
        endTimestamp: number
        tokenRewardAmount: number // In ether
        questions: Question[]
        cid?: string
    }

    interface ProofRequire
    {
        zkProofs: ZkSource[]
        questions: Question[]
    }

    interface EmittedSurvey
    {
        id: string
        name: string
        fileCID: string
        numberOfQuestions: number
    }

}
