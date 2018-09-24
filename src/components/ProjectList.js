import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  height: 90%;
`;

const Table = styled.table`
   width: 100%;
`;

const ProjectList = ({repos, add, remove}) => {
    const renderProjecItems = () => {
        return repos.map(repo =>
            <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.language}</td>
                <td>{repo.tag === '' ? '-': `v_${repo.tag}`}</td>
                {add !== undefined ?
                    <td>{!repo.isFavorite ? <a href='#' onClick={() => add(repo)}>Add</a>: ' '}</td>
                    :<td>{repo.isFavorite ? <a href='#' onClick={() => remove(repo)}>Remove</a>: ' '}</td>
                }
            </tr>
        )
    };
        return(
            <Container>
                <Table cellSpacing='15'>
                    <thead>
                    <tr>
                    <th>Name</th>
                        <th>Language</th>
                        <th>Latest tag</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderProjecItems()}
                    </tbody>
                </Table>
            </Container>
        );
    }

export default ProjectList;