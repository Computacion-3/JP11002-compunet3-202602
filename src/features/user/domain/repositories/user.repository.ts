import { User } from '../entities/user';

export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserParams {
    email: string;
    password: string;
}

export interface UserRepository {
    getAll(): Promise<User[]>;

    getById(id: number): Promise<User | null>;

    getByEmail(email: string): Promise<User | null>;

    create(params: CreateUserParams): Promise<User>;

    login(params: LoginUserParams): Promise<User | null>;
}