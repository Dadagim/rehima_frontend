import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { hasCompletedProfile, isStaffUser } from "../context/authUtils.js";

export default function ProtectedRoute({
    children,
    staffOnly = false,
    allowIncompleteProfile = false,
}) {
    const { user, authReady, isSignedIn, authError, refreshUser } = useAuth();

    if (!authReady) {
        return (
            <main className="mx-auto max-w-5xl px-5 py-16 text-center">
                <p className="text-lg font-semibold">Checking your session...</p>
            </main>
        );
    }

    if (!isSignedIn) return <Navigate to="/" replace />;
    if (authError) {
        return (
            <main className="mx-auto max-w-2xl px-5 py-16 text-center">
                <p className="text-lg font-semibold">{authError}</p>
                <button
                    className="mt-5 bg-ink px-5 py-3 font-semibold text-white"
                    onClick={refreshUser}
                    type="button"
                >
                    Retry
                </button>
            </main>
        );
    }
    if (!user) return <Navigate to="/" replace />;
    if (allowIncompleteProfile && hasCompletedProfile(user)) {
        return <Navigate to="/profile" replace />;
    }
    if (!allowIncompleteProfile && !hasCompletedProfile(user)) {
        return <Navigate to="/complete-profile" replace />;
    }
    if (staffOnly && !isStaffUser(user)) {
        return <Navigate to="/profile" replace />;
    }

    return children;
}