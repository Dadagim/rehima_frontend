import { useState } from "react";
import { FiArrowLeft, FiArrowUpRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import logoImage from "../assets/logo.png";

function responseError(error) {
    const data = error.response?.data;
    if (data) {
        const message = Object.values(data).flat().find(
            (value) => typeof value === "string",
        );
        if (message) return message;
    }
    return "We could not authenticate your account. Please try again.";
}

export default function AuthForm({ initialMode = "login" }) {
    const isLogin = initialMode === "login";
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            if (isLogin) {
                await login({ email, password });
            } else {
                await register({
                    email,
                    full_name: fullName,
                    password,
                    password_confirm: passwordConfirm,
                });
            }
            navigate("/", { replace: true });
        } catch (requestError) {
            setError(responseError(requestError));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="auth-page">
            <Link aria-label="Return to home page" className="auth-back" to="/">
                <FiArrowLeft aria-hidden="true" /> Back to home
            </Link>
            <section aria-labelledby="auth-title" className="auth-card">
                <img alt="RHEMA Fitness Centre" className="auth-logo" src={logoImage} />
                <p className="eyebrow">{isLogin ? "MEMBER ACCESS" : "YOUR NEXT CHAPTER STARTS HERE"}</p>
                <h1 id="auth-title">{isLogin ? "WELCOME BACK" : "JOIN THE CLUB"}</h1>
                <p className="auth-intro">
                    {isLogin
                        ? "Sign in with your email and password."
                        : "Create an account with your email and password."}
                </p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <label className="flex items-center gap-2" htmlFor="auth-full-name">
                                <FiUser aria-hidden="true" className="text-orange-700" /> Full name
                            </label>
                            <input
                                autoComplete="name"
                                id="auth-full-name"
                                maxLength={100}
                                onChange={(event) => setFullName(event.target.value)}
                                value={fullName}
                            />
                        </>
                    )}
                    <label className="flex items-center gap-2" htmlFor="auth-email">
                        <FiMail aria-hidden="true" className="text-orange-700" /> Email
                    </label>
                    <input
                        autoComplete="email"
                        id="auth-email"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        type="email"
                        value={email}
                    />
                    <label className="flex items-center gap-2" htmlFor="auth-password">
                        <FiLock aria-hidden="true" className="text-orange-700" /> Password
                    </label>
                    <input
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        id="auth-password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        type="password"
                        value={password}
                    />
                    {!isLogin && (
                        <>
                            <label className="flex items-center gap-2" htmlFor="auth-password-confirm">
                                <FiLock aria-hidden="true" className="text-orange-700" /> Confirm password
                            </label>
                            <input
                                autoComplete="new-password"
                                id="auth-password-confirm"
                                onChange={(event) => setPasswordConfirm(event.target.value)}
                                required
                                type="password"
                                value={passwordConfirm}
                            />
                        </>
                    )}
                    {error && (
                        <p aria-live="polite" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                            {error}
                        </p>
                    )}
                    <button className="auth-submit" disabled={isSubmitting} type="submit">
                        <span>
                            {isSubmitting
                                ? "PLEASE WAIT..."
                                : isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
                        </span>
                        <FiArrowUpRight aria-hidden="true" />
                    </button>
                </form>
                <p className="mt-5 text-sm text-slate-600">
                    {isLogin ? "New to RHEMA? " : "Already have an account? "}
                    <Link
                        className="font-semibold text-orange-800 underline"
                        to={isLogin ? "/register" : "/login"}
                    >
                        {isLogin ? "Create an account" : "Sign in"}
                    </Link>
                </p>
            </section>
        </main>
    );
}
