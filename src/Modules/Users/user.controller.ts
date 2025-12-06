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
        const target = req.params.usreId
        const loggedin = (req as any).user;
        const {id} = req.params
        if(loggedin.role ==='customer' && loggedin.id !== target){
            return res.status(403).json({
                message:"forbidden ,you can update only your account",
                success:false
            })
        }
        if(loggedin.role ==='admin' && loggedin.id === target){
            return res.status(403).json({
                message:"forbidden ,admin cant update his account",
                success:false
            })
        }
       const result = await userservice.Updateuser(target as string ,req.body)
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


export const usercontroller = {
    getAllUsers,
    Updateuser,
    deleteuser
}

