import { blockchain, users, wallets } from "../shared/lib/init/initChain.js";

export const ChainSocketController = {
  mine: (emit, data) => {
    const publicKey = data?.publicKey || null;
    const clicks = data?.clicks || 0;

    if (!publicKey) {
      return emit({ message: "Не указан кошелек" });
    }
    if (!clicks || clicks < 1) {
      return emit({
        message: "Не допустимое количество кликов",
      });
    }
    const newBlock = blockchain.mineEmptyBlock(publicKey, clicks);

    if (newBlock?.transactions) {
      emit({ ...newBlock.transactions[0], opType: "Награда" });
    }
  },

  createTransaction: (emit, sendToAcceptor, data) => {
    const { privateKey, address, amount } = data;
    if (!privateKey || !address || !amount) {
      return emit({ message: "Недействительная транзакция" });
    }
    const wallet = wallets.getWalletObj(privateKey);

    if (wallet) {
      const tx = wallet.createTransaction(address, amount);
      if (tx.status === 422) {
        return emit({ message: tx.message });
      }

      emit({
        newBalance: tx.currentSenderBalance,
        amount,
        transaction: { ...tx.tx, opType: "Отп-но" },
      });

      return sendToAcceptor(users.getId(address), {
        newBalance: tx.currentAcceptingBalance,
        amount,
        transaction: { ...tx.tx, opType: "Полу-но" },
      });
    }
    return emit({ message: "Не существующий кошелек" });
  },
};
