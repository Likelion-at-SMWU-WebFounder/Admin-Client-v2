import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from "../../style/LayoutStyle";
import Navbar from "../../components/common/Navbar";
import Logo from "../../components/common/Logo";
import apiModule from "../../api/apiModule";

const QuestionContainer = styled.div``;

const QuestionInput = styled.textarea`
  padding: 10px 10px;
  min-width: 1000px;
  height: fit-content;
  min-height: 150px;
  border-radius: 15px;
  border: 1px solid #fff;
  background: rgba(217, 217, 217, 0);
  color: #fff;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.263px;
  margin-bottom: 30px;
  height: 86px;
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Div = styled.div`
  height: 40px;
`;

const SaveButton = styled.button`
  border: none;
  margin-right: 20px;
  border-radius: 5px;
  background: #5c67ce;
  width: 102px;
  height: 56px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.414px;
`;

const VLine = styled.div`
  border-left: 1px solid white;
  min-height: 100vh;
`;

const DocumentItemsEditPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await apiModule.fetchQuestions();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      console.error("error:", err);
    }
  };

  const editQuestions = async (questionsData) => {
    try {
      await apiModule.updateQuestions(questionsData);
      alert("수정된 문항이 정상적으로 반영되었습니다.");
      navigate("/document");
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleQuestionChange = (sectionIndex, index, event) => {
    const newQuestions = [...questions];
    newQuestions[sectionIndex][index].content = event.target.value;
    setQuestions(newQuestions);
  };

  if (loading || questions === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Logo />
      <S.Layout>
        <Navbar />
        <VLine></VLine>
        <S.Container>
          <S.Title>서류 문항 관리</S.Title>
          <S.About>지원 서류 문항을 관리합니다.</S.About>
          <S.RowDiv>
            <S.Title>공통 문항</S.Title>
          </S.RowDiv>
          <QuestionContainer>
            {questions[0]?.map((question, index) => (
              <QuestionInput
                key={index}
                placeholder="문항 질문을 작성해주세요 ..."
                value={question.content}
                onChange={(event) => handleQuestionChange(0, index, event)}
              />
            ))}
          </QuestionContainer>

          <Div></Div>
          <S.RowDiv>
            <S.Title>기획 · 디자인 트랙 문항</S.Title>
          </S.RowDiv>
          <QuestionContainer>
            {questions[1]?.map((question, index) => (
              <QuestionInput
                key={index}
                placeholder="문항 질문을 작성해주세요 ..."
                value={question.content}
                onChange={(event) => handleQuestionChange(1, index, event)}
              />
            ))}
          </QuestionContainer>

          <Div></Div>
          <S.RowDiv>
            <S.Title>프론트엔드 트랙 문항</S.Title>
          </S.RowDiv>
          <QuestionContainer>
            {questions[2]?.map((question, index) => (
              <QuestionInput
                key={index}
                placeholder="문항 질문을 작성해주세요 ..."
                value={question.content}
                onChange={(event) => handleQuestionChange(2, index, event)}
              />
            ))}
          </QuestionContainer>

          <Div></Div>
          <S.RowDiv>
            <S.Title>백엔드 트랙 문항</S.Title>
          </S.RowDiv>
          <QuestionContainer>
            {questions[3]?.map((question, index) => (
              <QuestionInput
                key={index}
                placeholder="문항 질문을 작성해주세요 ..."
                value={question.content}
                onChange={(event) => handleQuestionChange(3, index, event)}
              />
            ))}
          </QuestionContainer>

          <Div></Div>
          <Div></Div>
          <Div></Div>
          <Div></Div>
          <S.ButtonContainer>
            <S.ButtonSet>
              <SaveButton
                onClick={() => {
                  editQuestions(questions.flat());
                }}
              >
                저장
              </SaveButton>
            </S.ButtonSet>
          </S.ButtonContainer>
        </S.Container>
      </S.Layout>
    </>
  );
};

export default DocumentItemsEditPage;
