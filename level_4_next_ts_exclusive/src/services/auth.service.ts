import {IFormData, IUser} from '@/types/types';
import {axiosClassic, instance} from "@/api/axios";
import {removeAccessTokenFromStorage, saveAccessTokenToStorage} from "@/services/auth.helper";
import {API_URL} from "@/constants";

interface IAuthResponse {
    accessToken: string;
    user: IUser;
}

export enum EnumTokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken',
}

class AuthService {
    async main(type: 'login' | 'register', data: IFormData) {
        const response = await axiosClassic.post<IAuthResponse>(
            `/auth/${type}`,
            data
        );

        if (response.data.accessToken) {
            saveAccessTokenToStorage(response.data.accessToken);
        }

        return response;
    }

    async getNewTokens() {
        const response = await axiosClassic.post<IAuthResponse>(
            '/auth/login/access-token'
        );

        if (response.data.accessToken) {
            saveAccessTokenToStorage(response.data.accessToken);
        }

        return response;
    }

    async getNewTokensByRefresh(refreshToken: string) {
        const response = await fetch(
            `${API_URL}/auth/login/access-token`,
            {
                method: 'POST',
                headers: {
                    cookie: `refreshToken=${refreshToken}`,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error('Token refreshing error');
        }

        return await response.json();
    }

    async logout() {
        const response = await axiosClassic.post<boolean>(
            '/auth/logout'
        );

        if (response.data) {
            removeAccessTokenFromStorage();
        }

        return response;
    }

    async profile() {
        return instance.get<IUser>('/auth/profile');
    }
}

export default new AuthService();
