import React from "react";
import apiModule from "../../api/apiModule";
import styled from "styled-components";
import * as S from "../../style/LayoutStyle";
import Navbar from "../../components/common/Navbar";
import Logo from "../../components/common/Logo";

const VLine = styled.div`
  border-left: 1px solid white;
  min-height: 100vh;
`;
const DeleteButton = styled.button`
  border: none;
  margin-right: 20px;
  border-radius: 15px;
  background: #ff6e6e;
  width: 328px;
  height: 64px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.414px;
`;

const InitApplicantPage = () => {
  const onClickInitButton = async () => {
    if (
      window.confirm(
        "지원자 정보를 정말 초기화하시겠습니까?\n초기화된 정보는 재복구가 불가합니다."
      )
    ) {
      try {
        await apiModule.initApplicant();
      } catch (err) {
        console.error("err", err);
      }
      alert("지원자 정보가 정말 초기화되었습니다.");
    }
  };

  return (
    <>
      <Logo />
      <S.Layout>
        <Navbar />
        <VLine></VLine>
        <S.Container>
          <S.Title>지원자 정보 초기화</S.Title>
          <S.About>
            지원자 정보를 초기화합니다. 초기화된 정보는 재복구가 어렵습니다.
          </S.About>
          <DeleteButton onClick={onClickInitButton}>
            지원자 정보 초기화
          </DeleteButton>
        </S.Container>
      </S.Layout>
    </>
  );
};

export default InitApplicantPage;
