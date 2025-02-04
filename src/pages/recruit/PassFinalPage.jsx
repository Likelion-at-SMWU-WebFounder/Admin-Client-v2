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

const PassFinalPage = () => {
  const [docs, setDocs] = useState([]);

  const fetchDocsResult = async () => {
    try {
      const data = await apiModule.fetchInterviewResults();
      setDocs(data);
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    fetchDocsResult();
  }, []);

  const deleteInterview = async (checkedItems) => {
    try {
      await apiModule.deleteInterview(checkedItems);
      await fetchDocsResult();
    } catch (err) {
      console.error("err", err);
    }
  };
  return (
    <>
      <Logo />
      <S.Layout>
        <Navbar />
        <VLine></VLine>
        <S.Container>
          <S.Title>최종 합격자 선정</S.Title>
          <S.About>최종 합격자를 선정합니다.</S.About>
          <S.SubTitle>최종 합격자 테이블</S.SubTitle>
          <Board pass={docs} type="type2" onDelete={deleteInterview} />
        </S.Container>
      </S.Layout>
    </>
  );
};

export default PassFinalPage;
