import React, { Component } from 'react';

class SelGame extends Component {
  state = {
    games: [],
    selectedGame: "",
    validationError: ""
  }

  componentDidMount() {
    fetch("http://localhost:4000")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let gamesFromApi = data.map(game => { return {
        value: game, display: game} })
        this.setState({ teams: [{value: '', display: '(Select Game)'}]
        .concat(gamesFromApi)});
    }).catch(error => {
      console.log(error);
    });
  }

   render() {
    return (
      <div>
        <select value={this.state.selectedGame} 
                onChange={(e) => this.setState({selectedGame: e.target.value, validationError: e.target.value === "" ? "You must select your game" : ""})}>
          {this.state.games.map((game) => <option key={game.value} value={game.value}>{game.display}</option>)}
        </select>
        <div style={{color: 'red', marginTop: '5px'}}>
          {this.state.validationError}
        </div>
      </div>
    )
  }
}

export default SelGame;