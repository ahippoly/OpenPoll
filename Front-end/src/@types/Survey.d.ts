export {}

declare global {

    interface Survey
    {
        title: string
        zkProofs: ZkSource[]
        endTimestamp: number
        tokenRewardAmount: number // In ether
        questions: Question[]
    }

    interface ProofRequire
    {
        zkProofs: ZkSource[]
        questions: Question[]
    }

}
