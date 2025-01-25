"use strict";
const crypto = require("crypto");

class FairRandomGenerator {
  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  generateRandomValue(range) {
    const max = Math.floor(256 / range) * range;
    let randomValue;
    do {
      randomValue = crypto.randomInt(0, 256);
    } while (randomValue >= max);
    return randomValue % range;
  }

  calculateHMAC(key, message) {
    return crypto
      .createHmac("sha3-256", key)
      .update(message.toString())
      .digest("hex");
  }
}

module.exports = FairRandomGenerator;
