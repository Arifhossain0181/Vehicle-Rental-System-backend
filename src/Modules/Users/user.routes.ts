import express from 'express';
import { usercontroller } from './user.controller';


const router = express.Router();

router.get('/',usercontroller.getAllUsers)
router.put('/:id',usercontroller.Updateuser)
router.delete('/:id',usercontroller.deleteuser)

export const userrouter = router;