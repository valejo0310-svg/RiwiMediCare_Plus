import { Sequelize } from "sequelize";

const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (
    !DB_HOST ||
    !DB_PORT ||
    !DB_NAME ||
    !DB_USER ||
    !DB_PASSWORD
) {
    throw new Error(
        "Database environment variables are missing"
    );
}

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: "postgres",

        logging: false
    }
);


/**
 * Tests the PostgreSQL connection.
 */
export async function testDatabaseConnection(): Promise<void> {

    await sequelize.authenticate();

    console.log(
        "Database connected successfully"
    );
}