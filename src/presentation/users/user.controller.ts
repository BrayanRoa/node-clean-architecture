import { injectable } from "inversify";
import { TYPES } from "../../infrastructure/container/types.container";
import { inject } from "inversify";
import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/users/CreateUser.UseCase";
import { AllUserUseCase } from "../../application/use-cases/users/AllUsers.UseCase";
import { GetOneUserUseCase } from "../../application/use-cases/users/GetOne.UseCase";
import { HttpResponse } from "../../utils/http/response.helper";
import { FieldAlreadyExistsError } from "../../utils/errors/field-exists.error";
import { NotFoundError } from "../../utils/errors/not-found.error";

@injectable()
export class UserController {

    constructor(
        @inject(TYPES.CreateUserUseCase)
        private readonly create: CreateUserUseCase,

        @inject(TYPES.AllUsersUseCase)
        private readonly allUsers: AllUserUseCase,

        @inject(TYPES.GetOneUserUseCase)
        private readonly getOne: GetOneUserUseCase
    ) { }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.create.execute(req.body);
            res.status(201).json(HttpResponse.ok(user, "user created successfully"))
        } catch (error: any) {
            if (error instanceof FieldAlreadyExistsError) {
                res.status(400).json(HttpResponse.badRequest(error.message))
            }

            res.status(500).json(HttpResponse.error("Error interno del servidor", 500, error.message));
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const users = await this.allUsers.execute()
            res.status(200).json(HttpResponse.ok(users, "All users"))
        } catch (error: any) {
            res.status(400).json(HttpResponse.badRequest(`${error.message}`));
            console.log(error)
        }
    }

    public async getOneById(req: Request, res: Response) {
        try {
            const id = req.params.id
            const user = await this.getOne.execute(id)
            res.status(200).json(HttpResponse.ok(user, ""))
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                res.status(404).json(HttpResponse.notFound(error.message))
            }
            res.status(500).json(HttpResponse.error("Error interno del servidor", 500, error.message));
        }
    }

    public async update(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }


}