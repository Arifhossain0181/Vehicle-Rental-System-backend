import { Request, Response } from 'express';
import { VehiclesService } from './Vehicles.service';

const createVehicles = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const result = await VehiclesService.createVehicles(payload);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result
        });
    } catch (error: any) {
        console.error('Create Vehicle Error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || error
        });
    }
};

const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await VehiclesService.getAllVehicles();
        const message = result.length === 0 ? "No vehicles available" : "Vehicles fetched successfully";
        res.status(200).json({
            success: true,
            message,
            data: result
        });
    } catch (error: any) {
        console.error('Get All Vehicles Error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || error
        });
    }
};

const getAllVehiclesId = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const id = Number(vehicleId);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid vehicle ID",
                success: false,
                error: "Vehicle ID must be a positive number"
            });
        }

        const result = await VehiclesService.getAllVehiclesId(id);

        if (!result) {
            return res.status(404).json({
                message: "Vehicle not found",
                success: false
            });
        }

        res.status(200).json({
            message: 'Vehicle fetched successfully',
            data: result,
            success: true
        });
    } catch (error: any) {
        console.error('Get Vehicle By ID Error:', error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message || error
        });
    }
};

const updateVehicles = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const id = Number(vehicleId);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid vehicle ID",
                success: false,
                error: "Vehicle ID must be a positive number"
            });
        }

        const payload = req.body;
        const user = (req as any).user;

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Forbidden, admin only",
                success: false
            });
        }

        const result = await VehiclesService.UPdateVehicles(id, payload);

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
};

const deleteVehicles = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const id = Number(vehicleId);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid vehicle ID",
                success: false,
                error: "Vehicle ID must be a positive number"
            });
        }

        const user = (req as any).user;
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden, admin only"
            });
        }

        const result = await VehiclesService.deleteVehicles(id);

        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
};

export const Vehiclescontroller = {
    createVehicles,
    getAllVehicles,
    getAllVehiclesId,
    updateVehicles,
    deleteVehicles
};
