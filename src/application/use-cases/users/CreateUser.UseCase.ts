import { injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types.container";
import { inject } from "inversify";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserEntity } from "../../../domain/entities/user.entity";
import { CreateUserDto } from "../../dto/users/create-user.dto";
import { FieldAlreadyExistsError } from "../../../utils/errors/field-exists.error";

@injectable()
export class CreateUserUseCase {

    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(data: CreateUserDto): Promise<UserEntity | null> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new FieldAlreadyExistsError("Email", data.email);
        }
        return this.userRepository.add(data);
    }
}