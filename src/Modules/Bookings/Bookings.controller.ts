import { Request, Response } from "express";
import { BookingsService } from "./Bookings.service";

const createBooking = (req: Request, res: Response) => {
  try {
    const result = BookingsService.createBooking(req.body);
    res.status(201).json({
      message:"booking created successfully ",
      data:result 
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getallBookings = async (req: Request, res: Response) => {
  try {
    const role = (req as any ).user.role
    const userId = (req as any).user.id;
    
    const result = await BookingsService.getallBookings(role,userId);
    res.status(200).json({
      message: "Bookings retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const UPdateBooking = async (req: Request, res: Response) => {
  try {
    const {status} = req.body;
    const bookingid = req.params.bookingId;
    const user = (req as any ).user;
   const result = await BookingsService.UPdateBooking(bookingid as string ,status ,user.role ,String (user.id) );
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
