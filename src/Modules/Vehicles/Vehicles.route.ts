
import express from 'express';
import { Vehiclescontroller } from './Vehicles.controller';
import { auth, authAdmin } from '../../Middleware/auth';

const router = express.Router();

router.post('/', auth(), authAdmin, Vehiclescontroller.createVehicles);
router.get('/', Vehiclescontroller.getAllVehicles);
router.get('/:vehicleId', auth(), Vehiclescontroller.getAllVehiclesId);
router.put('/:vehicleId', auth(), authAdmin, Vehiclescontroller.updateVehicles);
router.delete('/:vehicleId', auth(), authAdmin, Vehiclescontroller.deleteVehicles);

export const VehiclesRoute ={
    router
}