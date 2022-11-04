// reducer is just a function
// All reducers have 2 params:
// 1. Current State, usually provide a default state
// 2. Info that came from any action

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
  } else if (action.type === "clearInventory") {
    return [];
  } else {
    return state;
  }
};

// function frozen(state = [], action) {
//   return state;
// }

// export default frozen;
