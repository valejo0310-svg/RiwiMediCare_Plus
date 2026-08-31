import { app } from './app';
import dotenv from 'dotenv';
import { testDatabaseConnection } from './config/database';
import './models/associations.model'
import { sequelize } from './config/database';
dotenv.config();

const PORT = Number(process.env.PORT) || 3000


export async function startServer () : Promise <void>{
    try {
        await testDatabaseConnection();
        await sequelize.sync({ alter: false });
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error}`);
        process.exit(1);
    }
}

startServer().catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
});