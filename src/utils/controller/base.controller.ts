import { NextFunction, Request, Response } from "express";
import { handleControllerError } from "../errors/handle-error";

export abstract class BaseController {
    protected handle = (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handler(req, res, next)
            } catch (error) {
                handleControllerError(error, res)
            }
        }
    }
}