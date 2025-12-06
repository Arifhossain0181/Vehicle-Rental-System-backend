import { Request, Response } from 'express';
import { VehiclesService } from './Vehicles.service';
import { get } from 'http';

const createVehicles = async(req: Request, res: Response) => {
    try{
        const payload = req.body;
        const result = await VehiclesService.createVehicles(payload);
        res.status(201).json({
            success:true,
            message: "Vehicle created successfully", data: result});
    }
    catch(error:any){
        console.error('Create Vehicle Error:', error);
        res.status(500).json({
            success:false,
            message: "Internal Server Error",
            error: error.message || error});
    }

}
const getAllVehicles = async(req: Request, res: Response) => {
    try{  
        const result = await VehiclesService.getAllVehicles();
        const message = result.length ===0 ? "No vehicles is available" :"success";
        res.status(200).json({
            success:true, message: message, data: result});
    }
    catch(error:any){
        console.error('Get All Vehicles Error:', error);
        res.status(500).json({
            success:false,
            message: "Internal Server Error",
            error: error.message || error});
    }

}
const getAllVehiclesId = async (req:Request,res:Response)=>{
     try{
        const {id} = req.params
       const result = await VehiclesService.getAllVehiclesId(Number(id));
       res.status(200).json({
        message: 'vehicle fetched successfully',
        data: result,
        success:true
       })}
     catch(error:any){
        res.status(500).json({
            message:"vehicle fetched is not correct  ",
            success:false,error
        })
     }
}
const updateVehicles = async(req: Request, res: Response) => {
    try{
        const vehicleId = req.params.vehicleId;
        if (!vehicleId) {
            return res.status(400).json({
                message: "Vehicle ID is required",
                success: false
            });
        }
       const payload = req.body;
       const user = (req as any).user;
       if(user.role !=="admin"){
        return res.status(403).json({
            message:"forbidden ,admin only",
            success:false
        })
       }
       const result =await VehiclesService.UPdateVehicles(vehicleId, payload);
       res.status(200).json({
          success: true,
        message: "Vehicle updated successfully", data: result});

    }
    catch(error:any){
        res.status(500).json({
            success: false,
            message: "Internal Server Error", error});
    }
}
const deleteVehicles = async(req: Request, res: Response) => {

    try{
        const {payload} = req.params;
        const result = await VehiclesService.deleteVehicles(Number(payload));
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully", data: result});
    }
    catch(error:any){
        res.status(500).json({
            success: false,
            message: "Internal Server Error", error});

    }   
}

export const Vehiclescontroller ={
    createVehicles, 
    getAllVehicles,
    updateVehicles,
    deleteVehicles,
    getAllVehiclesId
}