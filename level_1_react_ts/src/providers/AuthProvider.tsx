import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {ID} from "appwrite";
import {account} from "../appwrite.ts";
import {FORM_MODE} from "../LoginForm/LoginForm.tsx";
import {IAuthContext, IUser} from './auth.types.ts';

export const AuthContext = createContext<IAuthContext>({
    user: null,
    authUser: async () => {
    },
    logoutUser: async () => {
    }
});

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<IUser | null>(null);

    const authUser = async (email: string, password: string, formMode = FORM_MODE.LOGIN) => {
        try {
            if (formMode === FORM_MODE.REGISTER) {
                await account.create(ID.unique(), email, password);
            }

            await account.createEmailPasswordSession(email, password);
            setUser(await account.get());
            // window.history.pushState({}, '', '/');
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            setUser(await account.get());
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const logoutUser = async () => {
        await account.deleteSession('current');
        setUser(null);
        setIsLoading(false);
    };

    const contextData = {
        user,
        authUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isLoading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};