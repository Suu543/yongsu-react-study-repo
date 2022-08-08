import React, { Component } from "react";

class SimpleEvents extends Component {
  constructor() {
    super();
  }

  handleClick() {
    console.log("Test!");
  }

  handleChange() {
    console.log("User Changed the input!!");
  }

  handleSubmit(e) {
      console.log("Form Submitted");
      e.preventDefault();
  }

  render() {
    // Old School
    // document.querySelector(".btn").addEventListener("click", () => {
    //   console.log("Button was clicked!");
    // });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button onClick={() => console.log("Test1")} className="btn">
            Click Me!
          </button>
          <button onClick={this.handleClick} className="btn">
            Click Me!
          </button>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Some Text!"
          />
        </form>
      </div>
    );
  }
}

export default SimpleEvents;
