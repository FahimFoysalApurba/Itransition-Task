"use strict";
const { table } = require("table");

class TakeHelp {
  help_casual() {
    console.log(
      "Make a choice from the given list, and You can exit entering x."
    );
  }
  help_probability(dicesets) {
    let d = dicesets;
    //console.log(d);

    function calculateProbability(dice1, dice2) {
      let winCount = 0;
      let totalCount = dice1.length * dice2.length;

      for (const roll1 of dice1) {
        for (const roll2 of dice2) {
          if (roll1 > roll2) winCount++;
        }
      }

      return winCount / totalCount;
    }

    function displayProbabilityTable(d) {
      const numSets = d.length;

      const headers = ["User dice v", ...d.map((set) => set.join(","))];
      const rows = [];

      d.forEach((set1, index1) => {
        const row = [set1.join(",")];

        d.forEach((set2, index2) => {
          if (index1 === index2) {
            // Self-match
            row.push("- (1.0000)");
          } else {
            const probability = calculateProbability(set1, set2).toFixed(4);
            row.push(probability);
          }
        });

        rows.push(row);
      });

      const data = [headers, ...rows];

      const config = {
        columnDefault: {
          width: 15,
        },
        drawHorizontalLine: (index, size) =>
          index === 0 || index === 1 || index === size,
      };

      // Display game rules before the table
      console.log("Probability of the win for the user:");
      console.log(table(data, config));
    }

    displayProbabilityTable(d);
  }
}

module.exports = TakeHelp;
