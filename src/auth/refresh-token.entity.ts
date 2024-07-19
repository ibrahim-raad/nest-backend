import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column('int')
  userId: string;

  @CreateDateColumn()
  expiryDate: Date;
}
