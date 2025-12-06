
import express from 'express';
import { Authcontroller } from './auth.controller';
const router = express.Router() 

router.post('/signup',Authcontroller.signup);
router.post('/signin',Authcontroller.signin);

export const authrouter = router;