export interface UserResponseDto {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
}

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}