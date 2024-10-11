import {
  BaseEntity,
  Column, Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Exercices } from "./Exercices";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Exercices, (exercice) => exercice.category)
  exercice!: Exercices[];
}