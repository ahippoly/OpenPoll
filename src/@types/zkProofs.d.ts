
export {}

declare global {

    interface ZkProofs
    {
        title: string
    }
    interface ZkSource
    {
        minimumCondition?: number
        dataGroup?: SismoGroup
    }
}
