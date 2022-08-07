import { Component } from "react";

class StateInAction extends Component {
  constructor(props) {
    console.log("constructor State In Action");
    super();

    this.state = {
      text: "State In Action",
    };

    setTimeout(() => {
      this.setState({ text: "State In Action - Updated" });
    }, 2000);
  }

  render() {
    console.log("Render State In Action");

    return <h1>{this.state.text}</h1>;
  }
}

export default StateInAction;
