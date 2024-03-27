export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IFormData extends Pick<IUser, 'email'> {
    password: string;
}