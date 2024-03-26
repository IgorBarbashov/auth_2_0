import { API_URL } from '@/constants'
import {IFormData, IUser} from '@/types/types';

interface IAuthResponse {
    accessToken: string;
    user: IUser;
}

class AuthService {
    async login(data: IFormData): Promise<IAuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Ошибка при выполнении запроса');
        }

        const responseData: IAuthResponse = await response.json();
        return responseData;
    }

    async register(data: IFormData): Promise<IAuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Ошибка при выполнении запроса')
        }

        const responseData: IAuthResponse = await response.json();
        return responseData;
    }

    async profile(): Promise<IUser> {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при выполнении запроса');
        }

        const responseData: IUser = await response.json();
        return responseData;
    }

    async users(): Promise<IUser[]> {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/auth/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при выполнении запроса');
        }

        const responseData: IUser[] = await response.json();
        return responseData;
    }
}

export default new AuthService();
