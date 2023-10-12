
export {}

declare global {

    interface Poll
    {
        title: string
        zkProofs: ZkProofs[]
        endTimestamp: number
        tokenRewardAmount: number // In ether
        erc20RewardTokenAddress: string
        questions: Question[]
    }
}
