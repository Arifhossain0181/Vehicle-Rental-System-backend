import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, any>) => {
  const {
   
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
        INSERT INTO Vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;
    `,
    [
     
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result.rows[0];
};

const getAllVehicles = async () => {
  const result = await pool.query(`
        
        SELECT * FROM Vehicles ORDER BY id;
    `);
  return result.rows;
};
const getAllVehiclesId = async (id: Number)=>{
  const result = await pool.query(`
    SELECT * FROM Vehicles WHERE id= $1;
    
    `,[id])
    if(result.rowCount === 0){
      console.log("vehicle not found")
    }    
  return result.rows[0];
}
const UPdateVehicles = async (id: string, payload: Record<string, any>) => {
  const {
    
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
        UPDATE Vehicles
        SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5
        WHERE id=$6
        RETURNING *;
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id
    ]
  );

  return result.rows[0];
};
const deleteVehicles = async (id: number) => {
    const result = await pool.query(`
         DELETE FROM Vehicles WHERE id=$1 RETURNING *;
    `,[id]);
    return result.rows[0];
}

export const VehiclesService = {
  createVehicles,
  getAllVehicles,
  UPdateVehicles,
  deleteVehicles,
  getAllVehiclesId
};
