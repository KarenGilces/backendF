import express from 'express';
import { getPreferenciasDatosPersonales,createPreferenciasDatosPersonales,
    updatePreferenciasDatosPersonales,deletePreferenciasDatosPersonales} 
from '../controller/PreferenciasDatosPersonalesController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/preferenciasdatosP',  getPreferenciasDatosPersonales);
rotuer.post('/preferenciasdatosP',verifyToken,  createPreferenciasDatosPersonales);
rotuer.put('/preferenciasdatosP/:id',verifyToken, updatePreferenciasDatosPersonales);
rotuer.delete('/preferenciasdatosP/:id',verifyToken,   deletePreferenciasDatosPersonales);


export default rotuer;