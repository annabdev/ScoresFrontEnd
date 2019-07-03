import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class TopScores extends Component {
    state = {
       scores: [],
       name: "",
       score: null
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

    async componentDidMount() {
        await this.getScores();
    }
  render(){
      console.log(this.state);
  return (
    <div>
    {this.state.scores.map( (scores, index) => (
     <div className="border" key={index}>
         
     <h2>{scores.name} : {scores.score}</h2>
     
    

     </div>
            ))}
      <br />
      <Link to="/">Add New Score</Link>
     
        
        
        </div>
    )}
}

export default TopScores;
