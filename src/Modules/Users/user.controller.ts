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
        const {id} = req.params;
        const result = await userservice.Updateuser(
            id as string,
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.phone,
            req.body.role
        );
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

