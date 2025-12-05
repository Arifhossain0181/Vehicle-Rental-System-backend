import { pool } from "../../config/db";




const createBooking = async (bookingData: {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status: 'active' | 'cancelled' | 'returned';
}) => {
  // Implementation will go here
  const result = await pool.query(
    `INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      bookingData.customer_id,
      bookingData.vehicle_id,
      bookingData.rent_start_date,
      bookingData.rent_end_date,
      bookingData.total_price,
      bookingData.status
    ]
  );
  return result.rows[0];
};

const getallBookings = async () => {
    const result = await pool.query(`SELECT * FROM Bookings`);
    return result.rows;
}
const UPdateBooking = async (id:string ,customer_id:string, vehicle_id:string,rent_start_date:string,rent_end_date:string,total_price:number,status:'active' | 'cancelled' | 'returned') =>{
    const result = await pool.query(`
        UPDATE Bookings 
        SET customer_id = $1, vehicle_id = $2, rent_start_date = $3, rent_end_date = $4, total_price = $5, status = $6
        WHERE id = $7
        RETURNING *;
    `,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, id as string]
        )
        return result; 
}


export const BookingsService = {
  createBooking,
  getallBookings,
  UPdateBooking
};