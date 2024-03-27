import {UserRole} from "@/services/auth.types";

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export interface IFormData extends Pick<IUser, 'email'> {
    password: string;
}