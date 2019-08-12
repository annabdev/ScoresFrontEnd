import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import WebFont from 'webfontloader';
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components';

WebFont.load({
  google: {
    families: ['Press Start 2P']
  }
});

const GlobalStyles = createGlobalStyle`
body {
  @import url('https://fonts.google.com/specimen/Press+Start+2P?selection.family=Press+Start+2P');
  font-family: 'Press Start 2P', Roboto;
  color: white;
  font-size: 12px;
}`

const Container = styled.div
  `display: flex;
flex-direction: column;
width: 300px;
padding: 70px 0;
align-items: center;
margin-left: auto;
justify-content: space-around;
border: 2px white groove;
border-radius: 5px;
`
const Scores = styled.div
`
display: flex;
flex-direction: row;
align-items: left;
justify-content: space-around;
`

class TopScores extends Component {
    state = {
       scores: [],
       name: "",
       score: Number
    };

    getGames = async () => {
        return fetch("http://localhost:4000")
        .then(results => {
            return results.json();
        })
        .then(results => {
            console.log(results)
            this.setState( { game:results } );
        });
    };

    filterGames = e => {
        let games = this.state.games;
        games = games.filter(games => {
            return (games) !==1
        });
        this.setState({ game: games.games });
    };

    getScores = async () => {
        return fetch("http://localhost:4000")
        .then(results => {
            return results.json();
        })
        .then(results => {
            console.log(results)
            this.setState( {scores:results} );
        });
    };

    filterScores = e => {
        let scores = this.state.scores;
        scores = scores.filter(scores => {
            return (scores) !==1
        });
        this.setState({ score: scores.scores });
    };

    async componentWillMount() {
        await this.getGames();
    }

    async componentDidMount() {
        await this.getScores();
    }
  render(){
      console.log(this.state);
  return (
    <div>
       <GlobalStyles />
       <Container>
    {this.state.scores.map( (scores, index, game) => (
     <div className="border" key={index}>
         <h2>{scores.game}</h2>
         <Scores>
     <h3>{scores.score}  {scores.name}</h3>
     </Scores>
    

     </div>
            ))}
      <br />
      <Link to="/">Add New Score</Link>
     
        
      </Container>
        </div>
    )}
}

export default TopScores;
