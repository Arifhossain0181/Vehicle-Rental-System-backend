import jwt from 'jsonwebtoken';
import { pool } from '../../config/db';
import bcrypt from 'bcrypt';


;
 export const AuthService = {
    signup: async (payload: any) =>{
        const {name ,email, password,phone,role} = payload;
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await pool.query(`
            INSERT INTO Users (name,email,password,phone,role) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,role`,
        [name ,email.toLowerCase(), hashedPassword,phone,role])
        return result.rows[0];
    },

    signin: async (payload:any) =>{
        const {email,password} = payload;
        const result = await pool.query(`
            SELECT * FROM Users WHERE email= $1`, [email])
            if(result.rowCount===0){
                console.log("Invalid Password")
            }
            const user = result.rows[0];

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            console.log("Invalid Password");
        }  
        if(!process.env.JWT_SECRET){
            console.log("JWT_SECRET is not defined in environment variables");
        }  

        const token = jwt.sign({
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        },process.env.JWT_SECRET as string,{
            expiresIn:'1h'
        }
        
    )
    console.log(' Token generated successfully for user:', user.email);
    console.log(' Token:', token);
    return {
        token,
        user:{
            id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        }
    }

    }
 }