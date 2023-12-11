import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', {length: 50})
    username!: string;

    @Column('varchar', {length: 150})
    password!: string;

    @Column('varchar', {length: 50})
    email!: string;

    @Column('varchar', {length: 50})
    avatar!: string;

    @Column('varchar', {length: 100})
    website!: string;
}