"use strict";
const DiceConfigurationTest = require("./DiceConfigurationTest");
//const CliHandler = require("./CliHandler");
const Game = require("./Game");
const chalk = require("chalk");
const crypto = require("crypto");
const readline = require("readline");

function main() {
  let a;

  let args = process.argv.slice(2);

  const game = new Game(args);
  const diceConfig = new DiceConfigurationTest(args);
  //const cli = new CliHandler();
  a = diceConfig.pass_Or_fail_config();

  //return a == null ? game.play() : console.log(a);

  if (a == null) {
    return game.play();
  } else {
    console.log(a);
    return process.exit(0);
  }
}
main();
