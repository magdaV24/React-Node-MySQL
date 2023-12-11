import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Photos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    entryId!: number;

    @Column('varchar', { length: 50})
    url!: string;
}