import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import AuthForm from "../Components/AuthForm.jsx";
import LayoutStructure from "../Components/Landing/Layout/LayoutStructure.jsx";
import NewMembership from "../pages/NewMembership.jsx";
import Profile from "../pages/Profile.jsx";
import ScanMembership from "../pages/ScanMembership.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";

function AppRoutes() {
    const { user, authReady } = useAuth();
    const landing = authReady
        ? user ? <Navigate to="/profile" replace /> : <LayoutStructure />
        : <p className="mx-auto max-w-5xl px-5 py-16 text-center">Loading...</p>;
    const authEntry = (initialMode) => !authReady
        ? <p className="mx-auto max-w-5xl px-5 py-16 text-center">Checking your session...</p>
        : user
            ? <Navigate to="/profile" replace />
            : <AuthForm initialMode={initialMode} />;

    return (
        <Routes>
            <Route path="/" element={landing} />
            <Route path="/landingPage" element={landing} />
            <Route path="/login" element={authEntry("login")} />
            <Route path="/register" element={authEntry("register")} />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/new-membership"
                element={
                    <ProtectedRoute staffOnly>
                        <NewMembership />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/scan-membership"
                element={
                    <ProtectedRoute staffOnly>
                        <ScanMembership />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRoutes;
