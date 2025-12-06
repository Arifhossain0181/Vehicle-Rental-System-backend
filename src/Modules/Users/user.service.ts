import bcrypt from "bcrypt";
import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT id, name, email, phone, role FROM Users`);
  return result.rows;
};

const Updateuser = async (
     usreId: string,
     updatedData:{
        name?:string,
        email?:string,
         password?:string,
        phone?:string,
        role?:string
     }
) => {
    const fileds:string[] = [];
    const values:any[] = [];
    if(updatedData.name){
        fileds.push(`name= $${fileds.length +1}`);
        values.push(updatedData.name);}
     if(updatedData.email){
        fileds.push(`eamil = $${fileds.length +1}`)
        values.push(updatedData.email)
     }   
     if(updatedData.phone){
        fileds.push(`Phone = $${fileds.length +1} `)
        values.push(updatedData.phone)
     }
    
    if(updatedData.password){
        updatedData.password = await bcrypt.hash(updatedData.password,10)
        fileds.push(`Password = $${fileds.length +1}` )
        values.push(updatedData.password)

    }
    if(updatedData.role){
        fileds.push(`role =$${fileds.length +1}`)
        values.push(updatedData.role);
    }
    if(fileds.length ===0){
        return await pool.query(`SELECT id,name,email,phone,role FROM Users WHERE id=$1`,[usreId])
      
    }
   
    values.push(usreId);
    const query = `UPDATE Users SET ${fileds.join(", ")} WHERE id=$${fileds.length + 1} RETURNING id, name, email, phone, role`;
    const updated = await pool.query(query, values);
    return updated.rows[0];
}

const deletuser = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM Users WHERE id=$1 RETURNING *;
    `,
    [id]
  );
  return result.rows[0];
};

export const userservice = {
  getAllUsers,
  Updateuser,
  deletuser,
};
