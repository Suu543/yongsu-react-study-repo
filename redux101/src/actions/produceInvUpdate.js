export default (qChange, index) => {
  console.log(`Produce Inventory Update: ${qChange}, ${index}`);

  return {
    type: "updateProduce",
    payload: {
      qChange,
      index,
    },
  };
};
