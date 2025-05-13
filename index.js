import express from "express";

import cors from "cors";
import { chainRouter } from "./routes/chain.routes.js";

import { Server } from "socket.io";
import { createServer } from "http";
import { ChainSocketController } from "./controllers/ChainSocketController.js";
import { users, wallets } from "./shared/lib/init/initChain.js";

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  for (let index = 0; index < wallets.wallets.length; index++) {
    const wallet = wallets.wallets[index];

    if (wallet.keyPair.getPrivate("hex") === socket.handshake.auth.token) {
      users.setUser(wallet.keyPair.getPublic("hex"), socket.id);
      socket.emit("connection", { access: true });
      break;
    }

    if (
      index === wallets.wallets.length - 1 &&
      wallet.keyPair.getPrivate("hex") !== socket.handshake.auth.token
    ) {
      socket.emit("disconnection", { access: false });

      socket.disconnect();
      break;
    }
  }
  socket.on("mine", (data) => {
    return ChainSocketController.mine(
      (mess) => socket.emit("mineResponse", mess),
      data
    );
  });

  socket.on("transaction", (data) => {
    return ChainSocketController.createTransaction(
      (mess) => socket.emit("transactionResponse", mess),
      (socketId, message) =>
        io.to(socketId).emit("transactionResponse", message),
      { ...data, socketId: socket.id }
    );
  });
});

app.use("/api", [express.json()], chainRouter);

app.listen(3000);
httpServer.listen(3001);
