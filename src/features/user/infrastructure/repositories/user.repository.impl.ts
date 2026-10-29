import { User } from '../../domain/entities/user';
import {
    CreateUserParams,
    LoginUserParams,
    UserRepository,
} from '../../domain/repositories/user.repository';

import { UserDatasource } from '../datasources/user-datasource.interface';
import { UserMapper } from '../mappers/user.mapper';

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly datasource: UserDatasource) {}

    async getAll(): Promise<User[]> {
        const dtos = await this.datasource.fetchUsers();

        return dtos.map((dto) => UserMapper.toDomain(dto));
    }

    async getById(id: number): Promise<User | null> {
        const dto = await this.datasource.fetchUserById(id);

        if (!dto) {
            return null;
        }

        return UserMapper.toDomain(dto);
    }

    async getByEmail(email: string): Promise<User | null> {
        const dto = await this.datasource.fetchUserByEmail(email);

        if (!dto) {
            return null;
        }

        return UserMapper.toDomain(dto);
    }

    async create(params: CreateUserParams): Promise<User> {
        const dtoToSend = UserMapper.toDto(params);
        const createdDto = await this.datasource.createUser(dtoToSend);

        return UserMapper.toDomain(createdDto);
    }

    async login(params: LoginUserParams): Promise<User | null> {
        const dto = await this.datasource.login(params);

        if (!dto) {
            return null;
        }

        return UserMapper.toDomain(dto);
    }
}