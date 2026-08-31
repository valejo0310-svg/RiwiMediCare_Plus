"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const database_1 = require("./config/database");
require("./models/associations.model");
const PORT = Number(process.env.PORT) || 3000;
/*
|--------------------------------------------------------------------------
| HTTP SERVER
|--------------------------------------------------------------------------
*/
app_1.app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
});
/*
|--------------------------------------------------------------------------
| DATABASE
|--------------------------------------------------------------------------
*/
async function initializeDatabase() {
    try {
        await (0, database_1.testDatabaseConnection)();
        await database_1.sequelize.sync();
        console.log("Database synchronized successfully");
    }
    catch (error) {
        console.error("Database error:", error);
    }
}
initializeDatabase();
