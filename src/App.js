import React, { Component } from "react";
import "./App.css";
import Controller from "./Controller.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Character Alignment Quiz!</h1>
        </header>
        <Controller />
      </div>
    );
  }
}

export default App;
