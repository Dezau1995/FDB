import {
  BaseEntity,
  Column, Entity,
  JoinTable,
  ManyToMany,
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
  equipement!: string;

  @Column()
  repetitions!: string;

  @Column()
  createdAt!: string;

  @ManyToMany(() => Category)
  @JoinTable()
  category!: Category[]
}