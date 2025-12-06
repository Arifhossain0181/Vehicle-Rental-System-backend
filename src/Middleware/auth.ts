import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt ,{ JwtPayload } from 'jsonwebtoken';

interface AuthPayload extends JwtPayload {
    id:number,
    name:string,
    role:string
}

 const auth = ()=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            const token = req.headers.authorization;
            if(!token){
                console.log('No token provided in Authorization header');
                return res.status(401).json({message:"Unauthorized",
                    success:false,
                    error:"no token provided"
                })
                return;
            }
            const tokenParts = token.split(" ")
            if(tokenParts.length !==2 || tokenParts[0] !=="Bearer") {
                return res.status(401).json({
                    success:false,
                    message:"Unauthorized",
                    error:"invalid token format"
                });
                return
            }
            const actualTToken= tokenParts[1];
            if(!actualTToken){
                return res.status(401).json({message:"Unauthorized",
                    success:false,
                    error:"token is empty"
                });
                return
            }
            const decoded =jwt.verify(actualTToken,process.env.JWT_SECRET as string) as AuthPayload ;

            (req as any).user= decoded;
            console.log('Token verified successfully for user:', decoded.email);
            next();
        }
        catch(err:any){
            res.status(401).json({message:"Unauthorized",
                success:false
            })
        }

    }
}

 const authAdmin = (req:Request ,res:Response ,next:NextFunction) =>{
    const user = (req as any).user 
    if(user.role !=="admin"){
        return res.status(403).json({
            message:"forbidden ,admin only",
            success:false,
            error:"access denied"
        })
        return;
    }
    console.log("admin access granted to user ",user.email)
    next();
}
export {auth,authAdmin}