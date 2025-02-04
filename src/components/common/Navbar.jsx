import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NavLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 261px;
  margin-left: 5rem;
  height: 100%;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;
const NavBox = styled.nav`
  display: flex;
  flex-direction: column;
`;
const NavItemTitle = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`;
const NavList = styled.ul``;
const NavItem = styled.li`
  font-size: 19px;
  margin-bottom: 20px;
`;
const NavStyleLink = styled(NavLink)`
  &.active {
    color: #eb9537;
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <MainLayout>
      <NavLayout>
        <NavContainer className="scontainer">
          <NavBox className="menu">
            <NavItemTitle>신규모집 관리</NavItemTitle>
            <NavList>
              <NavItem>
                <NavStyleLink
                  to="/apply"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  지원 현황 및 지원 서류
                </NavStyleLink>
              </NavItem>
              <NavItem>
                <NavStyleLink
                  to="/pass"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  서류 합격자 선정
                </NavStyleLink>
              </NavItem>
              <NavItem>
                <NavStyleLink
                  to="/document"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  서류 문항 관리
                </NavStyleLink>
              </NavItem>
              <NavItem>
                <NavStyleLink
                  to="/interview"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  면접 시간 관리
                </NavStyleLink>
              </NavItem>
              <NavItem>
                <NavStyleLink
                  to="/pass-final"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  최종 합격자 선정
                </NavStyleLink>
              </NavItem>
              <NavItem>
                <NavStyleLink
                  to="/init-applicant"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  지원자 정보 초기화
                </NavStyleLink>
              </NavItem>
            </NavList>
          </NavBox>
        </NavContainer>
      </NavLayout>
      <Outlet />
    </MainLayout>
  );
};

export default Navbar;
