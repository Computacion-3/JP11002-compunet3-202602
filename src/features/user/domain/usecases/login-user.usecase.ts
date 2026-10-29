import { User } from '../entities/user';
import {
    LoginUserParams,
    UserRepository,
} from '../repositories/user.repository';

export class LoginUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(params: LoginUserParams): Promise<User> {
        if (!params.email || !params.password) {
            throw new Error('Debes ingresar el correo y la contraseña.');
        }

        const user = await this.userRepository.login(params);

        if (!user) {
            throw new Error('Correo o contraseña incorrectos.');
        }

        return user;
    }
}