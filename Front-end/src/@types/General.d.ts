
export {}

declare global {

    interface ReducerPayload
    {
        type: string
        property?: string
        value: any
    }
}
