import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, any>) => {
  const {
    id,
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
        INSERT INTO Vehicles (id,vehicle_name,type,registration_number,daily_rent_price,availability_status)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *;
    `,
    [
      id,
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
        
        SELECT * FROM Vehicles RETURNING *
    `);
  return result.rows;
};
const UPdateVehicles = async (payload: Record<string, any>) => {
  const {
    id,
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
        UPDATE Vehicles
        SET vehicle_name=$2, type=$3, registration_number=$4, daily_rent_price=$5, availability_status=$6
        WHERE id=$1
        RETURNING *;
    `,
    [
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
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
  deleteVehicles
};
