import { createSha256 } from "../shared/utils/createSha.js";
import { elliptic } from "../shared/utils/elliptic.js";

export class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now();
    this.signature = null;
  }

  sign(keyPair) {
    if (keyPair.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot sign transactions for other wallets!");
    }

    const hashTx = this.calculateHash();

    this.signature = keyPair.sign(hashTx, "base64").toDER("hex");
  }

  calculateHash() {
    return createSha256(
      this.fromAddress + this.toAddress + this.amount + this.timestamp
    ).toString();
  }

  isValid() {
    // Награда за майнинг не требует подписи
    if (this.fromAddress === null) return true;

    if (!this.signature) {
      throw new Error("No signature in this transaction");
    }

    const publicKey = elliptic.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
