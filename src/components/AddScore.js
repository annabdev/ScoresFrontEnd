import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class AddScore extends Component {
    state = {
      name: "",
      score: null
    };
  
  //Post 
  handleSubmit = async e => {
      e.preventDefault();
      const data = JSON.stringify(this.state);
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
      <input type="number" name="Score" onChange={e => this.setState({ score: e.target.value })} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <br />

            <Link to="/topscores">Top Scores</Link>
        </div>
    );
}
}

export default AddScore;