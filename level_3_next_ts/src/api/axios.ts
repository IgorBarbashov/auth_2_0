import axios, {CreateAxiosDefaults} from "axios";
import {API_URL} from "@/constants";
import {getContentType} from "@/api/api.helper";

const axiosOptions: CreateAxiosDefaults = {
    baseURL: API_URL,
    headers: getContentType(),
    withCredentials: true,
};

// classic clear instance without interceptors, tokens etc.
export const axiosClassic = axios.create(axiosOptions);

// instance for authorization with interceptor, cookies
export const instance = axios.create(axiosOptions);

