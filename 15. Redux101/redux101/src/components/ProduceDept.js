import React, { Component } from "react";

// We want this component to know about redux
// to do that, we need some help... or some glue
// the glue is react-redux! We need connect function!
import { connect } from "react-redux";
import updateProduce from "../actions/produceInvUpdate";
import { bindActionCreators } from "redux";

class ProduceDept extends Component {
  increment = (qChange, index) => {
    this.props.updateProduce(qChange, index);
  };

  render() {
    console.log(this.props.produceData);
    const produceInventory = this.props.produceData.map((item, i) => {
      return (
        <div key={i}>
          <li>
            {item.food} : {item.quantity}
          </li>
          <input type="button" onClick={() => this.increment(1, i)} value="+" />
          <input
            type="button"
            onClick={() => this.increment(-1, i)}
            value="-"
          />
        </div>
      );
    });

    return (
      <div>
        <h1>The produce Food Department</h1>
        <ul>{produceInventory}</ul>
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
    produceData: state.produce,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateProduce: updateProduce,
    },
    dispatch
  );
}

// #2
// Connect takes 2 args, the first one is a function that is going to map
// a piece of redux state to this components props
export default connect(mapStateToProps, mapDispatchToProps)(ProduceDept);
