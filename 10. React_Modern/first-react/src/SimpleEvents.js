import { Component } from "react";

class SimpleEvents extends Component {
  constructor() {
    super();
  }

  handleClick() {
    console.log("Btn Click!");
  }

  handleChange() {
    console.log("Input Changed!");
  }

  handleSubmit(e) {
    console.log("Form Submitted!");
    e.preventDefault();
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
