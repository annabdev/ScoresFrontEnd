import React, { Component } from 'react';



class DeleteScore extends Component {
    state = {
       scores: [],
       name: "",
       score: "",
       game: ""
    };


    //Delete
    handleDelete = async _id => {
        await fetch("http://localhost:4000/" + _id, {
            method: "DELETE"
        });
        await this.getScores();
    };

    //Get "Read"
    getScores = async () => {
        return fetch("http://localhost:4000/")
        .then(results => {
            return results.json();
        })
        .then(results => {
            console.log("l",results)
            this.setState( {scores:results});
        });
    };
    filterScores = e => {
        let score = this.state.score;
        score = score.filter(score => {
            return (score) !==1
        });
        this.setState({ score: score.score });
    };

    async componentDidMount() {
        await this.getScores();
    }
  render(){
      return (
          <div>
              {this.state.score.map( (score, index) => (
                <div key={index}>
                    <p>{score.name}</p>
                    <p>{score.score}</p>
                    
                    <button type="button"
     onClick={() => this.handleDelete(score._id)}
     >Delete</button>
                </div>  
              ))}
          </div>
      )
  
}}

export default DeleteScore;
