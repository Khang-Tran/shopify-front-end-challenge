import React from 'react';
import styled from 'styled-components';
import ProjectList from "./ProjectList";

const Container = styled.div`
   grid-row: 2/ span 1;
   grid-column: 2/span 1;
    width: 90%;
  height: 90%;
   align-self: center;
  justify-self: center;
  display: grid;
`;

const FavoriteContainer = ({repos, remove}) => (
    <Container>
        <ProjectList remove={remove} repos={repos}/>
    </Container>
);

export default FavoriteContainer;