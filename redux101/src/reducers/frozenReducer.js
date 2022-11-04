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
    console.log("Action Type: UpdateFrozen");

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
