const winston = require("winston");
const mongoose = require("mongoose");
const Fawn = require("fawn");
require("dotenv").config();

mongoose.set("strictQuery", false);

module.exports = function () {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connected to MongoDB..."));
  // winston promise rejection에 의해 처리됩니다.
  // .catch((err) => winston.error("Could not connect to MongoDB..."));

  Fawn.init(process.env.DB);
};
