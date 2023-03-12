
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import routeDatos from './router/datos.js';
import rotuerTypeUsers from './router/TypeUsersRouter.js';
import  routerUser from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";
//import { UserModel } from './models/user.js';

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routeDatos);
app.use('/api', rotuerTypeUsers);
app.use('/api', routerUser);
const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ force: true })
       // await UserModel.sync({ force: true })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

