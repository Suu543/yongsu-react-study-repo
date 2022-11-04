// reducer is just a function
// All reducers have 2 params:
// 1. Current State, usually provide a default state
// 2. Info that came from any action

const seedData = [
  {
    food: "TV Dinners",
    quantity: 10,
  },

  {
    food: "Frozen Veggies",
    quantity: 21,
  },

  {
    food: "Frozen Pizzas",
    quantity: 25,
  },
];

export default (state = seedData, action) => {
  console.log("Frozen Reducer is running!");
  console.log(action);

  if (action.type === "updateFrozen") {
    console.log("I care about this action!");
    // We make a copy of state, because we never ever ever mutate state...
    let newState = [...state];
    if (action.payload.operation === "+") {
      newState[action.payload.index].quantity++;
    } else if (action.payload.operation === "-") {
      newState[action.payload.index].quantity--;
    }
    return newState;
  } else {
    return state;
  }
};

// function frozen(state = [], action) {
//   return state;
// }

// export default frozen;
