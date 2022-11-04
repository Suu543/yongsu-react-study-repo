// reducer is just a function
// All reducers have 2 params:
// 1. Current State, usually provide a default state
// 2. Info that came from any action

const seedData = [
  {
    food: "Chicken Breast",
    quantity: 10,
  },

  {
    food: "Bacon",
    quantity: 21,
  },

  {
    food: "Mahi Mahi",
    quantity: 25,
  },

  {
    food: "Salmon",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  console.log("Meat Reducer is running!");

  if (action.type === "updateMeat") {
    const newState = [...state];
    const payload = action.payload;
    newState[payload.index].quantity += payload.qChange;
    return newState;
  } else {
    return state;
  }
};

// function frozen(state = [], action) {
//   return state;
// }

// export default frozen;
