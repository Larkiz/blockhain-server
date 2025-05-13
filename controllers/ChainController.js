import { blockchain, wallets } from "../shared/lib/init/initChain.js";

export const ChainController = {
  getWallet: (req, res) => {
    const { token } = req.userData;

    const wallet = wallets.getWallet(token);
    if (wallet) {
      return res.send(wallet);
    }
    return res.status(403).send({ message: "Кошелек не найден" });
  },
  getBlockchain: (req, res) => {
    return res.send(blockchain.chain);
  },
  checkWallet: (req, res) => {
    const { key } = req.body;

    const wallet = wallets.getWalletObj(key);

    if (wallet) {
      return res.send({ access: true, privateKey: key });
    }
    return res.status(403).send({ message: "Кошелек не найден" });
  },
  createWallet: (req, res) => {
    const privateKey = wallets.createWallet();

    return res.send({
      data: privateKey,
      message:
        "Запомните ключ, он используется для доступа к кошельку, восстановить ключ невозможно.",
    });
  },
  checkBlockchainValid: async (req, res) => {
    const status = await blockchain.isValid();

    return res.send(status);
  },
};
