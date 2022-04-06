import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next();
  // if (req.query.token === "123") {
  //   next();
  // }else {
  //   res.sendStatus(401)
  // }
}
