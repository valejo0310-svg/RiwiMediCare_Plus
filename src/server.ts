import "dotenv/config";

import { app } from "./app";
import {
    sequelize,
    testDatabaseConnection
} from "./config/database";

import "./models/associations.model";

const PORT = Number(process.env.PORT) || 3000;


/*
|--------------------------------------------------------------------------
| HTTP SERVER
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

    console.log(
        `Health: http://localhost:${PORT}/api/health`
    );
});


/*
|--------------------------------------------------------------------------
| DATABASE
|--------------------------------------------------------------------------
*/

async function initializeDatabase(): Promise<void> {

    try {

        await testDatabaseConnection();

        await sequelize.sync();

        console.log(
            "Database synchronized successfully"
        );

    } catch (error) {

        console.error(
            "Database error:",
            error
        );
    }
}


initializeDatabase();