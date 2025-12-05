 
import express from 'express'; 
import { BookingsController } from './Bookings.controller';
const router = express.Router();

router.post("/" ,BookingsController.createBooking)
router.get("/", BookingsController.getallBookings);
router.put("/:bookingId",BookingsController.UPdateBooking)

export const BookingsRoute = {
    router
};