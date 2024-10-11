import express from "express";
import cors from "cors";
import { dataSource } from "./config/db";
import exercicesRouter from "./router/exercices/router";
import categoryRouter from "./router/category/router";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/exercices", exercicesRouter);
app.use("/categories", categoryRouter);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
})