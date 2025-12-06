import express from 'express';
import { usercontroller } from './user.controller';
import { auth, authAdmin } from '../../Middleware/auth';


const router = express.Router();

router.get('/',auth,authAdmin,usercontroller.getAllUsers)
router.put('/:id',auth,usercontroller.Updateuser)
router.delete('/:id',auth,usercontroller.deleteuser)

export const userrouter = router;