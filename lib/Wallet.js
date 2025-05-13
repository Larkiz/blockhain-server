import { blockchain, wallets } from "../shared/lib/init/initChain.js";
import { elliptic } from "../shared/utils/elliptic.js";
import { Transaction } from "./Transaction.js";

export class Wallet {
  constructor() {
    this.keyPair = elliptic.genKeyPair();
    this.wallet = this.keyPair.getPublic("hex");
  }

  createTransaction(toAddress, amount) {
    amount = Number(amount);
    try {
      let currentSenderBalance = blockchain.getBalance(this.wallet).balance;
      let currentAcceptingBalance = blockchain.getBalance(toAddress).balance;

      if (amount > currentSenderBalance) {
        throw new Error("Недостаточно средств");
      }

      const tx = new Transaction(this.wallet, toAddress, amount);
      tx.sign(this.keyPair);
      blockchain.addTransactionToLatestBlock(tx);

      return {
        currentSenderBalance: currentSenderBalance - amount,
        currentAcceptingBalance: currentAcceptingBalance + amount,
        tx,
      };
    } catch (err) {
      return { status: 422, message: err.message };
    }
  }
}
