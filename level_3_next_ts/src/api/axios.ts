import axios, {CreateAxiosDefaults} from "axios";
import {API_URL} from "@/constants";
import {errorCatch, getContentType} from "@/api/api.helper";
import {getAccessTokenFromStorage, removeAccessTokenFromStorage} from "@/services/auth.helper";
import authService from "@/services/auth.service";

const axiosOptions: CreateAxiosDefaults = {
    baseURL: API_URL,
    headers: getContentType(),
    withCredentials: true,
};

// classic clear instance without interceptors, tokens etc.
export const axiosClassic = axios.create(axiosOptions);

// instance for authorization with interceptor, cookies
export const instance = axios.create(axiosOptions);

instance.interceptors.request.use(config => {
    const accessToken = getAccessTokenFromStorage();

    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

instance.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;

        if ((error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config && !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                await authService.getNewTokens();
                return instance.request(originalRequest);
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') {
                    removeAccessTokenFromStorage();
                }
            }
        }

        throw error;
    }
);