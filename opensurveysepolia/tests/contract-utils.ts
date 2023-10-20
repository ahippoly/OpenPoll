import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { SurveyAnswered, SurveyPublished } from "../generated/Contract/Contract"

export function createSurveyAnsweredEvent(
  fileCID: string,
  answers: Array<i32>,
  zkAnswers: Array<BigInt>
): SurveyAnswered {
  let surveyAnsweredEvent = changetype<SurveyAnswered>(newMockEvent())

  surveyAnsweredEvent.parameters = new Array()

  surveyAnsweredEvent.parameters.push(
    new ethereum.EventParam("fileCID", ethereum.Value.fromString(fileCID))
  )
  surveyAnsweredEvent.parameters.push(
    new ethereum.EventParam("answers", ethereum.Value.fromI32Array(answers))
  )
  surveyAnsweredEvent.parameters.push(
    new ethereum.EventParam(
      "zkAnswers",
      ethereum.Value.fromUnsignedBigIntArray(zkAnswers)
    )
  )

  return surveyAnsweredEvent
}

export function createSurveyPublishedEvent(
  name: string,
  fileCID: string,
  numberOfQuestions: BigInt,
  rewardByAnswer: BigInt,
  endTimestamp: BigInt,
  zkSources: Array<ethereum.Tuple>,
  questionZkSource: Array<Bytes>
): SurveyPublished {
  let surveyPublishedEvent = changetype<SurveyPublished>(newMockEvent())

  surveyPublishedEvent.parameters = new Array()

  surveyPublishedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  surveyPublishedEvent.parameters.push(
    new ethereum.EventParam("fileCID", ethereum.Value.fromString(fileCID))
  )
  surveyPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "numberOfQuestions",
      ethereum.Value.fromUnsignedBigInt(numberOfQuestions)
    )
  )
  surveyPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardByAnswer",
      ethereum.Value.fromUnsignedBigInt(rewardByAnswer)
    )
  )
  surveyPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "endTimestamp",
      ethereum.Value.fromUnsignedBigInt(endTimestamp)
    )
  )
  surveyPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "zkSources",
      ethereum.Value.fromTupleArray(zkSources)
    )
  )
  surveyPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "questionZkSource",
      ethereum.Value.fromFixedBytesArray(questionZkSource)
    )
  )

  return surveyPublishedEvent
}
