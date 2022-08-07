import { Component } from "react";

class StatePractice extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.imageLoad = this.imageLoad.bind(this);
  }

  handleFocus = (event) => {
    this.setState({
      message: "You agree to our terms of service by filling out the form",
    });
  };

  handleEnter = (event) => {
    this.setState({
      message: "",
      imageWidth: "",
    });
  };

  imageLoad = (event) => {
    console.dir(event.target);

    if (event.target.width > 100) {
      console.log("Your Image is large");
    }
  };

  render() {
    return (
      <div>
        <input onFocus={this.handleFocus} type="text" />
        <h3 onMouseEnter={this.handleEnter}>{this.state.message}</h3>
        <img onLoad={this.imageLoad} src="https://picsum.photos/200" />
      </div>
    );
  }
}

export default StatePractice;
