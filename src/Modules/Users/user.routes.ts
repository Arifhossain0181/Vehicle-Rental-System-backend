import express from 'express';
import { usercontroller } from './user.controller';
import { auth, authAdmin } from '../../Middleware/auth';
import { authowner } from '../../Middleware/auth'

const router = express.Router();

router.get('/',auth(),authAdmin,usercontroller.getAllUsers)
router.put('/:userId',auth(),authowner,usercontroller.Updateuser)
router.delete('/:userId',auth(),authAdmin,usercontroller.deleteuser)

export const userrouter = router;