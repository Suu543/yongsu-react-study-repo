const seedData = [
  {
    food: "Lettuce",
    quantity: 10,
  },

  {
    food: "Turnips",
    quantity: 21,
  },

  {
    food: "Apples",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  console.log("Producer Reducer is running!");

  if (action.type === "updateProduce") {
    const payload = action.payload;
    const newState = [...state];
    newState[payload.index].quantity += payload.qChange;
    return newState;
  } else {
    return state;
  }
};
