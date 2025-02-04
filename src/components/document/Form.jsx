import React from "react";

import styled from "styled-components";

// TODO : img 잘 나오는지 확인
const Form = ({ documentData }) => {
  return (
    <>
      <Img src={`${process.env.PUBLIC_URL}/Logo.svg`} alt="Logo" />
      <Row>
        {documentData && (
          <>
            {documentData.studentInfo.track === "fe" && (
              <PartText>프론트엔드 트랙</PartText>
            )}
            {documentData.studentInfo.track === "be" && (
              <PartText>백엔드 트랙</PartText>
            )}
            {documentData.studentInfo.track === "pm" && (
              <PartText>기획 · 디자인 트랙</PartText>
            )}
          </>
        )}
        <TitleText>&nbsp;서류 작성 페이지 입니다.</TitleText>
      </Row>
      <Text
        fontSize="20px"
        marginTop="25px"
        style={{ fontWeight: "200" }}
      ></Text>
      <Hr marginTop="80px" marginBottom="70px" />
      <Row>
        <FormContainer>
          <Text fontSize="20px">성함</Text>
          <Div>{documentData && documentData.studentInfo.name}</Div>
        </FormContainer>
        <FormContainer>
          <Text fontSize="20px">전화번호</Text>
          <Div>{documentData && documentData.studentInfo.phoneNumber}</Div>
        </FormContainer>
      </Row>
      <Row>
        <FormContainer>
          <Text fontSize="20px">학번</Text>
          <Div>{documentData && documentData.studentInfo.studentId}</Div>
        </FormContainer>
        <FormContainer>
          <Text fontSize="20px">전공</Text>
          <Div>{documentData && documentData.studentInfo.major}</Div>
        </FormContainer>
      </Row>
      <Row style={{ marginLeft: "570px" }}>
        <Text fontSize="13px" marginBottom="12px"></Text>
      </Row>
      <Row>
        <FormContainer>
          <Text fontSize="20px">수료 학기</Text>
          <Div>{documentData && documentData.studentInfo.completedSem}</Div>
        </FormContainer>
        <FormContainer>
          <Text fontSize="20px">재/휴학 여부</Text>
          <Div>{documentData && documentData.studentInfo.schoolStatus}</Div>
        </FormContainer>
      </Row>
      <Row>
        <FormContainer>
          <Text fontSize="20px">졸업 예정 연도</Text>
          <Div>{documentData && documentData.studentInfo.graduatedYear}</Div>
        </FormContainer>
        <FormContainer>
          <Text fontSize="20px">이메일</Text>
          <Div>{documentData && documentData.studentInfo.email}</Div>
        </FormContainer>
      </Row>
      <Row>
        <FormContainer>
          <Text fontSize="20px">프로그래머스 수강 여부</Text>
          <Div>{documentData && documentData.studentInfo.programmers}</Div>
        </FormContainer>
        {documentData &&
          documentData.studentInfo.programmers === "ENROLLED" && (
            <FormContainer>
              <Text fontSize="20px" marginLeft="130px">
                프로그래머스 수강 인증
              </Text>
              <Imgg src={documentData.studentInfo.programmersImg} alt="" />
            </FormContainer>
          )}
      </Row>
      <Hr marginTop="70px" />
    </>
  );
};

export default Form;

const PartText = styled.div`
  font-size: 36px;
  font-weight: 700;
  background-image: url(${(props) => props.background});
  background-size: auto;
  background-repeat: no-repeat;
  background-position: 0% 90%;
  height: 52px;
  margin-top: 120px;
`;

const TitleText = styled.div`
  font-size: 36px;
  font-weight: 700;
  height: 52px;
  margin-top: 120px;
`;

const Img = styled.img`
  width: 300px;
`;

const Imgg = styled.img`
  width: 300px;
  &:hover {
    transform: scale(2);
  }
`;

const Hr = styled.hr`
  border: 1px solid #ffffff;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  width: 1100px;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const Row = styled.div`
  display: flex;
  padding: 10px;
`;

const Text = styled.div`
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
`;

const Div = styled.div`
  font-size: 20px;
  background: #111111;
  border-radius: 15px;
  color: white;
  border: 1px solid #ffffff;
  width: 370px;
  padding: 12px;
  margin-left: 25px;
  margin-top: 5px;
  margin-right: 50px;

  ::placeholder {
    color: #9e9e9e;
  }
`;
