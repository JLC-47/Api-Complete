export type UserRole = 'Administrador' | 'Agente' | 'Cliente';


export interface User{
    id: string;
    email: string;
    role: UserRole;
    name?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;

}


export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}


export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface ApiError {
    error: {
        code: string;
        message: string;
    }
    
}