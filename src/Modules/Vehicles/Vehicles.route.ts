
import express from 'express';
import { Vehiclescontroller } from './Vehicles.controller';

const router = express.Router();

router.post('/',Vehiclescontroller.createVehicles);
router.get('/:vehicleId',Vehiclescontroller.getAllVehicles);
router.put('/:vehicleId',Vehiclescontroller.updateVehicles);
router.delete('/:vehicleId',Vehiclescontroller.deleteVehicles);

export const VehiclesRoute ={
    router
}