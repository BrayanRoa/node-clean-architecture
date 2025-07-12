// import { inject, injectable } from "inversify";
// import { TYPES } from "../../../infrastructure/container/types.container";
// import { IUserRepository } from "../../../domain/repositories/IUserRepository";
// import { UpdateUserDto } from "../../dto/users/update-user.dto";
// import { UserEntity } from "../../../domain/entities/user.entity";

// @injectable()
// export class UpdateUserUseCase {

//     constructor(
//         @inject(TYPES.UserRepository)
//         private readonly userRepository: IUserRepository
//     ) { }

//     async execute(id: string, dto: UpdateUserDto): Promise<UserEntity> {
//         const exist = await this.userRepository.getOneById(id)

//         console.log(exist)

//         return exist
//     }
// }