import { User } from '../entities/user';
import {
    CreateUserParams,
    UserRepository,
} from '../repositories/user.repository';

export class RegisterUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(params: CreateUserParams): Promise<User> {
        if (!params.name || params.name.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        if (!params.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.email.trim())) {
            throw new Error('El correo electrónico no es válido.');
        }

        if (!params.password || params.password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }

        const existingUser = await this.userRepository.getByEmail(params.email);

        if (existingUser) {
            throw new Error('Ya existe un usuario con ese correo electrónico.');
        }

        return this.userRepository.create(params);
    }
}