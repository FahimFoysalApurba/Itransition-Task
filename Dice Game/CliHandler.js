"use strict";
const readline = require("readline");

class CliHandler {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => resolve(answer));
    });
  }

  close() {
    this.rl.close();
  }
}

module.exports = CliHandler;
