import { CreateUserDto } from "../../application/dto/users/create-user.dto";
import { IBaseRepository } from "../../utils/repository/IBaseRepository";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository extends IBaseRepository<UserEntity, CreateUserDto> {
    findByEmail(email: string): Promise<UserEntity | null>
}