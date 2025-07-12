import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types.container";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserEntity } from "../../../domain/entities/user.entity";
import { NotFoundError } from "../../../utils/errors/not-found.error";

@injectable()
export class GetOneUserUseCase {

    constructor(
        @inject(TYPES.UserRepository)
        private readonly repository: IUserRepository
    ) { }

    async execute(id: string): Promise<UserEntity> {
        const user = await this.repository.getOneById(id)
        if (!user) {
            throw new NotFoundError("User", id)
        }
        return user
    }
}