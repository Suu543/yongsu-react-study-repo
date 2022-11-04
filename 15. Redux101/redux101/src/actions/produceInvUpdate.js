// This file is an action creator!
/// action creators return actions
// action is an object that has at LEAST a property of type
// this action creator is going to be handed to the dispatch

export default (qChange, index) => {
  console.log("Updating produce inventory!!!");
  return {
    type: "updateProduce",
    payload: {
      qChange,
      index,
    },
  };
};
