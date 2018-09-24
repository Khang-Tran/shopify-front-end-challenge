import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1/ span 2;
  grid-row: 1/ span 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blueviolet;
`;

const Heading = styled.h1`
  color: #fff;
`;

const Header = () => (
    <Container>
        <Heading>My Github Favorites</Heading>
    </Container>
);

export default Header;