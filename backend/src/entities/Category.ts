import {
  BaseEntity,
  Column, Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Exercices } from "./Exercices";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Exercices, (exercice) => exercice.category)
  exercice!: Exercices[];
}