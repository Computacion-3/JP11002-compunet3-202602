import {
    UserResponseDto,
    CreateUserDto,
    LoginUserDto,
} from '../dtos/user.dto';

export interface UserDatasource {
    fetchUsers(): Promise<UserResponseDto[]>;

    fetchUserById(id: number): Promise<UserResponseDto | null>;

    fetchUserByEmail(email: string): Promise<UserResponseDto | null>;

    createUser(dto: CreateUserDto): Promise<UserResponseDto>;

    login(dto: LoginUserDto): Promise<UserResponseDto | null>;
}