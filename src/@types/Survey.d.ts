export {}

declare global {

    interface Survey
    {
        title: string
        zkProofs: ZkSource[]
        endTimestamp: number
        tokenRewardAmount: number // In ether
        erc20RewardTokenAddress: string
        questions: Question[]
    }

}
