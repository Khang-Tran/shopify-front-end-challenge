import React from 'react';
import styled from 'styled-components';
import SearchBar from "./SearchBar";
import ProjectList from "./ProjectList";

const Container = styled.div`
  grid-column: 1/ span 1;
  grid-row: 2/ span 1; 
  width: 90%;
  height: 90%;
   align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
`;

const RepoContainer = ({repos, add, getSingle}) => (
    <Container>
        <SearchBar getSingle={getSingle}/>
        <ProjectList add={add} repos={repos}/>
    </Container>
);

export default RepoContainer;