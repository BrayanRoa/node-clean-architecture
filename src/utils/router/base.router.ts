import { inject } from "inversify"
import { TYPES } from "../../infrastructure/container/types.container"
import { Router } from "express"

export abstract class BaseRouter<T, U> {

    protected readonly controller: T
    protected readonly middleware: U
    public router = Router()

    constructor(
        @inject(TYPES.UserController) controller: any,
        @inject(TYPES.UserMiddleware) middleware: any
    ) {
        this.controller = controller
        this.middleware = middleware
        this.routes()
    }

    abstract routes(): void
}