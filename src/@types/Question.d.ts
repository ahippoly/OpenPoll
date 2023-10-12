
export {}

declare global {
    interface PossibleAnswer<T>
    {
        title: string
    }

    type TAnswerType = 'multipleAnswer' | 'number' | 'fromZkProof'

    interface Question
    {
        title: string
        answerType: TAnswerType
        possibleAnswers?: PossibleAnswer<unknown>[]
        value: number
    }

}
