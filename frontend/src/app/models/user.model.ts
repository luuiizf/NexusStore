export interface User {
    id?: number;
    username: string;
    email?: string;
    password?: string;
    token?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
