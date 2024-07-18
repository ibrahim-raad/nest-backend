import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    hash: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}