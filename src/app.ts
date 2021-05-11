/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get("/", (_, res) => {
  res.send("The sedulous hyena ate the antelope!");
});
app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}!`);
});
