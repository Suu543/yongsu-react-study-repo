import { Component } from "react";

class StateInAction extends Component {
  constructor() {
    super();
    console.log("StateInAction constructor");

    this.state = {
      text: "State In Action",
    };

    setTimeout(() => {
      // Bad practice to modify state directly
      // this.state.text = "State In Action - Changed Directly";
      this.setState({
        text: "State In Action - Updated",
      });
    }, 2000);
  }

  render() {
    console.log("StateInAction render");

    return (
      <h1>
        {this.state.text} - {this.props.name}
      </h1>
    );
  }
}

export default StateInAction;
