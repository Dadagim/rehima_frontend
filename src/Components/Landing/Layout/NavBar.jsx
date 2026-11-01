import { useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { isStaffUser } from "../../../context/authUtils.js";
import logoImage from "../../../assets/logo.png";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, authReady, isSignedIn, logout } = useAuth();
    const navigate = useNavigate();
    const activeUser = authReady && isSignedIn ? user : null;
    const staff = isStaffUser(activeUser);
    const closeMenu = () => setIsOpen(false);

    async function handleLogout() {
        try {
            await logout();
        } catch {
            console.error("The server could not revoke the refresh token; local tokens were cleared.");
        }
        closeMenu();
        navigate("/");
    }

    return (
        <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/95 backdrop-blur">
            <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 md:px-10">
                <Link aria-label="RHEMA Fitness Centre home" to="/" onClick={closeMenu}>
                    <img
                        alt="RHEMA Fitness Centre"
                        className="h-14 w-auto object-contain md:h-16"
                        src={logoImage}
                    />
                </Link>
                <button
                    aria-controls="main-navigation"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close navigation" : "Open navigation"}
                    className="grid size-11 place-items-center border border-black/15 text-xl md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
                <nav
                    aria-label="Main navigation"
                    className={`${isOpen ? "flex" : "hidden"} bg-white absolute left-0 right-0 top-full z-50 flex-col gap-0 border-b border-black/10 bg-paper px-5 pb-5 pt-2 text-sm font-semibold shadow-lg md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
                    id="main-navigation"
                >
                    {isSignedIn ? (
                        <>
                            <Link className="py-3 md:py-0" to="/profile" onClick={closeMenu}>
                                My profile
                            </Link>
                            {staff && (
                                <>
                                    <Link
                                        className="py-3 md:py-0"
                                        to="/new-membership"
                                        onClick={closeMenu}
                                    >
                                        Create membership
                                    </Link>
                                    <Link
                                        className="py-3 md:py-0"
                                        to="/scan-membership"
                                        onClick={closeMenu}
                                    >
                                        Scan membership
                                    </Link>
                                </>
                            )}
                            <button
                                className="py-3 text-left transition-colors hover:text-orange-800 md:py-0"
                                onClick={handleLogout}
                                type="button"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <a className="py-3 md:py-0" href="/#about" onClick={closeMenu}>
                                Our story
                            </a>
                            <a className="py-3 md:py-0" href="/#coaches" onClick={closeMenu}>
                                Coaches
                            </a>
                            <a className="py-3 md:py-0" href="/#services" onClick={closeMenu}>
                                Training
                            </a>
                            <a className="py-3 md:py-0" href="/#pricing" onClick={closeMenu}>
                                Membership
                            </a>
                            <a className="py-3 md:py-0" href="/#gallery" onClick={closeMenu}>
                                The club
                            </a>
                            <a className="py-3 md:py-0" href="/#contact" onClick={closeMenu}>
                                Contact
                            </a>
                            {authReady && (
                                <>
                                    <Link className="py-3 md:py-0" to="/login" onClick={closeMenu}>
                                        Sign in
                                    </Link>
                                    <Link
                                        className="inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-5 text-white transition hover:bg-orange"
                                        to="/register"
                                        onClick={closeMenu}
                                    >
                                        JOIN THE CLUB <FiArrowUpRight aria-hidden="true" />
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default NavBar;