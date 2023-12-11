import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ArtWorks extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', {length: 50})
    title!: string;

    @Column('varchar', { length: 50})
    creator!: string;

    @Column("varchar", { length: 1000 })
    description!: string;

    @Column('varchar', { length: 10})
    visible!: string;
}