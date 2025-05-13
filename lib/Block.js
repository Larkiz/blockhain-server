import { createSha256 } from "../shared/utils/createSha.js";

export class Block {
  constructor(timestamp, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = [];
    this.previousHash = previousHash;
    this.hash = "";
    this.rewardMultiplier = 0;
    this.nonce = 0;
  }

  calculateHash(nonce = this.nonce) {
    return createSha256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        nonce +
        this.rewardMultiplier
    ).toString();
  }

  mineByClick(difficulty, clicks) {
    let nonce = 0;

    for (let index = 0; index < clicks; index++) {
      const hash = this.calculateHash(nonce);
      nonce += 1;

      if (this.isValidHash(hash, difficulty)) {
        this.rewardMultiplier += 1;
        this.hash = hash;

        this.nonce = nonce;
      }
    }
  }
  isValidHash(hash, difficulty) {
    return hash.startsWith("0".repeat(difficulty));
  }

  addTransaction(transaction) {
    if (!transaction.isValid()) {
      throw new Error("Cannot add invalid transaction");
    }
    this.transactions.push(transaction);
    this.hash = this.calculateHash();
  }

  hasValidTransactions() {
    return this.transactions.every((tx) => tx.isValid());
  }
}
