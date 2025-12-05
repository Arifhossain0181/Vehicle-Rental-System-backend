import { Request, Response } from 'express';
import { VehiclesService } from './Vehicles.service';
import { get } from 'http';

const createVehicles = async(req: Request, res: Response) => {
    try{
        const payload = req.body;
        const result = await VehiclesService.createVehicles(payload);
        res.status(201).json({message: "Vehicle created successfully", data: result});
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error", error});
    }

}
const getAllVehicles = async(req: Request, res: Response) => {
    try{  
        const result = await VehiclesService.getAllVehicles();
        res.status(200).json({message: "Vehicles retrieved successfully", data: result});
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error", error});
    }

}
const updateVehicles = async(req: Request, res: Response) => {
    try{
       const payload = req.body;
       const result =await VehiclesService.UPdateVehicles(payload);
       res.status(200).json({message: "Vehicle updated successfully", data: result});

    }
    catch(error){
        res.status(500).json({message: "Internal Server Error", error});
    }
}
const deleteVehicles = async(req: Request, res: Response) => {

    try{
        const {id} = req.params;
        const result = await VehiclesService.deleteVehicles(Number(id));
        res.status(200).json({message: "Vehicle deleted successfully", data: result});
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error", error});

    }   
}

export const Vehiclescontroller ={
    createVehicles, 
    getAllVehicles,
    updateVehicles,
    deleteVehicles
}