import { Component } from "react";

class SimpleEvents extends Component {
  constructor() {
    super();

    this.state = {
      inputText: {},
      inputSecond: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    console.log("Btn Click!");
  }

  handleChange(e) {
    console.log("Input Changed!");
    this.setState({ inputText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted!");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button onClick={this.handleClick}>Click Me</button>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Your Name"
          />
        </form>
      </div>
    );
  }
}

export default SimpleEvents;
