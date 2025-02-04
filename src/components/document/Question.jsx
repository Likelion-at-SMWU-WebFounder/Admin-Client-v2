import React, { useEffect, useState } from "react";
import apiModule from "../../api/apiModule";
import styled from "styled-components";

const Question = ({ documentData }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await apiModule.fetchQuestions();
        setQuestions(data);

        // 트랙 문항 임시 제거
        // if (documentData.studentInfo) {
        //   switch (documentData.studentInfo.track) {
        //     case "pm":
        //       setTrackQuestions(data[1]?.map((item) => item.content) || []);
        //       break;
        //     case "fe":
        //       setTrackQuestions(data[2]?.map((item) => item.content) || []);
        //       break;
        //     case "be":
        //       setTrackQuestions(data[3]?.map((item) => item.content) || []);
        //       break;
        //     default:
        //       setTrackQuestions(data[0]?.map((item) => item.content) || []);
        //   }
        // }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [documentData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <>
        {questions[0]?.map((question, index) => (
          <QuestionContainer key={index}>
            <Text fontSize="18px" marginTop="30px" marginLeft="30px">
              {`${index + 1}: `}
              &nbsp;
              {question.content}
              <QuestionLength>
                {documentData && documentData.answerList
                  ? documentData.answerList[index].length
                  : ""}
                자
              </QuestionLength>
            </Text>
            <Textarea>
              {documentData && documentData.answerList
                ? documentData.answerList[index]
                : ""}
            </Textarea>
          </QuestionContainer>
        ))}

        {/* <Hr marginTop="30px" />

        {trackQuestions?.map((question, index) => (
          <QuestionContainer key={index}>
            <Text fontSize="18px" marginTop="30px" marginLeft="30px">
              {`${index + 1}: `}
              &nbsp;
              {question}
            </Text>
            <Textarea fontSize="14px" marginLeft="30px">
              {documentData.answerList &&
                documentData.answerList[index + questions[0].length]}
            </Textarea>
          </QuestionContainer>
        ))} */}
      </>

      <QuestionContainer>
        <Text fontSize="18px" marginTop="30px" marginLeft="30px">
          면접 가능 시간
        </Text>
        {documentData &&
          documentData.interviewTime &&
          documentData.interviewTime.map((item, i) => (
            <Text key={i} fontSize="15px" marginTop="30px" marginLeft="30px">
              {item}
            </Text>
          ))}
      </QuestionContainer>
    </>
  );
};

export default Question;

const Text = styled.div`
  width: 1000px;
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  line-height: 25px;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const Textarea = styled.div`
  margin: 30px;
  font-size: 14px;
  padding: 10px;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 10px;
  width: 1000px;
  min-height: 100px;
  height: fit-content;
  resize: vertical;
  background: #111111;
  line-height: 1.5rem;
`;

const QuestionLength = styled.div`
  margin-top: 10px;
  color: #eb9537;
`;
