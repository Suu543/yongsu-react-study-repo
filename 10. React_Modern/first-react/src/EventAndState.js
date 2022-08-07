import { Component } from "react";

class EventAndState extends Component {
  constructor() {
    console.log("EventAndState constructor");
    super();
    this.state = {
      inputText: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    console.log("Btn Click!");
  }

  handleChange(e) {
    console.log("Input Changed!");
    this.setState({
      inputText: e.target.value,
    });
  }

  handleSubmit(e) {
    console.log("Form Submitted!");
    e.preventDefault();
  }

  render() {
    console.log("EventAndState render");
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

export default EventAndState;
