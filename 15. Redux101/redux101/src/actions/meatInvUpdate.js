// This file is an action creator!
/// action creators return actions
// action is an object that has at LEAST a property of type
// this action creator is going to be handed to the dispatch

export default (qChange, index) => {
  return {
    type: "updateMeat",
    payload: {
      qChange,
      index,
    },
  };
};
