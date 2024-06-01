import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 100px;
`;

const NavLinks = styled.nav`
  display: flex;
  margin-right: 100px;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-left: 1rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>My Logo</Logo>
      <NavLinks>
        <NavLink href="#">Link 1</NavLink>
        <NavLink href="#">Link 2</NavLink>
        <NavLink href="#">Link 3</NavLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;