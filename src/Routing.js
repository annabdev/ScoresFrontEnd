import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddScore from './components/AddScore'
import TopScores from './components/TopScores'


function Routing() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={AddScore} />
          <Route path="/topscores" component={TopScores} />
        </div>
      </Router>
    );
  }
  export default Routing;