import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <h1>Figth!!!</h1>
        {user ? (
          <button onClick={this.logout}>Log Out</button>
        ) : (
          <button onClick={this.login}>Log In</button>
        )}
        {user ? (
          <div>
            <div className="user-profile">
              <img alt="asd" src={user.photoURL} />
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <p>
              You must be logged in to see the potluck list and submit to it.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
