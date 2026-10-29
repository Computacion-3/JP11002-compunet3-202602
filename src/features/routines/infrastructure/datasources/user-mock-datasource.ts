import { UserDatasource } from './user-datasource.interface';

import {
    UserResponseDto,
    CreateUserDto,
    LoginUserDto,
} from '../dtos/user.dto';

const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export class UserMockDatasource implements UserDatasource {
    private users: UserResponseDto[] = [
        {
            id: 1,
            name: 'Usuario de prueba',
            email: 'test@fitroutine.com',
            password: '123456',
            created_at: new Date(
                Date.now() - 1000 * 60 * 60 * 24 * 7,
            ).toISOString(),
        },
        {
            id: 2,
            name: 'Juan Pérez',
            email: 'juan@fitroutine.com',
            password: '123456',
            created_at: new Date(
                Date.now() - 1000 * 60 * 60 * 24 * 3,
            ).toISOString(),
        },
    ];

    async fetchUsers(): Promise<UserResponseDto[]> {
        await delay(600);

        return this.users.map((user) => ({ ...user }));
    }

    async fetchUserById(id: number): Promise<UserResponseDto | null> {
        await delay(400);

        const found = this.users.find((user) => user.id === id);

        return found ? { ...found } : null;
    }

    async fetchUserByEmail(
        email: string,
    ): Promise<UserResponseDto | null> {
        await delay(400);

        const found = this.users.find(
            (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
        );

        return found ? { ...found } : null;
    }

    async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
        await delay(800);

        const emailExists = this.users.some(
            (user) =>
                user.email.toLowerCase() === dto.email.trim().toLowerCase(),
        );

        if (emailExists) {
            throw new Error('Ya existe un usuario con ese correo electrónico.');
        }

        const nextId =
            this.users.length > 0
                ? Math.max(...this.users.map((user) => user.id)) + 1
                : 1;

        const newUser: UserResponseDto = {
            id: nextId,
            name: dto.name.trim(),
            email: dto.email.trim().toLowerCase(),
            password: dto.password,
            created_at: new Date().toISOString(),
        };

        this.users.push(newUser);

        return { ...newUser };
    }

    async login(dto: LoginUserDto): Promise<UserResponseDto | null> {
        await delay(700);

        const found = this.users.find(
            (user) =>
                user.email.toLowerCase() === dto.email.trim().toLowerCase() &&
                user.password === dto.password,
        );

        return found ? { ...found } : null;
    }
}