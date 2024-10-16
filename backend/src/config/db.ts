import { DataSource } from "typeorm";
import { Exercices } from "../entities/Exercices";
import { Category } from "../entities/Category";
import { Users } from "../entities/Users";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [
    Exercices, 
    Category,
    Users,
  ],
  synchronize: true,
})