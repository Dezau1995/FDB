import {
  BaseEntity, Column, Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  descritpion!: string;
}