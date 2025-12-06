import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const signup =async(req:Request,res:Response)=>{
   try{
     const payload = req.body;
     const result = await AuthService.signup(payload);
     res.status(201).json({
        message:"user registerd successfully "
     })
   }
   catch(err){
    res.status(500).json({message:"Internal Server Error"})
   }
}

const signin = async (req:Request ,res:Response)=>{
    try{
        const payload = req.body;
        const result = await AuthService.signin(payload);
        res.status(200).json({
            message:"user Signed in successfully",
            data: result
        })

    }
    catch(err){
        res.status(500).json({
            message:"internal server error "
        })
    }
}
export const Authcontroller ={
    signup,signin
}