import { DataSource } from "typeorm";
import { Exercices } from "../entities/Exercices";
import { Category } from "../entities/Category";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [Exercices, Category],
  synchronize: true,
})