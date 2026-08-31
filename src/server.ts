import { app } from './app';
import dotenv from 'dotenv';
import { testDatabaseConnection } from './config/database';
import './models/associations.model'
import { sequelize } from './config/database';
dotenv.config();

const PORT = Number(process.env.PORT) || 3000


export async function startServer () : Promise <void>{
    await testDatabaseConnection ()

    await sequelize.sync({
        alter : true
    })

    app.listen (PORT, () =>{
    console.log (`Server running on port ${PORT}`);
})

}
startServer()