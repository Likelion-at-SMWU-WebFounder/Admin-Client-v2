import React, { useState, useEffect } from "react";
import apiModule from "../../api/apiModule";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from "../../style/LayoutStyle";
import Navbar from "../../components/common/Navbar";
import Logo from "../../components/common/Logo";

const QuestionContainer = styled.div`
  display: flex;
`;

const QuestionDiv = styled.div`
  padding: 10px 10px;
  width: 800px;
  min-width: 800px;
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
`;

const QuestionInput = styled.textarea`
  padding: 10px 10px;
  width: 800px;
  min-width: 800px;
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
  border: 2px solid white;
  margin-right: 20px;
  border-radius: 5px;
  background: white;
  width: 100px;
  height: 56px;
  flex-shrink: 0;
  color: black;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.414px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

const EditButton = styled.button`
  border: none;
  border-radius: 5px;
  background: #8891e0;
  width: 150px;
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

const DeleteButton = styled.button`
  border: none;
  border-radius: 5px;
  background: #ff6347;
  width: 100px;
  height: 56px;
  flex-shrink: 0;
  color: black;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.414px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

const ButtonSet = styled.div`
  display: flex;
  margin-left: 800px;
`;

const VLine = styled.div`
  border-left: 1px solid white;
  min-height: 100vh;
`;

const DocumentItemsPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [inputContents, setInputContents] = useState({
    common: "",
    pm: "",
    fe: "",
    be: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);

  const fetchDataAndUpdateQuestions = async () => {
    try {
      const data = await apiModule.fetchQuestions();
      setUpdateFlag(false);
      setQuestions(data);
    } catch (err) {
      console.error("error:", err);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateQuestions();
  }, [updateFlag]);

  const handleChange = (event, track) => {
    setInputContents({
      ...inputContents,
      [track]: event.target.value,
    });
  };

  const onSubmit = (track, idx) => {
    if (window.confirm("작성한 문항을 추가하시겠습니까?")) {
      handleSubmit(track, idx);
      alert("문항이 추가되었습니다.");
    }
  };

  const handleSubmit = async (track, idx) => {
    try {
      await apiModule.postQuestions({
        year: 2024,
        track: track,
        number: questions[idx].length + 1,
        content: inputContents[track],
        maxLength: 600,
      });
      setUpdateFlag(true);
      setInputContents({ ...inputContents, [track]: "" });
    } catch (error) {
      console.error("error", error);
    }
  };

  const onDelete = (id) => {
    if (window.confirm("문항을 삭제하시겠습니까?")) {
      handleDelete(id);
      alert("문항이 삭제되었습니다.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiModule.deleteQuestion(id);
      setUpdateFlag(true);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <Logo />
      <S.Layout>
        <Navbar />
        <VLine></VLine>
        <S.Container>
          <S.Title>서류 문항 관리</S.Title>
          <S.About>지원 서류 문항을 관리합니다.</S.About>
          <ButtonSet>
            <EditButton
              onClick={() => {
                navigate("/editdocument");
              }}
            >
              수정
            </EditButton>
          </ButtonSet>
          <S.RowDiv>
            <S.Title>공통 문항</S.Title>
          </S.RowDiv>
          <>
            <QuestionContainer>
              <QuestionInput
                type="text"
                value={inputContents.common}
                placeholder="새로운 공통 문항을 입력하세요."
                onChange={(e) => handleChange(e, "common")}
              />
              <SaveButton onClick={() => onSubmit("common", 0)}>
                저장
              </SaveButton>
            </QuestionContainer>
            {questions[0]?.map((data) => (
              <QuestionContainer key={data.id}>
                <QuestionDiv>{data.content}</QuestionDiv>
                <DeleteButton onClick={() => onDelete(data.id)}>
                  삭제
                </DeleteButton>
              </QuestionContainer>
            ))}
          </>
          <Div></Div>
          <S.RowDiv>
            <S.Title>기획 · 디자인 트랙 문항</S.Title>
          </S.RowDiv>
          <>
            <QuestionContainer>
              <QuestionInput
                type="text"
                value={inputContents.pm}
                placeholder="새로운 기획 · 디자인 문항을 입력하세요."
                onChange={(e) => handleChange(e, "pm")}
              />
              <SaveButton onClick={() => onSubmit("pm", 1)}>저장</SaveButton>
            </QuestionContainer>
            {questions[1]?.map((data) => (
              <QuestionContainer key={data.id}>
                <QuestionDiv>{data.content}</QuestionDiv>
                <DeleteButton onClick={() => onDelete(data.id)}>
                  삭제
                </DeleteButton>
              </QuestionContainer>
            ))}
          </>
          <Div></Div>
          <S.RowDiv>
            <S.Title>프론트엔드 트랙 문항</S.Title>
          </S.RowDiv>
          <>
            <QuestionContainer>
              <QuestionInput
                type="text"
                value={inputContents.fe}
                placeholder="새로운 프론트엔드 문항을 입력하세요."
                onChange={(e) => handleChange(e, "fe")}
              />
              <SaveButton onClick={() => onSubmit("fe", 2)}>저장</SaveButton>
            </QuestionContainer>
            {questions[2]?.map((data) => (
              <QuestionContainer key={data.id}>
                <QuestionDiv>{data.content}</QuestionDiv>
                <DeleteButton onClick={() => onDelete(data.id)}>
                  삭제
                </DeleteButton>
              </QuestionContainer>
            ))}
          </>
          <Div></Div>
          <S.RowDiv>
            <S.Title>백엔드 트랙 문항</S.Title>
          </S.RowDiv>
          <>
            <QuestionContainer>
              <QuestionInput
                type="text"
                value={inputContents.be}
                placeholder="새로운 백엔드 문항을 입력하세요."
                onChange={(e) => handleChange(e, "be")}
              />
              <SaveButton onClick={() => onSubmit("be", 3)}>저장</SaveButton>
            </QuestionContainer>
            {questions[3]?.map((data) => (
              <QuestionContainer key={data.id}>
                <QuestionDiv>{data.content}</QuestionDiv>
                <DeleteButton onClick={() => onDelete(data.id)}>
                  삭제
                </DeleteButton>
              </QuestionContainer>
            ))}
          </>
        </S.Container>
      </S.Layout>
    </>
  );
};

export default DocumentItemsPage;
