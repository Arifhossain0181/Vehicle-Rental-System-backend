import { Request, Response, NextFunction } from "express";
import jwt ,{ JwtPayload } from 'jsonwebtoken';

interface AuthPayload extends JwtPayload {
    id:number,
    name:string,
    email:string,
    role: "admin" | "customer"
}
// Extend Request to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: AuthPayload;
  }
}
if (!process.env.JWT_SECRET) {
  console.error(" FATAL ERROR: JWT_SECRET not set in environment variables");
  process.exit(1);
}

 const auth = (...role:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            const token = req.headers.authorization;
            if(!token){
                console.log(' No token provided in Authorization header');
                return res.status(401).json({message:"Unauthorized",
                    success:false,
                    error:"no token provided"
                })
            }
            const [tokenParts ,tokens] = token.split(" ")
            if(tokenParts !=="Bearer" || !tokens){
                return res.status(401).json({
                    success:false,
                    message:"Unauthorized",
                    error:"invalid token format"
                });
            }
            const actualTToken = tokens;
            const decoded =jwt.verify(actualTToken,process.env.JWT_SECRET as string) as AuthPayload ;

            (req as any).user= decoded;
            console.log(' Token verified successfully for user:', decoded.email);
            if(role.length && !role.includes(decoded.role)){
                return res.status(403).json({
                    message:"forbidden ,you dont have access to this resource", })
            }       
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
    if(req.user?.role !=="admin"){
        return res.status(403).json({
            message:"forbidden ,admin only",
            success:false,
            error:"access denied"
        })
    }
    console.log(" Admin access granted to user:", user.email)
    next();
}
const authowner = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const loggedUser = req.user;
    const targetId = Number(req.params.id);

    // Admin bypass
    if (loggedUser.role === "admin") return next();

    // User can only access their own account
    if (loggedUser.id === targetId) return next();

    return res.status(403).json({
      success: false,
      message: "Forbidden – You can access only your own account",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }}
export {auth,authAdmin,authowner}