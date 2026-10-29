import { UserMockDatasource } from '../infrastructure/datasources/user-mock-datasource';
import { UserRepositoryImpl } from '../infrastructure/repositories/user.repository.impl';
import { GetUserByIdUseCase } from '../domain/usecases/get-user-byUserId.usecase';
import { RegisterUserUseCase } from '../domain/usecases/register-user.usecase';
import { LoginUserUseCase } from '../domain/usecases/login-user.usecase';

const userDatasource = new UserMockDatasource();

const userRepository = new UserRepositoryImpl(userDatasource);

export const userContainer = {
    getUserByIdUseCase: new GetUserByIdUseCase(userRepository),
    registerUserUseCase: new RegisterUserUseCase(userRepository),
    loginUserUseCase:new LoginUserUseCase(userRepository)
};

export type UserContainer = typeof userContainer;