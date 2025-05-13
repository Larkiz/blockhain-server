import { Block } from "./Block.js";
import { Transaction } from "./Transaction.js";

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.miningReward = 10;
  }

  createGenesisBlock() {
    const genesis = new Block(Date.now());
    genesis.hash = genesis.calculateHash();
    return genesis;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineEmptyBlock(minerAddress, clicks) {
    if (clicks > 0) {
      const newBlock = new Block(Date.now(), this.getLatestBlock().hash);

      newBlock.mineByClick(this.difficulty, clicks * 5);

      if (newBlock.isValidHash(newBlock.hash, this.difficulty)) {
        const rewardTx = new Transaction(
          null,
          minerAddress,
          this.miningReward * newBlock.rewardMultiplier
        );
        newBlock.addTransaction(rewardTx);

        this.chain.push(newBlock);

        return newBlock;
      }
    }
  }

  addTransactionToLatestBlock(tx) {
    const block = this.getLatestBlock();
    block.addTransaction(tx);
    return block;
  }

  getBalance(publicKey) {
    let balance = 0;
    let transactions = [];
    for (let index = 0; index < this.chain.length; index++) {
      const block = this.chain[index];

      for (let txIndex = 0; txIndex < block.transactions.length; txIndex++) {
        const tx = block.transactions[txIndex];
        if (tx.fromAddress === publicKey) balance -= tx.amount;
        if (tx.toAddress === publicKey) balance += tx.amount;
        if (tx.toAddress === publicKey || tx.fromAddress === publicKey) {
          const opType =
            tx.fromAddress === null
              ? "Награда"
              : tx.fromAddress === publicKey
              ? "Отп-но"
              : tx.toAddress === publicKey
              ? "Полу-но"
              : "Неизвестно";
          transactions = [{ ...tx, opType }, ...transactions];
        }
      }
    }
    return { balance, transactions };
  }

  async isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!block.hasValidTransactions()) return false;
      if (block.hash !== block.calculateHash()) return false;
      if (block.previousHash !== previousBlock.hash) return false;
    }
    return true;
  }
}
