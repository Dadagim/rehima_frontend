import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { isStaffUser } from "../context/authUtils.js";

export default function ProtectedRoute({ children, staffOnly = false }) {
    const { user, authReady } = useAuth();

    if (!authReady) {
        return (
            <main className="mx-auto max-w-5xl px-5 py-16 text-center">
                <p className="text-lg font-semibold">Checking your session...</p>
            </main>
        );
    }

    if (!user) return <Navigate to="/" replace />;
    if (staffOnly && !isStaffUser(user)) {
        return <Navigate to="/profile" replace />;
    }

    return children;
}