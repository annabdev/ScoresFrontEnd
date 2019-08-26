import React, { Component } from 'react';
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
}

h2 {
  font-size: 200%;
  margin-bottom: 30px;
}

table {
  margin: 0 auto;
  border-spacing: 20px 0;
  font-size: 120%;
}
tr td {
  padding: 8px 0;
}
tr td:first-child {
  text-align: right;
  width: 50px;
}
tr td:last-child {
  text-align: left;
  width: 50px;
}`

const Container = styled.div`
width: 37%;
position: absolute;
top: 12%;
right: 100px;
padding: 30px 0;
text-align: center;
background-color: transparent;
`

const Scores = styled.div`
display: flex;
flex-direction: row;
text-align: center;
justify-content: space-evenly;
line-height: .01;
`

let i = ''

class TopScores extends Component {
  state = {
    scores: [],
    name: "",
    score: Number,
    current_display_position: 0
  };

  refresh_interval = 10000

  list_of_games = ['Skeeball', 'Iron Maiden Pinball', 'Donkey Kong Jr.', 'Ms. Pacman']

  getScoresTheFirstTime = async(name) => {
    let encodedName = escape(name)
    return fetch("http://localhost:4000/" + encodedName)
    .then(results => {
      return results.json();
    })
    .then(results => {
      this.setState( { scores: results } )
    })
  }

  getScoresForGame = async (name) => {
    let encodedName = escape(name)

    if(this.state.current_display_position != 0) {
      this.setState((state) => {
        let new_state = 0
        if (state.current_display_position < 3) {
          new_state = state.current_display_position + 1
        } else {
          new_state = 0
        }
        return { current_display_position: new_state }
      })
    } else {
      this.setState((state) => {
        let new_state = 1
        return { current_display_position: new_state }
      })
    }

    return fetch("http://localhost:4000/" + encodedName)
    .then(results => {
      return results.json();
    })
    .then(results => {
      this.setState( { scores: results } )
    })
  }

  async componentDidMount() {
    await this.getScoresTheFirstTime('Skeeball');
    this.setState((state) => {
      let new_state = 1
      return { current_display_position: new_state }
    })
    i = setInterval(() => { 
      this.getScoresForGame(this.list_of_games[this.state.current_display_position])
    }, this.refresh_interval)
  }

  componentWillUnmount() {
    clearInterval(i)
  }

  render() {
    const linkStyles = {
      paddingTop: '20px',
      display: 'block',
      color: '#D9AB40'
    }
    let gameTitle = ''
    if(this.state.scores.length > 0) {
      gameTitle = this.state.scores[0].game
    }
    return (
      <div>
        <video loop={true} autoPlay={true}>
          <source src="../assets/05_DELIVERABLES/_RENDER-BLACK.mp4" type="video/mp4" />
        </video>
        <GlobalStyles />
        <Container>
          <h2>{gameTitle}</h2>

          <table>
            {this.state.scores.map( (scores, index, game) => (
              <tr>
                <td>{scores.score}</td>
                <td>{scores.name}</td>
              </tr>
            ))}
          </table>

         
        </Container>
      </div>
    )
  }
}

export default TopScores;
