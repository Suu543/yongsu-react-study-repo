// Object Literals
const name = "yongsu";
const age = 26;
const job = "unemployed";

const prop = "idiotJH";

const x = {
  name,
  age,
  job,
  [prop]: "hello",
};

console.log(x);

// Destructuring and Spread Operator
const abilities = ["flying", "fireball", "teleport"];

// Spread Operator
const dataFromApi = {
  name: "Thanos",
  age: 2,
  job: "Super-Villian",
  abilities: ["Strength", ...abilities, "immortal", "destruction"],
};

// Destructuring
const { name, age, job } = dataFromApi;

console.log(dataFromApi);

// Spread Operator
const x = {
  name: "Yongsu",
};

const b = {
  ...x,
};

const a = x;
a.name = "Jeong";

console.log(x);
console.log(b);
console.log(a);
