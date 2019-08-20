import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import WebFont from 'webfontloader';
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components';
import YouTube from 'react-youtube';


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
.video-iframe {
  width: 100%;
}
h1 {
  text-transform: uppercase;
  font-size: 34px;
  margin-bottom: 40px;
}`

const Container = styled.div`
width: 553px;
height: 580px;
position: absolute;
top: 78px;
right: 76px;
padding: 30px 0;
text-align: center;
background-color: transparent;
overflow: scroll;
`

const Scores = styled.div`
display: flex;
flex-direction: row;
text-align: center;
justify-content: space-around;
overflow: none;
`

class TopScores extends Component {
    state = {
       scores: [],
       name: "",
       score: Number,
       current_display_position: 0,
      //  stuff_to_display: { scores: [] }
    };

    list_of_games = ['Skeeball', 'Iron Maiden Pinball', 'Donkey Kong Jr.', 'Ms. Pacman']

    // uniqueValues(v, i, s) {
    //   return s.indexOf(v) === i
    // }

    // getGames = async () => {
    //     return fetch("http://localhost:4000")
    //     .then(results => {
    //         return results.json();
    //     })
    //     .then(results => {
    //         // console.log(results)
    //         this.setState( { game:results } );
    //     }).then(() => {
    //       // console.log("games")
    //       // console.log(this.state.game)
    //     });
    // };

    // filterGames = e => {
    //     let games = this.state.games;
    //     games = games.filter(games => {
    //         return (games) !==1
    //     });
    //     this.setState({ game: games.games });
    // };

    getScores = async () => {
        return fetch("http://localhost:4000")
        .then(results => {
            return results.json();
        })
        .then(results => {
            // console.log(results)
            this.setState( {scores:results} );
        }).then(() => {
          // console.log("scores")
          // console.log(this.state.scores)
        });
    };

    getScoresForGame = async (name) => {
      let encodedName = escape(name)
      console.log("name is")
      console.log(name)
      return fetch("http://localhost:4000/" + encodedName)
      .then(results => {
        return results.json();
      })
      .then(results => {
        this.setState( { scores: results } )
        console.log(results)
        this.setState((state) => {
          let new_state = 0
          if (state.current_display_position < 3) {
            new_state = state.current_display_position + 1
          } else {
            new_state = 0
          }
          return { current_display_position: new_state }
        })
      })
    }

    // filterScores = e => {
    //     let scores = this.state.scores;
    //     scores = scores.filter(scores => {
    //         return (scores) !==1
    //     });
    //     this.setState({ score: scores.scores });
    //     console.log(this.state.score)
    // };

    // setContentForDisplay = (x) => {
    //   console.log(this.state.current_display_position)
    //   if(this.state.current_display_position == -1) {
    //     this.state.stuff_to_display = {scores: this.state.scores}
    //     this.setState((state) => {
    //       return { current_display_position: state.current_display_position + 1 }
    //     })
    //   } else {
    //     let gamesOnly = []
    //     this.state.stuff_to_display.scores.map((s) => {
    //       gamesOnly.push(s.game)
    //     })
    //     let uniqueGames = [...new Set(gamesOnly)]
    //     console.log('filtered games')
    //     console.log(uniqueGames)
    //     if(this.state.current_display_position == uniqueGames.length) {
    //       this.setState({ current_display_position: -1 })
    //     } else {
    //       this.setState((state) => {
    //         return { current_display_position: state.current_display_position + 1 }
    //       })
    //     }
    //   }
    // }

    // async componentWillMount() {
    //     await this.getGames();
    // }

    async componentDidMount() {
        await this.getScoresForGame('Skeeball');
        setInterval(() => { 
          this.getScoresForGame(this.list_of_games[this.state.current_display_position])
        },5000)
    }

  render(){
      const videoOptions = {
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: "SJ56bboB1xE"
        }}
      // setInterval(() => {
      //   console.log('running again')
      //   this.setContentForDisplay()
      // }, 5000)
  return (
    <div>
        <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId="SJ56bboB1xE"
            opts={videoOptions}
            className="video-iframe"
            onReady={this._onReady}
            onEnd={this._onEnd}
            
          />
        </div>
      </div>
       <GlobalStyles />
       <Container>
         <h1>High Scores</h1>
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
