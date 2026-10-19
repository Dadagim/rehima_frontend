import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    const isAuthEndpoint = config.url?.includes('/auth/token') ||
        config.url?.includes('/users/register');

    if (token && !isAuthEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;
        const isAuthEndpoint = original?.url?.includes('/auth/token');

        if (
            error.response?.status !== 401 ||
            !original ||
            original._retry ||
            isAuthEndpoint
        ) {
            return Promise.reject(error);
        }

        original._retry = true;
        try {
            const refresh = localStorage.getItem('refresh');
            if (!refresh) {
                throw new Error('No refresh token is available.');
            }

            const refreshUrl = new URL('api/auth/token/refresh/', baseURL).toString();
            const response = await axios.post(refreshUrl, { refresh });
            localStorage.setItem('access', response.data.access);
            if (!original.headers) original.headers = {};
            original.headers.Authorization = `Bearer ${response.data.access}`;
            return api(original);
        } catch (refreshError) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('savedUser');
            window.dispatchEvent(new Event('auth:expired'));
            return Promise.reject(refreshError);
        }
    },
);
