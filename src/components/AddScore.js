import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components';
import '../index.css'
import WebFont from 'webfontloader';

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
}`

const Container = styled.div
  `display: flex;
flex-direction: column;
width: 170px;
padding: 70px 0;
align-items: center;
margin-left: auto;
justify-content: space-around;
text-align: center;
`






class AddScore extends Component {
  state = {
    name: "",
    score: 0,
    game: ""
  };

  //Post 
  handleSubmit = async e => {
    e.preventDefault();
    const data = JSON.stringify(this.state);
    console.log(typeof this.state.score);
    await fetch("http://localhost:4000/", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    console.log(this)
    console.log(this.state)
    return (

      <div>
        <GlobalStyles />
        <Container>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
    <input type="text" name="name" onChange={e => this.setState({ name: e.target.value })} />
            </label>
            <br />
            <br />
            <label>
              Score:
                    <input type="number" name="Score" onChange={e => this.setState({ score: parseInt(e.target.value) })} />
            </label>
            <br />
            <br />
            <label>
              Game:
                <br />
            </label>
            <select onChange={e => this.setState({ game: e.target.value })}>
              <option value="Select Game">Select Game</option>
              <option value="Ms. Pacman">Ms. Pacman</option>
              <option value="Iron Maiden Pinball">Iron Maiden Pinball</option>
              <option value="Skeeball">Skeeball</option>
              <option value="Donkey Kong Jr.">Donkey Kong Jr.</option>
            </select>
            <br />
            <br />
            <input type="submit"
              value="Submit" />


          </form>
          <br />

          <br />

          <Link to="/topscores">Top Scores</Link>
        </Container>
      </div>
    );
  }
}

export default AddScore;