import React from 'react';
import styled from 'styled-components';
import Header from "./Header";
import RepoContainer from "./RepoContainer";
import FavoriteContainer from "./FavoriteContainer";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 5fr; 
`;


class GithubFavorites extends React.Component {
    state = {
        clientId: '0ef3f898b7b85ff9918f',
        clientSecret: '53855ed975f804e788f95af2c2228cc04e51f02f',
        count: 10,
        sort: 'created: desc',
        repos: [],
        favoriteRepos: [],
        loading: true
    };

    listAllRepos = () => {
        const {count, sort, clientId, clientSecret} = this.state;
        fetch(`https://api.github.com/users/${this.username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(repos => {
                let newRepos = [];
                repos.map(repo => {
                    fetch(`https://api.github.com/repos/${this.username}/${repo.name}/releases?client_id=${clientId}&client_secret=${clientSecret}`)
                        .then(res => res.json())
                        .then(release => {
                            newRepos.push({
                                id: repo.id,
                                name: repo.full_name,
                                language: repo.language,
                                tag: release.length > 0 ? release[0].tag_name : '',
                                isFavorite: false
                            });
                            if (newRepos.length === this.state.count)
                                this.setState({repos: newRepos});

                        });
                });

                this.setState({loading: false});
            })
            .catch(err => console.log(err))
    };

    componentDidMount() {
        this.username = 'khang-tran';
        this.listAllRepos();
    };

    getOneRepo = name => {
        const {clientId, clientSecret} = this.state;

        fetch(`https://api.github.com/repos/${this.username}/${name}?client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(repo => {
                let newRepos = [];
                console.log(repo);
                fetch(`https://api.github.com/repos/${this.username}/${name}/releases?client_id=${clientId}&client_secret=${clientSecret}`)
                    .then(res => res.json())
                    .then(release => {
                        newRepos.push({
                            id: repo.id,
                            name: repo.full_name,
                            language: repo.language,
                            tag: release.length > 0 ? release[0].tag_name : '',
                            isFavorite: false
                        });
                        this.setState({repos: newRepos});
                    })
            });

    };

    addToFavoriteRepos = repo => {
        const {repos, favoriteRepos} = this.state;
        const match = repos.find(o => o.id === repo.id);
        match.isFavorite = true;
        this.setState({repos});


        favoriteRepos.push(repo);
        this.setState({favoriteRepos});
    };

    removeFromFavoriteRepos = repo => {
        const {repos, favoriteRepos} = this.state;
        const match = repos.find(o => o.id === repo.id);
        match.isFavorite = false;
        this.setState({repos});

        const index = favoriteRepos.findIndex(o => o.id === repo.id);
        favoriteRepos.splice(index, 1);
        this.setState({favoriteRepos});
    };

    render() {
        const {repos, favoriteRepos, loading} = this.state;
        return (
            loading ? <div>Loading</div> :
                <Container>
                    <Header/>
                    <RepoContainer getSingle={this.getOneRepo} repos={repos} add={this.addToFavoriteRepos}/>
                    <FavoriteContainer remove={this.removeFromFavoriteRepos} repos={favoriteRepos}/>
                </Container>
        );
    }
}

export default GithubFavorites;