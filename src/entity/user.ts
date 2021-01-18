import { Entity, Column, PrimaryGeneratedColumn, Repository } from 'typeorm'

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column({ select: false})
  password: string

  @Column()
  email: string
}

export interface IUserDocument extends Repository<User> {
  id: number;
  name: string,
  password: string,
  email: string,
}