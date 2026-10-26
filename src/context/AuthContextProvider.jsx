import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./useAuth.jsx";
import {
    api,
    clearAuthTokens,
    getRefreshToken,
    hasAuthTokens,
    setAuthTokens,
} from "../api/client.js";

export function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState(() => ({
        user: null,
        error: null,
        ready: !hasAuthTokens(),
    }));
    const [isSignedIn, setIsSignedIn] = useState(hasAuthTokens);

    const refreshUser = useCallback(async () => {
        const response = await api.get("/users/me/");
        const data = response.data;
        const authenticatedUser = {
            ...data.user,
            profile: data.user_profile,
            memberships: data.memberships,
            check_ins: data.check_in,
        };
        setIsSignedIn(true);
        setAuthState({ user: authenticatedUser, error: null, ready: true });
        return authenticatedUser;
    }, []);

    useEffect(() => {
        let active = true;
        const handleExpired = () => {
            if (active) {
                setIsSignedIn(false);
                setAuthState({ user: null, error: null, ready: true });
            }
        };
        window.addEventListener("auth:expired", handleExpired);

        if (hasAuthTokens()) {
            Promise.resolve()
                .then(refreshUser)
                .catch((error) => {
                    if (active) {
                        setAuthState({
                            user: null,
                            error: error.response?.data?.detail ||
                                "Your account could not be loaded. Please try again.",
                            ready: true,
                        });
                        setIsSignedIn(hasAuthTokens());
                    }
                });
        }
        return () => {
            active = false;
            window.removeEventListener("auth:expired", handleExpired);
        };
    }, [refreshUser]);

    const authenticate = useCallback(async (endpoint, credentials) => {
        const response = await api.post(endpoint, credentials);
        setAuthTokens(response.data);
        setIsSignedIn(true);
        setAuthState({ user: null, error: null, ready: false });
        try {
            return await refreshUser();
        } catch (error) {
            setAuthState({
                user: null,
                error: error.response?.data?.detail ||
                    "Your account could not be loaded. Please try again.",
                ready: true,
            });
            throw error;
        }
    }, [refreshUser]);

    const login = useCallback(
        (credentials) => authenticate("/users/auth/login/", credentials),
        [authenticate],
    );
    const register = useCallback(
        (credentials) => authenticate("/users/auth/register/", credentials),
        [authenticate],
    );

    const logout = useCallback(async () => {
        const refresh = getRefreshToken();
        try {
            if (refresh) {
                await api.post("/users/auth/logout/", { refresh });
            }
        } finally {
            clearAuthTokens();
            setIsSignedIn(false);
            setAuthState({ user: null, error: null, ready: true });
        }
    }, []);

    const retryProfile = useCallback(async () => {
        try {
            return await refreshUser();
        } catch (error) {
            setAuthState({
                user: null,
                error: error.response?.data?.detail ||
                    "Your account could not be loaded. Please try again.",
                ready: true,
            });
            return null;
        }
    }, [refreshUser]);

    return (
        <AuthContext.Provider
            value={{
                user: authState.user,
                authReady: authState.ready,
                isSignedIn,
                authError: authState.error,
                logout,
                login,
                register,
                refreshUser: retryProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
