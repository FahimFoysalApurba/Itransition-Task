"use strict";
const chalk = require("chalk");

class ValidationError {
  exampleString() {
    return chalk.green(`
Must be 3 dices with 6 faces of integer numbers.   
(No alphabet, string, or special character is accepted)
Example input: node Main.js 2,203,4,4,9,9 6,8,1,10,8,6 7,5,3,7,5,3`);
  }

  diceNumberError() {
    return chalk.red(`Please specify at least 3 dice!`);
  }

  faceNumberError() {
    return chalk.red(
      `Wrong number of faces. Every dice must have exactly 6 faces!`
    );
  }

  notNumberError() {
    return chalk.red(
      `Non-numeric input detected. Every dice must contain only comma-separated numbers!`
    );
  }

  notIntegerError() {
    return chalk.red(`Non-integer input detected. Numbers must be integers.`);
  }
}

module.exports = ValidationError;
