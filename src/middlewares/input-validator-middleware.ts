import {Request, Response, NextFunction} from "express";

const inputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // here we make validation. Also here we can transform returned object (for example to satisfy the Swagger API)
  next()
}