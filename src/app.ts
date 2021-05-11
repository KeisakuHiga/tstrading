import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get("/", (_, res) => {
  res.send("test!");
});

module.exports = app;
