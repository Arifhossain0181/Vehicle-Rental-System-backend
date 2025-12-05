import { Request, Response } from "express";
import { BookingsService } from "./Bookings.service";

const createBooking = (req: Request, res: Response) => {
  try {
    const result = BookingsService.createBooking(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getallBookings = (req: Request, res: Response) => {
  try {
    const result = BookingsService.getallBookings();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const UPdateBooking = async (req: Request, res: Response) => {
  try {
    const { customer_id, vehicle_id,rent_start_date,rent_end_date,total_price,status} = req.body
    const result = await BookingsService.UPdateBooking(req.params.id as string, customer_id, vehicle_id,rent_start_date,rent_end_date,total_price,status);
    if(!result || result.rows.length ===0){
        res.status(404).json({
        success:false,
        message:"User not found",
      })
    } else{
      return res.status(200).json({
        success:true,
        message:"User updated successfully",
        data:result.rows[0]
      })
    }


  } 
  catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const BookingsController = {
  createBooking,
  getallBookings,
  UPdateBooking
};
