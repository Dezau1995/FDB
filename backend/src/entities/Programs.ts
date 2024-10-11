import {
  BaseEntity, Column, Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Programs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  goal!: string;

  @Column()
  description!: string;

  @Column()
  level!: string;

  @Column()
  duration_in_week!: string;
}