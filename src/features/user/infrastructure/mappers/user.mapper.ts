import { User } from '../../domain/entities/user';
import {
    CreateUserDto,
    UserResponseDto,
} from '../dtos/user.dto';
import { CreateUserParams } from '../../domain/repositories/user.repository';

export class UserMapper {
    static toDomain(dto: UserResponseDto): User {
        return new User({
            id: dto.id,
            name: dto.name,
            email: dto.email,
            password: dto.password,
            createdAt: new Date(dto.created_at),
        });
    }

    static toDto(params: CreateUserParams): CreateUserDto {
        return {
            name: params.name,
            email: params.email,
            password: params.password,
        };
    }
}