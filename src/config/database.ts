import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost"
const DB_NAME = process.env.DB_NAME
const DB_PORT = Number(process.env.DB_PORT || 5432) 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

export const sequelize = new Sequelize (
    DB_NAME as string,
    DB_USER as string,
    DB_PASSWORD as string,
    {
    host: DB_HOST,
    port : DB_PORT,
    dialect : "postgres",
    logging : false
}
)

export async function testDatabaseConnection () : Promise <void>{

    try{
      
    await sequelize.authenticate ()
    console.log ('The connection was successful')
    }catch (error) {
    console.error(`Ocurrio un error : ${error}`);
    throw error;
}
}
