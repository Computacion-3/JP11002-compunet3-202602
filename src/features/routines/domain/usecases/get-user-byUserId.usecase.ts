import { UserDatasource } from '../../infrastructure/datasources/user-datasource.interface'
import { UserResponseDto } from '../../infrastructure/dtos/user.dto'

export class GetUserByIdUseCase {
    constructor(private readonly userDatasource: UserDatasource) {}

    async execute(id: number): Promise<UserResponseDto | null> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('El ID del usuario debe ser un entero positivo.');
        }

        return this.userDatasource.fetchUserById(id);
    }
}