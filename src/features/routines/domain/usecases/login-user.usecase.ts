import { UserDatasource } from '../../infrastructure/datasources/user-datasource.interface';
import { LoginUserDto, UserResponseDto } from '../../infrastructure/dtos/user.dto';

export class LoginUserUseCase {
    constructor(private readonly userDatasource: UserDatasource) {}

    async execute(dto: LoginUserDto): Promise<UserResponseDto> {
        if (!dto.email || !dto.password) {
            throw new Error('Debes ingresar el correo y la contraseña.');
        }

        const user = await this.userDatasource.login(dto);

        if (!user) {
            throw new Error('Correo o contraseña incorrectos.');
        }

        return user;
    }
}