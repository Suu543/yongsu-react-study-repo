import React, { Component } from "react";

// We want this component to know about redux
// to do that, we need some help... or some glue
// the glue is react-redux! We need connect function!
import { connect } from "react-redux";
import updateFrozen from "../actions/frozenInvUpdate";
import { bindActionCreators } from "redux";

class FrozenDept extends Component {
  // increment = (operation, index) => {
  //   if (operation === "+") {
  //     console.log(updateFrozen());
  //   } else if (operation === "-") {
  //   }
  // };

  increment = (operation, index) => {
    this.props.updateFrozen(operation, index);
  };

  render() {
    console.log(this.props.meatData);
    const frozenInventory = this.props.frozenData.map((item, i) => {
      return (
        <div key={i}>
          <li>
            {item.food} : {item.quantity}
          </li>
          <input
            className="add-button"
            type="button"
            onClick={() => {
              this.increment("+", i);
            }}
            value="+"
          />
          <input
            className="subtract-button"
            type="button"
            onClick={() => {
              this.increment("-", i);
            }}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The Frozen Food Department</h1>
        <ul>{frozenInventory}</ul>
      </div>
    );
  }
}

console.log(connect);
// mapStateToPROPS takes 1 args, "state" and that is the rootReducer/state
// #1
function mapStateToProps(state) {
  // mapStateToProps returns an object, with:
  // property is the local prop name to this component
  // value will be the property in the root reducer... ie, a piece of the store
  return {
    frozenData: state.frozen,
  };
}

// mapDispatchToProps is how we tie our component to the dispatch
// It takes 1 args: dispatch
function mapDispatchToProps(dispatch) {
  // this function returns, bindActionCreators
  // and we hand bindActionCreators an object:
  // each property will be a local prop
  // each value will be a function that is dispatch when run
  // 2nd arg or bindActionCreators is the dispatch
  return bindActionCreators(
    {
      updateFrozen: updateFrozen,
    },
    dispatch
  );
}

// #2
// Connect takes 2 args, the first one is a function that is going to map
// a piece of redux state to this components props
// 2nd arg to connect: misDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(FrozenDept);
