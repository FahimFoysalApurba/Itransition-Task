"use strict";
const ValidationError = require("./ValidationError");

class DiceConfigurationTest {
  constructor(args) {
    this.valErr = new ValidationError();
    this.args = args;
    this.n = null;
  }

  inputProcess() {
    return this.args.map((x) => x.split(","));
  }

  diceNumberTest() {
    return this.args.length >= 3;
  }

  faceNumberTest() {
    this.n = this.inputProcess().map((x) => x.length === 6);
    return !this.n.includes(false);
  }

  isNumberTest() {
    this.n = this.inputProcess().map((x) => x.every((i) => !isNaN(Number(i))));
    return !this.n.includes(false);
  }

  number_array() {
    return this.inputProcess().map((x) => x.map((i) => Number(i)));
  }

  isIntegerTest() {
    this.n = this.number_array().map((i) =>
      i.every((x) => Number.isInteger(x))
    );
    return !this.n.includes(false);
  }

  pass_Or_fail_config() {
    if (!this.diceNumberTest())
      return this.valErr.diceNumberError() + "\n" + this.valErr.exampleString();
    else if (!this.faceNumberTest())
      return this.valErr.faceNumberError() + "\n" + this.valErr.exampleString();
    else if (!this.isNumberTest())
      return this.valErr.notNumberError() + "\n" + this.valErr.exampleString();
    else if (!this.isIntegerTest())
      return this.valErr.notIntegerError() + "\n" + this.valErr.exampleString();
    else return null;
  }
}

module.exports = DiceConfigurationTest;
