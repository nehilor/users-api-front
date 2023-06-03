import {UUID} from "crypto";

export interface User {
    _id: UUID;
    username: string;
    email: string;
    password: string;
}
export interface UserState {
    token: string | null;
    users: User[]
}

export interface LoginData {
    success: boolean;
    token: string;
}
