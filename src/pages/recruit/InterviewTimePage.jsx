import React, { useState, useEffect } from "react";
import apiModule from "../../api/apiModule";
import styled from "styled-components";
import * as S from "../../style/LayoutStyle";
import Navbar from "../../components/common/Navbar";
import Logo from "../../components/common/Logo";
import Board from "../../components/board/Board";

const VLine = styled.div`
  border-left: 1px solid white;
  min-height: 100vh;
`;
const InterviewTimePage = () => {
  const [docs, setDocs] = useState([]);

  const fetchData = async () => {
    try {
      const data = await apiModule.fetchDocsResult();
      setDocs(data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToInterview = async (checkedItems) => {
    try {
      await apiModule.addInterview(checkedItems);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const deleteDocsResult = async (checkedItems) => {
    try {
      await apiModule.deleteDocsResult(checkedItems);
      await fetchData();
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <>
      <Logo />
      <S.Layout>
        <Navbar />
        <VLine></VLine>
        <S.Container>
          <S.Title>면접 시간 관리</S.Title>
          <S.About>서류 합격자의 면접 시간을 조정하고, 확정합니다.</S.About>
          <S.SubTitle>서류 합격자 테이블</S.SubTitle>
          <Board
            pass={docs}
            type="type3"
            onAdd={handleAddToInterview}
            onDelete={deleteDocsResult}
          />
        </S.Container>
      </S.Layout>
    </>
  );
};

export default InterviewTimePage;
