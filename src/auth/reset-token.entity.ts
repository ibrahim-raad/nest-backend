import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResetToken {
@PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column('int')
  userId: string;

  @CreateDateColumn()
  expiryDate: Date;
}