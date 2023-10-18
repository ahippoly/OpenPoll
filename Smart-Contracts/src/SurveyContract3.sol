// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SurveyContract {
    struct ZkSource {
        uint256 minimumRequired;
        bytes16 groupId;
    }

    struct Survey {
        uint256 rewardByAnswer;
        uint256 remainingRewardToken;
        uint256 endTimestamp;
        uint32 numberOfQuestions;

        uint256 zkSourceStartIndex;
        uint256 zkSourceNumber;

        uint256 questionZkSourceStartIndex;
        uint256 questionZkSourceNumber;
    }

    mapping(uint256 => ZkSource) zkSources;
    uint256 zkSourceCount;

    mapping(uint256 => bytes16) questionZkSources;
    uint256 questionZkSourceCount;

    mapping(string => Survey) public surveys;
    uint256 public surveyCount;

    event SurveyPublished(
        string name,        
        string fileCID,
        uint32 numberOfQuestions,
        uint256 rewardByAnswer,
        uint256 endTimestamp,
        ZkSource[] zkSources,
        bytes16[] questionZkSource
    );

    event SurveyAnswered(uint256 id, address responder);

    function publishSurvey(
        string memory _name,
        string memory fileCID,
        uint32 _numberOfQuestions,
        uint256 _rewardByAnswer,
        uint256 _endTimestamp,
        ZkSource[] memory _zkSources,
        bytes16[] memory _questionZkSource
    ) public payable {
        require(
            _questionZkSource.length > 0 || _numberOfQuestions > 0,
            "Questions list cannot be empty"
        );

        Survey storage newSurvey = surveys[fileCID];
        
        newSurvey.rewardByAnswer = _rewardByAnswer;
        newSurvey.remainingRewardToken = msg.value;
        newSurvey.endTimestamp = _endTimestamp;
        newSurvey.numberOfQuestions = _numberOfQuestions;

        newSurvey.zkSourceStartIndex = zkSourceCount;
        newSurvey.zkSourceNumber = _zkSources.length;

        newSurvey.questionZkSourceStartIndex = questionZkSourceCount;
        newSurvey.questionZkSourceNumber = _questionZkSource.length;

        // Add questions to the survey
        for (uint256 i = 0; i < _zkSources.length; i++) {
            zkSources[zkSourceCount++] = _zkSources[i];
        }

        for (uint256 i = 0; i < _questionZkSource.length; i++) {
            questionZkSources[questionZkSourceCount++] = _questionZkSource[i];
        }

        emit SurveyPublished(
            _name,
            fileCID,
            _numberOfQuestions,
            _rewardByAnswer,
            _endTimestamp,
            _zkSources,
            _questionZkSource
        );

        surveyCount++;
    }

    function getSurvey(string memory fileCID) public view returns (Survey memory) {
        return surveys[fileCID];
    }
}
