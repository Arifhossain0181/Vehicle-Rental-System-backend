import { Request,Response } from "express";
import { userservice } from "./user.service";

const  getAllUsers = async (req:Request,res:Response) => {
    try{
        const result = await userservice.getAllUsers();
        res.status(200).json({
            message:true,
            success:true,
            data:result
        });
    }
    catch (error) {
        res.status(500).json
        ({message:false,
            success:false,
            error})
      ;
    }
}

const Updateuser = async (req:Request,res:Response) => {
    try{
        const userId = req.params.userId
        const loggedin = (req as any).user;
    
        if(loggedin.role ==='customer' && loggedin.id != userId){
            return res.status(403).json({
                message:"forbidden ,you can update only your account",
                success:false
            })
        }
        if(loggedin.role ==='admin' && loggedin.id == userId){
            return res.status(403).json({
                message:"forbidden ,admin cant update his account",
                success:false
            })
        }
       const result = await userservice.Updateuser(userId as string ,req.body)
        res.status(200).json({
            message:true,
            success:true,
            data:result
        });
    }
    catch (error) {
        res.status(500).json
        ({message:false,
            success:false,
            error})
      ;
    }
}

const deleteuser = async (req:Request,res:Response) => {
    try{
        const {id} = req.params;
        const result = await userservice.deletuser(id as string);
        res.status(200).json({
            message:"user deleted",
            success:true,
            data:result
        });
    }
    catch (error:any) {
        if(error.message ==='active bookings'){
            return res.status(400).json({
                message:"cannot delete user with active bookings",
                success:false,  })
        }
        res.status(500).json
        ({message:false,
            success:false,
            error})
      ;
    }
}


export const usercontroller = {
    getAllUsers,
    Updateuser,
    deleteuser,
  
}

