// Loads environment variables from the .env file
// before initializing the application.
import "dotenv/config";

// Imports the configured Express application.
import { app } from "./app";

// Imports the Sequelize instance and the function
// used to verify the database connection.
import {
    sequelize,
    testDatabaseConnection
} from "./config/database";

// Imports the model associations so they are registered
// before the database synchronization process.
import "./models/associations.model";

// Defines the HTTP server port using the environment
// variable or port 3000 as the default value.
const PORT = Number(process.env.PORT) || 3000;


/*
|--------------------------------------------------------------------------
| HTTP SERVER
|--------------------------------------------------------------------------
*/

/**
 * Starts the Express HTTP server.
 *
 * The application listens on the configured port
 * and displays the main server and health endpoint
 * URLs in the console.
 */
app.listen(PORT, () => {

    // Displays the main server URL.
    console.log(
        `Server running on http://localhost:${PORT}`
    );

    // Displays the API health endpoint URL.
    console.log(
        `Health: http://localhost:${PORT}/api/health`
    );
});


/*
|--------------------------------------------------------------------------
| DATABASE
|--------------------------------------------------------------------------
*/

/**
 * Initializes the database connection.
 *
 * First verifies that PostgreSQL is accessible,
 * then synchronizes the Sequelize models with
 * the database schema.
 *
 * Any connection or synchronization error is
 * captured and displayed in the console.
 *
 * @returns A promise that resolves when the database initialization finishes.
 */
async function initializeDatabase(): Promise<void> {

    try {

        // Verifies that the application can
        // successfully connect to PostgreSQL.
        await testDatabaseConnection();

        // Synchronizes the Sequelize models
        // with the database schema.
        await sequelize.sync({ force: true});

        // Confirms successful database synchronization.
        console.log(
            "Database synchronized successfully"
        );

    } catch (error) {

        // Logs any database connection or
        // synchronization error.
        console.error(
            "Database error:",
            error
        );
    }
}


/**
 * Starts the database initialization process
 * when the application server is executed.
 */
initializeDatabase();