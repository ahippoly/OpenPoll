import {
  SurveyAnswered as SurveyAnsweredEvent,
  SurveyPublished as SurveyPublishedEvent
} from "../generated/Contract/Contract"
import { SurveyAnswered, SurveyPublished } from "../generated/schema"

export function handleSurveyAnswered(event: SurveyAnsweredEvent): void {
  let entity = new SurveyAnswered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fileCID = event.params.fileCID
  entity.answers = event.params.answers
  entity.zkAnswers = event.params.zkAnswers

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSurveyPublished(event: SurveyPublishedEvent): void {
  let entity = new SurveyPublished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.fileCID = event.params.fileCID
  entity.numberOfQuestions = event.params.numberOfQuestions
  entity.rewardByAnswer = event.params.rewardByAnswer
  entity.endTimestamp = event.params.endTimestamp
  entity.zkSources = event.params.zkSources
  entity.questionZkSource = event.params.questionZkSource

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
