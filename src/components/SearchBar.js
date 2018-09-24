import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const Input = styled.input`
  width: 60%;
  height: 30%;
  font-size: 1rem;
  border: 1px solid #000;
  border-radius: .3rem;
  
  &::placeholder {
    padding-left: 1rem;
  }
`;

const SearchButton = styled.button`
  height: 30%;
  width: 20%;
  border: 1px solid #000;
  border-radius: .3rem;
  background-color: blueviolet;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
`;


class SearchBar extends React.Component {
    state = {
        text: ''
    };

    onChange = e => {
        this.setState({text: e.target.value});
    };
    render() {
        const {getSingle} = this.props;
        return(<Container>
            <Input placeholder = 'Shopify' onChange={this.onChange} />
            <SearchButton onClick={() => getSingle(this.state.text)}>Search</SearchButton>
        </Container>)
    }
};
export default SearchBar;