import {
  BaseEntity,
  Column, Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Exercices extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
  
  @Column()
  description!: string;
  
  @Column()
  difficulty!: String;

  @Column()
  time!: string;

  @Column()
  repetitions!: string;

  @Column()
  createdAt!: string;

  @ManyToOne(() => Category, category => category.exercice)
  category!: Category;
}