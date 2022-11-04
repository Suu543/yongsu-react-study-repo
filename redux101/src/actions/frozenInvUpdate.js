export default (operation, index) => {
  console.log(`Frozen Inventory Update: ${operation}, ${index}`);

  return {
    type: "updateFrozen",
    payload: {
      operation,
      index,
    },
  };
};
