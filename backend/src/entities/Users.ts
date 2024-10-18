import { 
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Exercices } from './Exercices';
import { IsEmail, Length } from 'class-validator';

enum Role {
  ADMIN = "admin",
  CLIENT = "client"
}

@Entity()
export class Users extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(2, 50)
  firstname!: string;

  @Column()
  @Length(2, 50)
  lastname!: string;

  @Column({unique: true})
  @IsEmail()
  email!: string;

  @Column()
  password?: string;

  @Column()
  picture!: string;

  @Column('simple-array')
  role!: Role[];

  @ManyToMany(() => Exercices)
  @JoinTable()
  exercice!: Exercices[]; 
}