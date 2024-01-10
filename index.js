
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import rotuerTypeUsers from './router/TypeUsersRouter.js';
import  routerUser from './router/UserRouter.js';
import  routerVerifyUserProfile from './router/VerifyUserProfileRouter.js';
import  routerVerificationType from './router/VerificationTypeRouter.js';
import  routerPermission from './router/permissionRouter.js';
import  routerUserPermission from './router/UserPermissionRouter.js';
import  routerProvince from './router/ProvinceRouter.js';
import  routerCanton from './router/CantonRouter.js';
import  routerVehiculo from './router/VehiculoRouter.js';
import  routerDatosPersonales from './router/datosPersonalesRouter.js';
import  routerTiposDocumentos from './router/TiposDocumentosRouter.js';
import  routerVeriDocumentosPersonales from './router/VeriDocumentosPersonalesRouter.js';
import  routerDocumentos from './router/DocumentosRouter.js';
import  routerPreferenciasviaje from './router/PreferenciasviajeRouter.js';
import  routerPreferenciasdatosP from './router/PreferenciasDatosPersonalesRouter.js';
import  routerMarca from './router/MarcaRouter.js';
import  routerMadelo from './router/ModeloRouter.js';
import  routerTipoVehiculo from './router/TipoVehiculoRouter.js';
import  routerColor from './router/ColorRouter.js';

import { sequelize } from "./db/conexion.js";

const _PORT = PORT || 3000;
const app = express();
import path from 'path';
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/api', rotuerTypeUsers);
app.use('/api', routerUser);
app.use('/api', routerVerifyUserProfile);
app.use('/api', routerVerificationType);
app.use('/api', routerPermission);
app.use('/api', routerUserPermission);
app.use('/api', routerProvince);
app.use('/api', routerCanton);
app.use('/api', routerVehiculo);
app.use('/api', routerDatosPersonales);
app.use('/api', routerTiposDocumentos);
app.use('/api', routerVeriDocumentosPersonales);
app.use('/api', routerDocumentos);
app.use('/api', routerPreferenciasviaje);
app.use('/api', routerPreferenciasdatosP);
app.use('/api', routerMarca);
app.use('/api', routerMadelo);
app.use('/api', routerTipoVehiculo);
app.use('/api', routerColor);

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticRoute = path.join(__dirname, 'uploads/imagenes/usuario');
app.use('/imagenes', express.static(staticRoute));

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ force: false })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

