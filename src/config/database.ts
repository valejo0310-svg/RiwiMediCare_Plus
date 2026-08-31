// Imports the Sequelize class used to configure
// and manage the database connection.
import { Sequelize } from "sequelize";

/**
 * Database configuration values.
 * The values are loaded from environment variables.
 */
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

/**
 * Validates that all required database environment
 * variables are available before creating the connection.
 *
 * If any required value is missing, the application
 * throws an error before attempting to connect.
 */
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

/**
 * Main Sequelize instance.
 *
 * Configures the PostgreSQL connection using the
 * database name, user, password, host, and port
 * provided through environment variables.
 *
 * SQL query logging is disabled to keep the
 * application console output clean.
 */
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
 * Tests the PostgreSQL database connection.
 *
 * Uses `sequelize.authenticate()` to verify that
 * the database credentials and connection settings
 * are valid.
 *
 * @returns A promise that resolves when the connection is successful.
 * @throws An error if Sequelize cannot connect to PostgreSQL.
 */
export async function testDatabaseConnection(): Promise<void> {

    await sequelize.authenticate();

    console.log(
        "Database connected successfully"
    );
}