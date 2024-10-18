import express from "express";
import cors from "cors";
import { dataSource } from "./config/db";
import exercicesRouter from "./router/exercices/router";
import categoryRouter from "./router/category/router";
import usersRouter from "./router/users/router";

const app = express();
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    exposedHeaders: ["Authorization"],
    origin: process.env.CLIENT_URL|| "http://localhost:3001",
    credentials: true,
  })
);

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/exercices", exercicesRouter);
app.use("/categories", categoryRouter);
app.use("/users", usersRouter);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
})