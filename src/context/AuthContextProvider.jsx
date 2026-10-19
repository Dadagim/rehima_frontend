import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./useAuth.jsx";
import { api } from "../api/client.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export function AuthContextProvider({ children }) {
    const [user, setUser] = useLocalStorage("savedUser", null);
    const [, setAccess] = useLocalStorage("access", null);
    const [, setRefresh] = useLocalStorage("refresh", null);
    const [authReady, setAuthReady] = useState(
        () => !localStorage.getItem("access") && !localStorage.getItem("refresh"),
    );

    const refreshUser = useCallback(async () => {
        const response = await api.get("/users/me/");
        const data = response.data;
        const authenticatedUser = {
            ...data.user,
            profile: data.user_profile,
            memberships: data.memberships,
            check_ins: data.check_in,
        };
        setUser(authenticatedUser);
        return authenticatedUser;
    }, [setUser]);

    useEffect(() => {
        let active = true;
        const accessToken = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");

        if (!accessToken && !refreshToken) {
            return () => {
                active = false;
            };
        }

        refreshUser()
            .catch((error) => {
                if (error.response?.status === 401) {
                    setAccess(null);
                    setRefresh(null);
                    setUser(null);
                }
            })
            .finally(() => {
                if (active) {
                    setAuthReady(true);
                }
            });

        return () => {
            active = false;
        };
    }, [refreshUser, setAccess, setRefresh, setUser]);

    useEffect(() => {
        function handleAuthExpired() {
            setAccess(null);
            setRefresh(null);
            setUser(null);
        }

        window.addEventListener("auth:expired", handleAuthExpired);
        return () => window.removeEventListener("auth:expired", handleAuthExpired);
    }, [setAccess, setRefresh, setUser]);

    async function login({ username, password }) {
        logout();
        try {
            const response = await api.post("/api/auth/token/", { username, password });
            setAccess(response.data.access);
            setRefresh(response.data.refresh);
            await refreshUser();
        } catch (error) {
            logout();
            throw error;
        }
    }

    async function register(data) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        await api.post("/users/register/", formData);
        return login({ username: data.username, password: data.password });
    }

    function logout() {
        setAccess(null);
        setRefresh(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user: localStorage.getItem("access") || localStorage.getItem("refresh")
                    ? user
                    : null,
                authReady,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
