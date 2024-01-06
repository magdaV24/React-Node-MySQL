import dotenv from 'dotenv'
import { DataSource } from 'typeorm';
import { Users } from '../entities/Users';
import { Photos } from '../entities/Photos';
import { Entries } from '../entities/Entries';

dotenv.config();

const database = new DataSource({
    type: 'mysql',
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    port: 3306,
    logging: true,
    synchronize: false,
    entities: [Users, Entries, Photos]
})

export default database;