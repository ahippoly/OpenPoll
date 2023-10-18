// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.13;

// contract SurveyContract {
//     struct ZkSource {
//         uint256 minimumRequired;
//         bytes16 groupId;
//     }

//     struct QuestionNumber {
//         uint256 minimumValue;
//         uint256 maximumValue;
//     }

//     struct QuestionZkSource {
//         bytes16 groupId;
//     }

//     struct QuestionMultiple {
//         uint256 possibleAnswers;
//     }

//     struct Survey {
//         uint256 rewardByAnswer;
//         uint256 remainingRewardToken;
//         uint256 endTimestamp;
//         ZkSource[] zkSources;
//         QuestionNumber[] questionNumbers;
//         QuestionZkSource[] questionZkSources;
//         QuestionMultiple[] questionMultiples;
//     }

//     mapping(uint256 => Survey) public surveys;
//     uint256 public surveyCount;

//     event SurveyPublished(string name, uint256 id);
//     event SurveyAnswered(uint256 id, address responder);

//     function publishSurvey(
//         string memory _name,
//         QuestionMultiple[] memory _questionMultiples,
//         QuestionNumber[] memory _questionsNumber,
//         QuestionZkSource[] memory _questionZkSources,
//         uint256 _rewardByAnswer,
//         uint256 _endTimestamp
//     ) public payable {
//         require(
//             _questionMultiples.length > 0 ||
//             _questionsNumber.length > 0 ||
//             _questionZkSources.length > 0,
//             "Questions list cannot be empty"
//         );

//         for (uint256 i = 0; i < _questionMultiples.length; i++) {
//             require(_questionMultiples[i].possibleAnswers > 0, "Possible answers must be greater than 0");
//         }

//         for (uint256 i = 0; i < _questionsNumber.length; i++) {
//             require(_questionsNumber[i].minimumValue < _questionsNumber[i].maximumValue, "Minimum value must be less than maximum value");
//         }

//         Survey storage newSurvey = surveys[surveyCount];
//         newSurvey.rewardByAnswer = _rewardByAnswer;
//         newSurvey.remainingRewardToken = msg.value;
//         newSurvey.endTimestamp = _endTimestamp;

//         // Add questions to the survey
//         newSurvey.questionMultiples = _questionMultiples;
//         newSurvey.questionNumbers = _questionsNumber;
//         newSurvey.questionZkSources = _questionZkSources;

//         emit SurveyPublished(_name, surveyCount);

//         surveyCount++;
//     }
// }
