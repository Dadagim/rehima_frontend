import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://config-backend-tf84.onrender.com/";
const ACCESS_TOKEN_KEY = "rhema_access_token";
const REFRESH_TOKEN_KEY = "rhema_refresh_token";
const refreshUrl = new URL("/users/auth/token/refresh/", baseURL).toString();
let refreshRequest = null;

export const api = axios.create({ baseURL });

export function getAccessToken() {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function hasAuthTokens() {
    return Boolean(getAccessToken() || getRefreshToken());
}

export function setAuthTokens({ access, refresh }) {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);
}

export function clearAuthTokens() {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

api.interceptors.request.use((config) => {
    if (!config.url?.includes("/users/auth/")) {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes("/users/auth/")
        ) {
            return Promise.reject(error);
        }

        const refresh = getRefreshToken();
        if (!refresh) {
            clearAuthTokens();
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
        }

        originalRequest._retry = true;
        try {
            refreshRequest ||= axios.post(refreshUrl, { refresh });
            const response = await refreshRequest;
            const tokens = {
                access: response.data.access,
                refresh: response.data.refresh || refresh,
            };
            setAuthTokens(tokens);
            originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
            return api(originalRequest);
        } catch (refreshError) {
            clearAuthTokens();
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(refreshError);
        } finally {
            refreshRequest = null;
        }
    },
);
