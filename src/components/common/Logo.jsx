import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100vw;
  margin-left: 5rem;
  img {
    width: 241px;
  }
`;

const LogoImg = styled.img`
  padding-top: 1rem;
  padding-bottom: 4rem;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/Logo.svg`} alt="Logo" />
      </Link>
      <LogoImg src={`${process.env.PUBLIC_URL}/AdminLogo.svg`} alt="Logo" />
    </LogoContainer>
  );
};

export default Logo;
