// FILEPATH: /c:/Code/OpenSurvey/Smart-Contracts/test/SurveyContractTest.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {SurveyContract} from "../src/SurveyContract.sol";
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

        SurveyContract.ZkSource[] memory zkSources = new SurveyContract.ZkSource[](2);
        SurveyContract.QuestionMultiple[] memory questionMultiples = new SurveyContract.QuestionMultiple[](2);
        SurveyContract.QuestionNumber[] memory questionNumbers = new SurveyContract.QuestionNumber[](2);
        SurveyContract.QuestionZkSource[] memory questionZkSources = new SurveyContract.QuestionZkSource[](2);

        zkSources[0] = SurveyContract.ZkSource({minimumRequired: 1, groupId: bytes16(0x12345678901234567890123456789012)});
        zkSources[1] = SurveyContract.ZkSource({minimumRequired: 2, groupId: bytes16(0x12345678901234567890123456789012)});

        questionMultiples[0] = SurveyContract.QuestionMultiple({possibleAnswers: 4});
        questionMultiples[1] = SurveyContract.QuestionMultiple({possibleAnswers: 3});

        questionNumbers[0] = SurveyContract.QuestionNumber({minimumValue: 1, maximumValue: 10});
        questionNumbers[1] = SurveyContract.QuestionNumber({minimumValue: 5, maximumValue: 20});

        questionZkSources[0] = SurveyContract.QuestionZkSource({groupId: bytes16(0x12345678901234567890123456789012)});
        questionZkSources[1] = SurveyContract.QuestionZkSource({groupId: bytes16(0x12345678901234567890123456789012)});



        surveyContract.publishSurvey(
            "Sample Survey",
            zkSources,
            questionMultiples,
            questionNumbers,
            questionZkSources,
            100,
            block.timestamp + 3600
        );

        // You can write assertions here to check the state or events emitted.
        // For example, you can check the survey count:
        assertEq(surveyContract.surveyCount(), 1);
    }

    // Add more test cases as needed
}