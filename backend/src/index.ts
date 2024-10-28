import express from "express";
import cors from "cors";
import { dataSource } from "./config/db";
import exercicesRouter from "./router/exercices/router";
import categoryRouter from "./router/category/router";
import usersRouter from "./router/users/router";

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Spécifie l'origine autorisée
  credentials: true, // Permet l'envoi des cookies et des informations d'identification
  allowedHeaders: [
      'accept-language', 
      'accept-encoding', 
      'access-control-request-headers', 
      'x-access-token',
      'Content-Type' // Ajoute ce header si tu envoies des données JSON
  ]
}));

app.use(express.json());

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