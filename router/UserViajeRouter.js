import express from 'express';
import { getUserViaje,createUserViaje,updateUserViaje,deleteUserViaje} from '../controller/UserViajeController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/users/viaje',verifyToken, getUserViaje);
rotuer.post('/users/viaje',verifyToken, createUserViaje);
rotuer.put('/users/viaje/:id',verifyToken, updateUserViaje);
rotuer.delete('/users/viaje/:id',verifyToken,  deleteUserViaje);


export default rotuer;