import bcrypt from "bcrypt";
import { pool } from "../../config/db";



const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM Users`);
    return result.rows;
}



 const Updateuser = async (id:string ,name:string ,email:string ,password:string ,phone:string,role:string) => {
    const result = await pool.query(`
    UPDATE Users 
    SET name=$2, email=$3, password=$4, phone=$5, role=$6
    WHERE id=$1
    RETURNING *;
    `,[id,name,email,password,phone,role]);
    return result.rows[0];
 }
 


 const deletuser = async (id:string) => {
    const result = await pool.query(`
        DELETE FROM Users WHERE id=$1 RETURNING *;
    `,[id]);
    return result.rows[0];

 }

export const userservice = {
    getAllUsers, 
    Updateuser,
    deletuser
}