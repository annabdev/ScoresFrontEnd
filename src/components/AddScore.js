import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoBackground from './VideoBackground';
import '../index.css'
import SelGame from './SelGame.js';





class AddScore extends Component {
    state = {
      name: "",
      score: 0
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
  
    render(){
      console.log(this)
      console.log(this.state)
    return (
       
        <div>
      <VideoBackground />
            Please enter your information here
      <br />
      
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
    <input type="text" name="name" onChange={e => this.setState({ name: e.target.value })} />
                </label>
                <br />
                <label>
                    Score:
                    <input type="number" name="Score" onChange={e => this.setState({ score: parseInt(e.target.value) })} />
                </label>
                <br />
                <label>
                Game:
                </label>
                <SelGame />
  <input type = "submit"
    value = "Submit"/>
     {/* onclick = "changeColor()"  */}
    
</form>
       <br />
            <Link to="/topscores">Top Scores</Link>
        </div>
    );
}
}

export default AddScore;