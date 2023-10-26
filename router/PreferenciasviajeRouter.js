import express from 'express';
import { getPreferenciasviaje,createPreferenciasviaje,
    updatePreferenciasviaje,deletePreferenciasviaje} 
from '../controller/PreferenciasviajeController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/preferenciasviaje', getPreferenciasviaje);
rotuer.post('/preferenciasviaje',createPreferenciasviaje);
rotuer.put('/preferenciasviaje/:id', updatePreferenciasviaje);
rotuer.delete('/preferenciasviaje/:id', deletePreferenciasviaje);


export default rotuer;