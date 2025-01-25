"use strict";
const chalk = require("chalk");

class OptionMenu {
  selectOption(dice, str) {
    console.log(chalk.yellow(str));

    dice.forEach((e, i) => {
      console.log(`${i} - [${e.join(", ")}]`);
    });

    console.log("x - Exit");
    console.log("? - Help");
  }
}

module.exports = OptionMenu;
