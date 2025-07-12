// src/infrastructure/prisma/repositories/PrismaUserRepository.ts
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { PrismaClient, User as PrismaUserModel } from "@prisma/client";
import { PrismaBaseRepository } from "./prisma-base.repository";
import { UserEntity } from "../../../domain/entities/user.entity";
import { CreateUserDto } from "../../../application/dto/users/create-user.dto";

export class PrismaUserRepository extends PrismaBaseRepository<PrismaUserModel, UserEntity, CreateUserDto> implements IUserRepository {
    protected get model() {
        return this.prisma.user;
    }

    protected toEntity(model: PrismaUserModel): UserEntity {
        return new UserEntity(model.id, model.name, model.email, model.createdAt);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? this.toEntity(user) : null;
    }
}
