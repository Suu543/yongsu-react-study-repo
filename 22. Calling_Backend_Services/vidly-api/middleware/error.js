const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.info(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  // res.status(500).send("Something Failed");
  res.status(500).send(err);
};
