import express from 'express';
import { getVerifyUser,createVerifyUser,updateVerifyUser,deleteVerifyUser} from '../controller/VerifyUserProfileController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();
rotuer.get('/verify/user',verifyToken, getVerifyUser);
rotuer.post('/verify/user', createVerifyUser);
rotuer.put('/verify/user/:id', verifyToken,updateVerifyUser);
rotuer.delete('/verify/user/:id',verifyToken,deleteVerifyUser);


export default rotuer;