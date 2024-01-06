import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Photos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column('varchar', { length: 100})
    uuid!: number;

    @Column('varchar', { length: 50})
    url!: string;
}