import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  padding-bottom: 10vh;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4vw;
  margin-right: 4vw;
  width: 100vw;
`;

export const Title = styled.div`
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.768px;
`;

export const About = styled.div`
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.061px;
  margin-bottom: 60px;
`;

export const SubTitle = styled.div`
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.263px;
  margin-bottom: 25px;
`;

export const ButtonContainer = styled.div`
  position: relative;
`;

export const ButtonSet = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  margin-bottom: 80px;

  @media (max-width: 500px) {
    position: absolute;
    right: 0;
    bottom: auto;
  }
`;
