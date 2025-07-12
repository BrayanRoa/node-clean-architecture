import { IUserRepository } from './../../../domain/repositories/IUserRepository';
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/container/types.container";
import { UserEntity } from '../../../domain/entities/user.entity';

@injectable()
export class AllUserUseCase {

    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository
    ) { }

    async execute(): Promise<UserEntity[]> {
        return await this.userRepository.getAll()
    }
}