import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { isStaffUser } from "../context/authUtils.js";

function mediaUrl(path) {
    if (!path) return null;
    return new URL(path, api.defaults.baseURL).toString();
}

function Profile() {
    const { user } = useAuth();
    const profile = user.profile;
    const memberships = user.memberships || [];
    const checkIns = user.check_ins || [];
    const staff = isStaffUser(user);

    return (
        <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">
            <section className="mb-8 rounded-3xl bg-ink p-7 text-white shadow-lg md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                    Member dashboard
                </p>
                <div className="mt-5 flex flex-col items-center justify-center gap-6 md:flex-row flex-wrap">
                    {profile?.profile && (
                        <div className="w-40 h-40 md:w-60 md:h-80 ">
                            <img
                            alt={`${profile.full_name || user.username}'s profile`}
                            className=" rounded-full w-full h-full border-4 border object-cover"
                            src={mediaUrl(profile.profile)}
                        />
                        </div>
                    )}
                    {/* The information abou the member */}
                    <div className="min-w-0 flex-1">
                        <h1 className="text-3xl text-black font-bold">
                            {profile?.full_name || user.username}
                        </h1>
                        <p className="mt-1 text-black/75">@{user.username}</p>
                        <p className="mt-3 text-sm text-gray-500">
                            {user.email || "No email address on file"}
                            {profile?.phone_number ? ` · ${profile.phone_number}` : ""}
                        </p>
                        <span className="mt-4 inline-flex rounded-full bg-gray-300 px-3 py-1 text-sm capitalize">
                            {profile?.role || (user.is_superuser ? "Superuser" : "Staff")}
                        </span>
                    </div>
                    {staff && (
                        <div className="flex flex-wrap gap-3">
                            <Link
                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-orange-700 bg-orange-500 px-5 font-semibold text-black transition hover:bg-orange/80"
                                to="/new-membership"
                            >
                                Create membership
                            </Link>
                            <Link
                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 px-5 font-semibold text-black transition hover:bg-white/10"
                                to="/scan-membership"
                            >
                                Scan membership QR
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section aria-label="Account summary" className="mb-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <p className="text-sm text-slate-500">Memberships</p>
                    <p className="mt-2 text-3xl font-bold">{memberships.length} <span className="font-bold text-4xl ">📑</span></p>
                </div>
                <div className="rounded-2xl border border-black/10  bg-white p-5">
                    <p className="text-sm text-slate-500">Check-ins</p>
                    <p className="mt-2 text-3xl font-bold">{checkIns.length} <span className="font-bold text-4xl ">🔥</span></p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-5">
                    <p className="text-sm text-slate-500">Rewards balance</p>
                    <p className="mt-2 text-3xl font-bold">{profile?.coins_balance ?? 0} <span className="font-bold text-4xl ">🎁</span></p>
                </div>
            </section>

            <section>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-orange-800">
                            Your access
                        </p>
                        <h2 className="mt-1 text-2xl font-bold">Memberships & QR codes</h2>
                    </div>
                    {profile?.current_streak > 0 && (
                        <p className="rounded-full bg-orange/10 px-4 py-2 text-sm font-semibold">
                            {profile.current_streak} day check-in streak
                        </p>
                    )}
                </div>

                {memberships.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                        <h3 className="text-lg font-semibold">No memberships yet</h3>
                        <p className="mt-2 text-slate-600">
                            Your active membership and QR code will appear here once staff creates it.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-2">
                        {memberships.map((membership) => (
                            <article
                                className="flex flex-col gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
                                key={membership.id}
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-xl font-bold">
                                            {membership.membership_plan_name || "Gym membership"}
                                        </h3>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            membership.is_active
                                                ? "bg-emerald-100 text-emerald-800"
                                                : "bg-slate-100 text-slate-700"
                                        }`}>
                                            {membership.is_active ? "Active" : "Expired"}
                                        </span>
                                    </div>
                                    <dl className="mt-4 space-y-2 text-sm text-slate-600">
                                        <div className="flex justify-between gap-3">
                                            <dt>Starts</dt>
                                            <dd className="font-medium text-slate-900">{membership.start_date}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt>Expires</dt>
                                            <dd className="font-medium text-slate-900">{membership.end_date}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt>Paid</dt>
                                            <dd className="font-medium text-slate-900">{membership.amount_paid}</dd>
                                        </div>
                                    </dl>
                                </div>
                                {membership.qr_code_image ? (
                                    <img
                                        alt={`QR code for ${membership.membership_plan_name || "membership"}`}
                                        className="size-36 self-center rounded-lg border border-slate-200 object-contain p-2"
                                        src={mediaUrl(membership.qr_code_image)}
                                    />
                                ) : (
                                    <p className="text-sm text-slate-500">QR code is not available.</p>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Profile;
