"use strict";
const CliHandler = require("./CliHandler");
const FairRandomGenerator = require("./FairRandomGenerator");
const OptionMenu = require("./OptionMenu");
const chalk = require("chalk");
const DiceConfigurationTest = require("./DiceConfigurationTest");
const TakeHelp = require("./TakeHelp");

class Game {
  constructor(args) {
    this.args = args;
    this.cli = new CliHandler();
    this.fairRand = new FairRandomGenerator();
    this.opMenu = new OptionMenu();
    this.diceConfig = new DiceConfigurationTest(this.args);
    this.help = new TakeHelp();
    //this.userGF = new UserGoesFirst(this.args);
    //this.ComputerGF = new ComputerGoesFirst(this.args);
  }

  async play() {
    const key = this.fairRand.generateKey();
    const computerChoice = this.fairRand.generateRandomValue(2);
    const hmac = this.fairRand.calculateHMAC(key, computerChoice);

    console.log(
      chalk.yellow(
        "Let's determine who makes the first move. I selected a random value in the range 0..1.\n"
      ),
      chalk.blueBright(`(HMAC= ${hmac} )`)
    );

    this.opMenu.selectOption([[0], [1]], "Try to Guess my selection");

    let Choice;
    //let userChoice;
    let arr = this.diceConfig.number_array();
    let arrr = this.diceConfig.number_array();
    let newArr;
    let arrC1;
    let arrC2;
    let thr1;
    let thr2;
    let result1;
    let result2;
    //console.log(arr[]);

    do {
      Choice = await this.cli.ask("Your Selection: ");
      if (Choice.toLowerCase() == "x") {
        console.log(chalk.red("Exiting the game."));
        process.exit(0);
      } else if (Choice == "?") {
        this.help.help_casual();
      }
    } while (!["0", "1"].includes(Choice));

    Choice = parseInt(Choice, 10);
    console.log(chalk.green(`My selection: ${computerChoice} (KEY=${key}).`));

    if (Choice == computerChoice) {
      this.opMenu.selectOption(
        this.diceConfig.number_array(),
        "Choose your dice: "
      );
      do {
        Choice = await this.cli.ask("Your Selection: ");

        if (Choice.toLowerCase() === "x") {
          console.log(chalk.red("Exiting the game."));
          process.exit(0);
        } else if (Choice == "?") {
          this.help.help_probability(arrr);
        }
        //Choice = parseInt(Choice, 10);
        Choice = Number(Choice);
      } while (!(Choice >= 0 && Choice < arr.length));

      console.log(`You choose the [${arr[Choice]}] dice`);
      arrC1 = arr[Choice];
      newArr = arr;
      newArr.splice(Choice, 1);

      const ComCoice = this.fairRand.generateRandomValue(newArr.length);
      const c = newArr[ComCoice];
      arrC2 = c;

      console.log(
        chalk.yellow(`I randomly make my move and choose [${[c]}] dice.\n
It's time for your throw.`)
      );
      const k1 = this.fairRand.generateKey();
      const com1 = this.fairRand.generateRandomValue(6);
      const hmac1 = this.fairRand.calculateHMAC(k1, com1);
      console.log(
        `I selected a random value in the range 0..5 (HMAC=${hmac1})`
      );

      this.opMenu.selectOption(
        [[0], [1], [2], [3], [4], [5]],
        "Add your number modulo 6."
      );

      do {
        Choice = await this.cli.ask("Your Selection: ");

        if (Choice.toLowerCase() === "x") {
          console.log(chalk.red("Exiting the game."));
          process.exit(0);
        } else if (Choice == "?") {
          this.help.help_probability(arrr);
        }
        //Choice = parseInt(Choice, 10);
        Choice = Number(Choice);
      } while (!(Choice >= 0 && Choice <= 5));
      console.log(`My number was ${com1} (KEY= ${k1})`);
      result1 = (com1 + Choice) % 6;
      thr1 = arrC1[result1];

      console.log(`The result is ${com1} + ${Choice} = ${result1} (mod 6).`);
      console.log(`Your throw is ${thr1}`);
      console.log(`It's time for my throw.`);

      const k2 = this.fairRand.generateKey();
      const com2 = this.fairRand.generateRandomValue(6);
      const hmac2 = this.fairRand.calculateHMAC(k2, com2);
      console.log(
        `I selected a random value in the range 0..5 (HMAC=${hmac2})`
      );

      this.opMenu.selectOption(
        [[0], [1], [2], [3], [4], [5]],
        "Add your number modulo 6."
      );

      do {
        Choice = await this.cli.ask("Your Selection: ");

        if (Choice.toLowerCase() === "x") {
          console.log(chalk.red("Exiting the game."));
          process.exit(0);
        } else if (Choice == "?") {
          this.help.help_probability(arrr);
        }
      } while (!(Choice >= 0 && Choice <= 5));
      console.log(`My number was ${com2} (KEY = ${k2})`);
      result2 = (com2 + Choice) % 6;
      thr2 = arrC2[result2];

      console.log(`The result is ${com2} + ${Choice} = ${result2}(mod 6).`);
      console.log(`My throw is ${thr2}`);
      if (thr1 > thr2) {
        console.log(chalk.green(`You win(${thr1} > ${thr2})`));
        process.exit(0);
      } else if (thr1 < thr2) {
        console.log(chalk.red(`You lose(${thr2} > ${thr1})`));
        process.exit(0);
      } else console.log(chalk.yellowBright(`Match Drawn!(${thr2} = ${thr1})`));
      process.exit(0);
    } else {
      const ComCoice = this.fairRand.generateRandomValue(arr.length);
      const c = arr[ComCoice];
      arrC1 = c;

      console.log(
        chalk.yellow(
          `I make the first move and randomly choose[${c}] dice.\n Choose your dice.`
        )
      );

      //arrC1 = arr[Choice];
      newArr = arr;
      newArr.splice(ComCoice, 1);

      this.opMenu.selectOption(newArr, "");
      do {
        Choice = await this.cli.ask("Your Selection: ");

        if (Choice.toLowerCase() === "x") {
          console.log(chalk.red("Exiting the game."));
          process.exit(0);
        } else if (Choice == "?") {
          this.help.help_probability(arrr);
        }
        //Choice = parseInt(Choice, 10);
        Choice = Number(Choice);
      } while (!(Choice >= 0 && Choice < newArr.length));

      console.log(`You choose the[${newArr[Choice]}] dice.`);
      arrC2 = newArr[Choice];
      //newArr = arr;
      //newArr.pop(Choice);
      const k1 = this.fairRand.generateKey();
      const com1 = this.fairRand.generateRandomValue(6);
      const hmac1 = this.fairRand.calculateHMAC(k1, com1);
      console.log(
        `It 's time for my throw. \n I selected a random value in the range 0..5 (HMAC=${hmac1})`
      );

      this.opMenu.selectOption(
        [[0], [1], [2], [3], [4], [5]],
        "Add your number modulo 6."
      );

      do {
        Choice = await this.cli.ask("Your Selection: ");

        if (Choice.toLowerCase() === "x") {
          console.log(chalk.red("Exiting the game."));
          process.exit(0);
        } else if (Choice == "?") {
          this.help.help_probability(arrr);
        }
        //Choice = parseInt(Choice, 10);
        Choice = Number(Choice);
      } while (!(Choice >= 0 && Choice <= 5));
      console.log(`My number was ${com1} (KEY= ${k1})`);
      result1 = (com1 + Choice) % 6;
      thr1 = arrC1[result1];

      console.log(`The result is ${com1} + ${Choice} = ${result1} (mod 6).`);
      console.log(`My throw is ${thr1}`);
      console.log(`It's time for your throw.`);

      const k2 = this.fairRand.generateKey();
      const com2 = this.fairRand.generateRandomValue(6);
      const hmac2 = this.fairRand.calculateHMAC(k2, com2);
      console.log(
        `I selected a random value in the range 0..5 (HMAC=${hmac2})`
      );

      this.opMenu.selectOption(
        [[0], [1], [2], [3], [4], [5]],
        "Add your number modulo 6."
      );

      do {
        Choice = await this.cli.ask("Your Selection: ");

        if (Choice.toLowerCase() === "x") {
          console.log(chalk.red("Exiting the game."));
          process.exit(0);
        } else if (Choice == "?") {
          this.help.help_probability(arrr);
        }
        //Choice = parseInt(Choice, 10);
        Choice = Number(Choice);
      } while (!(Choice >= 0 && Choice <= 5));
      console.log(`My number was ${com2} (KEY= ${k2})`);
      result2 = (com2 + Choice) % 6;
      thr2 = arrC2[result2];

      console.log(`The result is ${com2} + ${Choice} = ${result2} (mod 6).`);
      console.log(`Your throw is ${thr2}`);

      if (thr1 > thr2) {
        console.log(chalk.red(`You lose ( ${thr1} > ${thr2} )`));
        process.exit(0);
      } else if (thr1 < thr2) {
        console.log(chalk.green(`You win ( ${thr2} > ${thr1} )`));
        process.exit(0);
      } else
        console.log(chalk.yellowBright(`Match Drawn! ( ${thr2} = ${thr1} )`));
      process.exit(0);
    }
    return 0;
  }
}

module.exports = Game;
