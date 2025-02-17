import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
require("dotenv").config();
app.use(router);

app.listen(process.env.port || 4000, function () {
  console.log(`server is running ! ${process.env.port} `);
});
