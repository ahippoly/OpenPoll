// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SurveyContract {
    struct ZkSource {
        uint256 minimumRequired;
        bytes16 groupId;
    }

    struct QuestionNumber {
        uint256 minimumValue;
        uint256 maximumValue;
    }

    struct QuestionZkSource {
        bytes16 groupId;
    }

    struct QuestionMultiple {
        uint256 possibleAnswers;
    }

    struct Survey {
        uint256 rewardByAnswer;
        uint256 remainingRewardToken;
        uint256 endTimestamp;

        uint256 zkSourceStartIndex;
        uint256 zkSourceEndIndex;

        uint256 questionMultipleStartIndex;
        uint256 questionMultipleEndIndex;

        uint256 questionNumberStartIndex;
        uint256 questionNumberEndIndex;

        uint256 questionZkSourceStartIndex;
        uint256 questionZkSourceEndIndex;
    }

    mapping(uint256 => ZkSource) zkSources;
    uint256 zkSourceCount;

    mapping(uint256 => QuestionNumber) questionNumbers;
    uint256 questionNumberCount;

    mapping(uint256 => QuestionZkSource) questionZkSources;
    uint256 questionZkSourceCount;

    mapping(uint256 => QuestionMultiple) questionMultiples;
    uint256 questionMultipleCount;


    mapping(uint256 => Survey) public surveys;
    uint256 public surveyCount;

    event SurveyPublished(string name, uint256 id);
    event SurveyAnswered(uint256 id, address responder);

    function publishSurvey(
        string memory _name,
        ZkSource[] memory _zkSources,
        QuestionMultiple[] memory _questionMultiples,
        QuestionNumber[] memory _questionsNumber,
        QuestionZkSource[] memory _questionZkSources,
        uint256 _rewardByAnswer,
        uint256 _endTimestamp
    ) public payable {
        require(
            _questionMultiples.length > 0 ||
            _questionsNumber.length > 0 ||
            _questionZkSources.length > 0,
            "Questions list cannot be empty"
        );

        for (uint256 i = 0; i < _questionMultiples.length; i++) {
            require(_questionMultiples[i].possibleAnswers > 0, "Possible answers must be greater than 0");
        }

        for (uint256 i = 0; i < _questionsNumber.length; i++) {
            require(_questionsNumber[i].minimumValue < _questionsNumber[i].maximumValue, "Minimum value must be less than maximum value");
        }

        Survey storage newSurvey = surveys[surveyCount];
        
        newSurvey.rewardByAnswer = _rewardByAnswer;
        newSurvey.remainingRewardToken = msg.value;
        newSurvey.endTimestamp = _endTimestamp;

        newSurvey.zkSourceStartIndex = zkSourceCount;
        newSurvey.questionMultipleStartIndex = questionMultipleCount;

        newSurvey.questionNumberStartIndex = questionNumberCount;
        newSurvey.questionZkSourceStartIndex = questionZkSourceCount;

        newSurvey.zkSourceEndIndex = zkSourceCount + _questionZkSources.length;
        newSurvey.questionMultipleEndIndex = questionMultipleCount + _questionMultiples.length;
        
        newSurvey.questionNumberEndIndex = questionNumberCount + _questionsNumber.length;
        newSurvey.questionZkSourceEndIndex = questionZkSourceCount + _questionZkSources.length;

        // Add questions to the survey
        for (uint256 i = 0; i < _zkSources.length; i++) {
            zkSources[zkSourceCount] = ZkSource({
                minimumRequired: _zkSources[i].minimumRequired,
                groupId: _zkSources[i].groupId
            });
            zkSourceCount++;
        }

        for (uint256 i = 0; i < _questionMultiples.length; i++) {
            questionMultiples[questionMultipleCount] = QuestionMultiple({
                possibleAnswers: _questionMultiples[i].possibleAnswers
            });
            questionMultipleCount++;
        }

        for (uint256 i = 0; i < _questionsNumber.length; i++) {
            questionNumbers[questionNumberCount] = QuestionNumber({
                minimumValue: _questionsNumber[i].minimumValue,
                maximumValue: _questionsNumber[i].maximumValue
            });
            questionNumberCount++;
        }

        for (uint256 i = 0; i < _questionZkSources.length; i++) {
            questionZkSources[questionZkSourceCount] = QuestionZkSource({
                groupId: _questionZkSources[i].groupId
            });
            questionZkSourceCount++;
        }

        for (uint256 i = 0; i < _questionMultiples.length; i++) {
            questionMultiples[questionMultipleCount] = QuestionMultiple({
                possibleAnswers: _questionMultiples[i].possibleAnswers
            });
            questionMultipleCount++;
        }

        emit SurveyPublished(_name, surveyCount);

        surveyCount++;

        
    }

    function addZkSourceToSurvey(
        uint256 _surveyId, 
        uint256 _minimumRequired, 
        bytes16 _groupId
    ) public {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");

        Survey storage survey = surveys[_surveyId];
        uint256 zkSourceIndex = survey.zkSourceEndIndex;
        zkSources[zkSourceIndex] = ZkSource({
            minimumRequired: _minimumRequired,
            groupId: _groupId
        });
        survey.zkSourceEndIndex++;
    }

    function addQuestionNumberToSurvey(
        uint256 _surveyId, 
        uint256 _minimumValue, 
        uint256 _maximumValue
    ) public {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");

        Survey storage survey = surveys[_surveyId];
        uint256 questionNumberIndex = survey.questionNumberEndIndex;
        questionNumbers[questionNumberIndex] = QuestionNumber({
            minimumValue: _minimumValue,
            maximumValue: _maximumValue
        });
        survey.questionNumberEndIndex++;
    }

    function addQuestionZkSourceToSurvey(
        uint256 _surveyId, 
        bytes16 _groupId
    ) public {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");

        Survey storage survey = surveys[_surveyId];
        uint256 questionZkSourceIndex = survey.questionZkSourceEndIndex;
        questionZkSources[questionZkSourceIndex] = QuestionZkSource({
            groupId: _groupId
        });
        survey.questionZkSourceEndIndex++;
    }

    function addQuestionMultipleToSurvey(
        uint256 _surveyId, 
        uint256 _possibleAnswers
    ) public {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");

        Survey storage survey = surveys[_surveyId];
        uint256 questionMultipleIndex = survey.questionMultipleEndIndex;
        questionMultiples[questionMultipleIndex] = QuestionMultiple({
            possibleAnswers: _possibleAnswers
        });
        survey.questionMultipleEndIndex++;
    }

    
    function getZkSourceCount(uint256 _surveyId) public view returns (uint256) {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");
        return surveys[_surveyId].zkSourceCount;
    }

    function getQuestionNumberCount(uint256 _surveyId) public view returns (uint256) {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");
        return surveys[_surveyId].questionNumberCount;
    }

    function getQuestionZkSourceCount(uint256 _surveyId) public view returns (uint256) {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");
        return surveys[_surveyId].questionZkSourceCount;
    }

    function getQuestionMultipleCount(uint256 _surveyId) public view returns (uint256) {
        require(_surveyId < surveyCount, "Survey with this ID does not exist");
        return surveys[_surveyId].questionMultipleCount;
    }
}
