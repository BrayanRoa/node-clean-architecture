
// src/utils/middlewares/validate.ts

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { HttpResponse } from "../http/response.helper";
// import { JwtAdapter } from "../jwt/jwt";


export class BaseMiddleware {

    validateDto(dtoClass: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const dtoObject = plainToInstance(dtoClass, req.body);
            const errors = await validate(dtoObject);

            if (errors.length > 0) {
                const messages = errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));
                return res.status(400).json({ errors: messages });
            }

            // valid -> attach parsed dto to request
            req.body = dtoObject;
            next();
        };
    }

    // async validarJwt(req: Request, res: Response, next: NextFunction) {
    //     const authorization = req.header("Authorization");
    //     if (!authorization) return HttpResponse.unauthorized(`there are no token on the request`);

    //     if (!authorization.startsWith("Bearer ")) return HttpResponse.unauthorized(`invalid Bearer token`);

    //     const token = authorization.split(" ")[1] || ""

    //     try {
    //         const payload = await JwtAdapter.decodeToken<{ id: string }>(token);
    //         if (!payload) return HttpResponse.unauthorized(`Token invalid - Contact the administrator`);

    //         const user = await this.prisma.user.findFirst({
    //             where: {
    //                 id: payload.id
    //             }
    //         })
    //         if (!user) return HttpResponse.unauthorized(`Token invalid - Contact the administrator`);

    //         req.body.email_user = user.email;
    //         next();

    //     } catch (error: any) {
    //         HttpResponse.unauthorized(error)
    //     }
    // }

}