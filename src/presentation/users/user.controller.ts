import { injectable } from "inversify";
import { TYPES } from "../../infrastructure/container/types.container";
import { inject } from "inversify";
import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/users/CreateUser.UseCase";
import { AllUserUseCase } from "../../application/use-cases/users/AllUsers.UseCase";
import { GetOneUserUseCase } from "../../application/use-cases/users/GetOne.UseCase";
import { HttpResponse } from "../../utils/http/response.helper";
import { BaseController } from "../../utils/controller/base.controller";

@injectable()
export class UserController extends BaseController {

    constructor(
        @inject(TYPES.CreateUserUseCase)
        private readonly create: CreateUserUseCase,

        @inject(TYPES.AllUsersUseCase)
        private readonly allUsers: AllUserUseCase,

        @inject(TYPES.GetOneUserUseCase)
        private readonly getOne: GetOneUserUseCase
    ) {
        super()
    }

    public createUser = this.handle(async (req: Request, res: Response) => {
        const user = await this.create.execute(req.body);
        res.status(201).json(HttpResponse.created(user, "User created successfully"));
    })

    public getAll = this.handle(async (req: Request, res: Response) => {
        const users = await this.allUsers.execute()
        res.status(200).json(HttpResponse.ok(users, "All users"))
    })

    public getOneById = this.handle(async (req: Request, res: Response) => {
        const id = req.params.id
        const user = await this.getOne.execute(id)
        res.status(200).json(HttpResponse.ok(user, ""))
    })

    public async update(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }


}