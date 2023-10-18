// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {SurveyContract} from "../src/SurveyContract2.sol";
import "ds-test/test.sol";

contract SurveyContractTest is DSTest {
    // Import the main contract

    // Create an instance of the SurveyContract
    SurveyContract surveyContract;

    function setUp() public {
        // Deploy a new instance of SurveyContract
        surveyContract = new SurveyContract();
    }

    function test_PublishSurvey() public {
        // Call the publishSurvey function with test data
        surveyContract.publishSurvey(
            "Sample Survey",
            [QuestionMultiple(4), QuestionMultiple(3)],
            [QuestionNumber(1, 10), QuestionNumber(5, 20)],
            [QuestionZkSource("group1"), QuestionZkSource("group2")],
            100,
            block.timestamp + 3600
        );

        // You can write assertions here to check the state or events emitted.
        // For example, you can check the survey count:
        assertEq(surveyContract.surveyCount(), 1);
    }

    // Add more test cases as needed
}