import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Visible{
    Private = "Private",
    Public = "Public"
}
@Entity()
export class Entries extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', {length: 50})
    title!: string;

    @Column()
    userId!: number;

    @Column("varchar", { length: 1000 })
    description!: string;

    @Column('enum', {enum: Visible, default: Visible.Private}) 
    visible!: Visible;

    @Column("varchar", { length: 100 })
    uuid!: string;
}