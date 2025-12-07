import { Pool } from "pg";
import { pool } from "../../config/db";




const createBooking = async (bookingData: {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
  total_price?: number;
  status?: 'active' | 'cancelled' | 'returned';
}) => {
  // Implementation will go here
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = bookingData;

  // check if vehicle is available
  const vehicle = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [vehicle_id]);
  if(vehicle.rowCount === 0){
    throw new Error("Vehicle not found");
  }
  if(vehicle.rows[0].availability_status !== 'available'){
    throw new Error('Vehicle is not available');
  }
  // calculation duration (days)
  const start = new Date(rent_start_date)
  const end = new Date(rent_end_date)

  if(end <= start){
    throw new Error("Invalid date range");
  }

  const duration_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    
  )
// calculate total price   

   const calculated_total_price = duration_days * Number(vehicle.rows[0].daily_rent_price)

  const result = await pool.query(
    `INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      calculated_total_price,
      'active'
    ]
  );
  // update vehicle status to 'booked'
  await pool.query(`UPDATE Vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicle_id]);
  return result.rows[0];
};

const getallBookings = async (role:string , userId:number) => {
  try{
    if(role === 'admin'){
 const result = await pool.query(`SELECT * FROM Bookings`);
    return result.rows;
  }
  if(role === 'customer'){
    const result = await pool.query(`SELECT * FROM Bookings WHERE customer_id = $1`, [userId]);
    return result.rows;
  }
  }
  catch(error){
    return error 
  }
   
}
const UPdateBooking = async(bookingId:string,status:'active' | 'cancelled' | 'returned' ,role:string ,usreId:string) =>{
   
     const bookingres  = await pool.query(`SELECT * FROM Bookings Where id = $1`, [bookingId])
     const booking = bookingres.rows[0];
     if(!booking){
      console.log("booking not found ")
     }
     // role based access 

     if(role ==='customer'){
      if(booking.customer_id !== Number(usreId)){
        console.log("its not your booking")
      }
      if(new Date() >= new Date(booking.rent_start_date)){
        console.log("cannot cancel booking after start date")
      }
      if(status !== 'cancelled'){
        console.log("customer can only cancle this")
      }

     }
     if(role === 'admin'){
      if(status === 'returned'){
        console.log("admin can returned")
      }
      await pool.query(`UPDATE Vehicles SET availability_status = 'available' WHERE id = $1`, [booking.vehicle_id]);
      
     }
     const  result = await pool.query(`
      UPDATE Bookings SET status=$1 WHERE id =$2 RETURNING *;`,[status,bookingId])

        return result; 
}


export const BookingsService = {
  createBooking,
  getallBookings,
  UPdateBooking
};