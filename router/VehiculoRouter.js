import express from 'express';
import { getVehiculo,getVehiculoId,createVehiculo,updateVehiculo,createUpdatePlaca,createUpdateColor,createUpdateAnio,createUpdateTipo,createUpdateMarca,createUpdateModelo, deleteVehiculo} from '../controller/VehiculoController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/vehiculo', getVehiculo);
rotuer.get('/vehiculo/:id', getVehiculoId);
rotuer.post('/vehiculo', createVehiculo);
rotuer.put('/vehiculo/:id', updateVehiculo);
rotuer.put('/vehiculo/placa/:id',createUpdatePlaca);
rotuer.put('/vehiculo/color/:id',createUpdateColor);
rotuer.put('/vehiculo/marca/:id',createUpdateMarca);
rotuer.put('/vehiculo/modelo/:id',createUpdateModelo);
rotuer.put('/vehiculo/anio/:id',createUpdateAnio);
rotuer.put('/vehiculo/tipo/:id',createUpdateTipo);
rotuer.delete('/vehiculo/:id',  deleteVehiculo);
export default rotuer;