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
    console.log("Action Type: UpdateMeat");
    const newState = [...state];
    const payload = action.payload;
    newState[payload.index].quantity += payload.qChange;
  } else {
    return state;
  }
};
