import { DataSource } from "typeorm";
import { Logs } from "./entities/logs.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'hack',
    entities: [Logs],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
  });
  
 
  
  export default dataSource;