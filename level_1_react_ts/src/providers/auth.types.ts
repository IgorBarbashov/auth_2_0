import {FORM_MODE} from "../LoginForm/LoginForm.tsx";

export interface IUser {
    email: string;
    name: string;
    $id: string;
}

export interface IAuthContext {
    user: IUser | null;
    authUser: (
        email: string,
        password: string,
        formMode: FORM_MODE,
    ) => Promise<void>;
    logoutUser: () => Promise<void>;
}