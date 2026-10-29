import { UserDatasource } from '../../infrastructure/datasources/user-datasource.interface';
import { CreateUserDto, UserResponseDto } from '../../infrastructure/dtos/user.dto';

export class RegisterUserUseCase {
    constructor(private readonly userDatasource: UserDatasource) {}

    async execute(dto: CreateUserDto): Promise<UserResponseDto> {
        if (!dto.name || dto.name.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        if (!dto.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dto.email.trim())) {
            throw new Error('El correo electrónico no es válido.');
        }

        if (!dto.password || dto.password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }

        return this.userDatasource.createUser(dto);
    }
}