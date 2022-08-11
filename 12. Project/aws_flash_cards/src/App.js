import React, { Component } from "react";
import "./App.css";

// Components
import QuizBar from "./components/QuizBar";
import FlashCard from "./components/FlashCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cardStyle: "Random",
      ready: false,
    };
  }

  userChoice = (cardStyle) => {
    this.setState({
      cardStyle,
      ready: false,
    });
  };

  nowReady = () => {
    this.setState({
      ready: true,
    });
  };

  render() {
    return (
      <div className="App align-items-center d-flex">
        <div className="container">
          <QuizBar userChoice={this.userChoice} />
          <FlashCard
            ready={this.state.ready}
            nowReady={this.nowReady}
            cardStyle={this.state.cardStyle}
          />
        </div>
      </div>
    );
  }
}

export default App;
