export default (qChange, index) => {
  console.log(`Meat Inventory Update: ${qChange}, ${index}`);

  return {
    type: "updateMeat",
    payload: {
      qChange,
      index,
    },
  };
};
