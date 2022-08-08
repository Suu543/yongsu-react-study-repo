import React, { Component } from "react";

class StateInAction extends Component {
  constructor() {
    super();
    this.state = {
      text: "State In Action",
    };

    setTimeout(() => {
      this.setState({
        text: "State Changed",
      });
    }, 2000);

    // setTimeout(function () {
    //   this.setState({
    //     text: "State Changed",
    //   });
    // }, 2000);
  }

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

export default StateInAction;
