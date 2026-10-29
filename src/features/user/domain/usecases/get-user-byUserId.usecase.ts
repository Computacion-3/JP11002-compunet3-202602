import { User } from '../entities/user';
import { UserRepository } from '../repositories/user.repository';

export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: number): Promise<User | null> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('El ID debe ser un entero positivo.');
        }

        return this.userRepository.getById(id);
    }
}