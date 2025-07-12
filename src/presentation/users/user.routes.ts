import { inject } from "inversify";
import { BaseRouter } from "../../utils/router/base.router";
import { UserController } from "./user.controller";
import { UserMiddleware } from "./user.middleware";
import { TYPES } from "../../infrastructure/container/types.container";
import { container } from "../../infrastructure/container/container";
import { CreateUserDto } from "../../application/dto/users/create-user.dto";
import { UpdateUserDto } from "../../application/dto/users/update-user.dto";

export class UserRoutes extends BaseRouter<UserController, UserMiddleware> {

    constructor(
    ) {
        const controller = container.get<UserController>(TYPES.UserController)
        const middleware = container.get<UserMiddleware>(TYPES.UserMiddleware)
        super(controller, middleware)
    }

    routes(): void {

        const prefix = "/users"

        this.router.get(`${prefix}`, this.controller.getAll.bind(this.controller))

        this.router.post(`${prefix}`,
            this.middleware.validateDto(CreateUserDto),
            this.controller.createUser.bind(this.controller)
        )

        this.router.get(`${prefix}/:id`,
            this.controller.getOneById.bind(this.controller)
        )

        // this.router.patch(`${prefix}`,
        //     this.middleware.validateDto(UpdateUserDto),
        //     this.controller.update.bind(this.controller)
        // )
    }
}