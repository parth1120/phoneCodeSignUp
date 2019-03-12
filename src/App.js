import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Signup from "./components/signup/Signup";

class App extends Component {
  render() {
    return (
        <Router>
          <Fragment>
              <Route path="/" exact component={Signup}/>
          </Fragment>
        </Router>
    );
  }
}

export default App;
