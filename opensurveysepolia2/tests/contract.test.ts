import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { SurveyAnswered } from "../generated/schema"
import { SurveyAnswered as SurveyAnsweredEvent } from "../generated/Contract/Contract"
import { handleSurveyAnswered } from "../src/contract"
import { createSurveyAnsweredEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let fileCID = "Example string value"
    let answers = [BigInt.fromI32(234)]
    let zkAnswers = [BigInt.fromI32(234)]
    let newSurveyAnsweredEvent = createSurveyAnsweredEvent(
      fileCID,
      answers,
      zkAnswers
    )
    handleSurveyAnswered(newSurveyAnsweredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SurveyAnswered created and stored", () => {
    assert.entityCount("SurveyAnswered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SurveyAnswered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fileCID",
      "Example string value"
    )
    assert.fieldEquals(
      "SurveyAnswered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "answers",
      "[234]"
    )
    assert.fieldEquals(
      "SurveyAnswered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "zkAnswers",
      "[234]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
