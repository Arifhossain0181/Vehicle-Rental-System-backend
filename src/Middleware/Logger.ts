 import {Request, Response, NextFunction} from 'express';

 const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} ${req.url} at ${new Date().toISOString()} BODY: ${JSON.stringify(req.body)}`);
    next();

 }
    export default logger;