
export interface UserProps {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly createdAt: Date;
}

export class User {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly createdAt: Date;

    constructor(props: UserProps) {
        this.validate(props);

        this.id = props.id;
        this.name = props.name.trim();
        this.email = props.email.trim().toLowerCase();
        this.password = props.password;
        this.createdAt = props.createdAt;
    }

    private validate(props: UserProps): void {
        if (!props.name || props.name.trim().length < 3) {
            throw new Error(
                "El nombre debe tener al menos 3 caracteres."
            );
        }

        if (props.name.trim().length > 100) {
            throw new Error(
                "El nombre no puede exceder los 100 caracteres."
            );
        }

        if (!props.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email.trim())) {
            throw new Error("El correo electrónico no es válido.");
        }

        if (!props.password || props.password.length < 6) {
            throw new Error(
                "La contraseña debe tener al menos 6 caracteres."
            );
        }

        if (props.password.length > 100) {
            throw new Error(
                "La contraseña no puede exceder los 100 caracteres."
            );
        }

        if (!Number.isInteger(props.id) || props.id < 1) {
            throw new Error("El identificador debe ser un entero positivo.");
        }

        if (!(props.createdAt instanceof Date) ||
            Number.isNaN(props.createdAt.getTime())) {
            throw new Error("La fecha de creación no es válida.");
        }
    }

    hasValidEmail(): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    }

    hasName(): boolean {
        return this.name.length > 0;
    }

    getFullName(): string {
        return this.name;
    }
}
