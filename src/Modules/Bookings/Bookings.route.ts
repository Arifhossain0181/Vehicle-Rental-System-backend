 
import express from 'express'; 
import { BookingsController } from './Bookings.controller';
import { auth } from '../../Middleware/auth';
const router = express.Router();

router.post("/",auth("admin","customer"), BookingsController.createBooking)
router.get("/",auth("admin","customer"), BookingsController.getallBookings);
router.put("/:bookingId",auth("admin", "customer"), BookingsController.UPdateBooking)

export const BookingsRoute = {
  router,
};