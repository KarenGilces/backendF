import express from 'express';
import { getVehiculo,getVehiculoId,createVehiculo,updateVehiculo,deleteVehiculo} from '../controller/VehiculoController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/vehiculo',verifyToken, getVehiculo);
rotuer.get('/vehiculo/:id', getVehiculoId);
rotuer.post('/vehiculo', createVehiculo);
rotuer.put('/vehiculo/:id', updateVehiculo);
rotuer.delete('/vehiculo/:id',  deleteVehiculo);
export default rotuer;