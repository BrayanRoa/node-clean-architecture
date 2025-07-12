import 'reflect-metadata'
import { Container } from "inversify"
import { UserController } from '../../presentation/users/user.controller'
import { TYPES } from './types.container'
import { UserMiddleware } from '../../presentation/users/user.middleware'
import { CreateUserUseCase } from '../../application/use-cases/users/CreateUser.UseCase'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { PrismaUserRepository } from '../prisma/repositories/user.repository.imp'
import { AllUserUseCase } from '../../application/use-cases/users/AllUsers.UseCase'
import { GetOneUserUseCase } from '../../application/use-cases/users/GetOne.UseCase'


const container = new Container()

// USERS
container.bind<UserController>(TYPES.UserController).to(UserController)
container.bind<UserMiddleware>(TYPES.UserMiddleware).to(UserMiddleware)
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase)
container.bind<IUserRepository>(TYPES.UserRepository).to(PrismaUserRepository)
container.bind<AllUserUseCase>(TYPES.AllUsersUseCase).to(AllUserUseCase)
container.bind<GetOneUserUseCase>(TYPES.GetOneUserUseCase).to(GetOneUserUseCase)

export { container }