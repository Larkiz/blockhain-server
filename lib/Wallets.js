import { blockchain } from "../shared/lib/init/initChain.js";
import { Wallet } from "./Wallet.js";

export class Wallets {
  constructor() {
    this.wallets = [];
  }
  createWallet() {
    const newWallet = new Wallet();
    this.wallets.push(newWallet);

    return {
      privateKey: newWallet.keyPair.getPrivate("hex"),
      publicKey: newWallet.keyPair.getPublic("hex"),
    };
  }
  getWalletObj(privateKey) {
    for (let index = 0; index < this.wallets.length; index++) {
      const wallet = this.wallets[index];
      if (wallet.keyPair.getPrivate("hex") === privateKey) {
        return wallet;
      }
    }
  }
  getWallet(privateKey) {
    for (let index = 0; index < this.wallets.length; index++) {
      const wallet = this.wallets[index];
      if (wallet.keyPair.getPrivate("hex") === privateKey) {
        const walletData = blockchain.getBalance(
          wallet.keyPair.getPublic("hex")
        );

        return {
          publicKey: wallet.wallet,
          privateKey,
          balance: walletData.balance,
          transactions: walletData.transactions,
        };
      }
    }
  }
}
