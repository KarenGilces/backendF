import express from 'express';
import { getVerificationType,createVerificationType,updateVerificationType,deleteVerificationType} from '../controller/VerificationTypeController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/type/verify',verifyToken, getVerificationType);
rotuer.post('/type/verify', createVerificationType);
rotuer.put('/type/verify/:id',verifyToken, updateVerificationType);
rotuer.delete('/type/verify/:id',verifyToken,  deleteVerificationType);


export default rotuer;