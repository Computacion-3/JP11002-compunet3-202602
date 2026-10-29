import { UserMockDatasource } from '../infrastructure/datasources/user-mock-datasource';

import { GetUserByIdUseCase } from '../domain/usecases/get-user-byUserId.usecase';
import { RegisterUserUseCase } from '../domain/usecases/register-user.usecase';
import { LoginUserUseCase } from '../domain/usecases/login-user.usecase';

const userDatasource = new UserMockDatasource();

export const getUserByIdUseCase = new GetUserByIdUseCase(userDatasource);
export const registerUserUseCase = new RegisterUserUseCase(userDatasource);
export const loginUserUseCase = new LoginUserUseCase(userDatasource);