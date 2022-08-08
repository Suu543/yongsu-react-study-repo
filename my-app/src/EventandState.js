import React, { Component } from "react";

class EventAndState extends Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
    };

    this.handleClick = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    console.log("Test!");
  }

  handleChange(e) {
    console.log(e.target);
    this.setState({
      inputText: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted");
    this.setState({
      inputText: "",
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.inputText}</h1>
        <form onSubmit={this.handleSubmit}>
          <button onClick={() => console.log("Test1")} className="btn">
            Click Me!
          </button>
          <button onClick={this.handleClick} className="btn">
            Click Me!
          </button>
          <input
            onChange={this.handleChange}
            placeholder="Enter Some Text!"
            type="text"
          />
        </form>
      </div>
    );
  }
}

export default EventAndState;
