// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SurveyContract {

    struct ZkSource
    {
        uint256 minimumRequired;
        bytes16 groupId;
    }

    struct QuestionNumber
    {
        uint256 minimumValue;
        uint256 maximumValue;
    }

    struct QuestionZkSource
    {
        bytes16 groupId;
    }

    struct QuestionMultiple
    {
        uint256 possibleAnswers;
    }

    struct Survey {
        uint256 rewardByAnswer;
        uint256 remainingRewardToken;
        ZkSource[] zkSources;
        QuestionMultiple[] questionMultiples;
        QuestionNumber[] questionNumbers;
        QuestionZkSource[] questionZkSources;
    }

    mapping(uint256 => Survey) public surveys;
    mapping(uint256 => mapping(address => bool)) public surveyResponders;
    uint256 public surveyCount;
    
    event SurveyPublished(string name, uint256 id);
    event SurveyAnswered(uint256 id, address responder);

    function publishSurvey(
        string memory _name,
        QuestionMultiple[] memory _questionMultiples,
        QuestionNumber[] memory _questionsNumber, 
        QuestionZkSource[] memory _questionZkSources,
        uint256 _rewardByAnswer
        ) public payable {
            require(_questionMultiples.length > 0 || _questionsNumber.length > 0 || _questionZkSources.length > 0 , "Questions list cannot be empty");

            for (uint256 i = 0; i < _questionMultiples.length; i++) {
                require(_questionMultiples[i].possibleAnswers > 0, "Possible answers must be greater than 0");
            }

            for (uint256 i = 0; i < _questionsNumber.length; i++) {
                require(_questionsNumber[i].minimumValue < _questionsNumber[i].maximumValue, "Minimum value must be less than maximum value");
            }

            Survey memory newSurvey = Survey({
                rewardByAnswer: _rewardByAnswer,
                remainingRewardToken: msg.value,
                zkSources: new ZkSource[](0),
                questionNumbers: new QuestionNumber[](0),
                questionZkSources: new QuestionZkSource[](0),
                questionMultiples: new QuestionMultiple[](0)
            });

            surveys[surveyCount] = newSurvey;

            emit SurveyPublished(_name, surveyCount);

            surveyCount++;
    }

    // function answerSurvey(uint256 _id, string[][] memory _answers) public {
    //     require(_id < surveys.length, "Invalid survey ID");
    //     require(_answers.length == surveys[_id].questions.length, "Answers list length must match survey questions list length");
    //     require(!surveys[_id].answered[msg.sender], "You have already answered this survey");

    //     surveys[_id].answered[msg.sender] = true;
    //     // surveyResponders[_id].push(msg.sender);

    //     emit SurveyAnswered(_id, msg.sender);
    // }

    // function getSurvey(uint256 _id) public view returns (string memory name, uint256 reward, string[] memory questions, string[][] memory answers, uint256 respondersCount) {
    //     require(_id < surveys.length, "Invalid survey ID");

    //     Survey storage survey = surveys[_id];
    //     return (survey.name, survey.reward, survey.questions, survey.answers, surveyResponders[_id].length);
    // }
}