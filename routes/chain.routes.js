import { Router } from "express";
import { ChainController } from "../controllers/ChainController.js";
import { Access } from "../middlewares/Access.js";

const chainRouter = new Router();

chainRouter.get("/getWallet", [Access], ChainController.getWallet);
chainRouter.get("/blockchain", ChainController.getBlockchain);
chainRouter.get("/checkBlockchainValid", ChainController.checkBlockchainValid);
chainRouter.post("/createWallet", ChainController.createWallet);
chainRouter.post("/checkWallet", ChainController.checkWallet);

export { chainRouter };
