import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import * as bitflyerController from "./controllers/bitflyer";
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get("/markets", bitflyerController.markets);
// app.get("/board", board);
// app.get("/ticker", ticker);
// app.get("/executions", executions);
// app.get("/boardstate", boardstate);
// app.get("/health", health);
// app.get("/chats", chats);

export default app;
