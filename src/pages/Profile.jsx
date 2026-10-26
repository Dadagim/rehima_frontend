import { Link } from "react-router-dom";
import {
    FiActivity,
    FiArrowUpRight,
    FiCreditCard,
    FiGift,
    FiShield,
    FiZap,
} from "react-icons/fi";
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
        <main className="member-page">
            <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
            <section className="relative mb-8 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#090d13] via-[#111827] to-[#252c36] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.3)] md:p-10">
                <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-orange-500/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl" />
                <div className="absolute right-8 top-8 hidden rotate-12 text-white/[0.06] md:block">
                    <FiActivity aria-hidden="true" size={150} />
                </div>
                <div className="relative z-10">
                    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-orange-300">
                        <FiZap aria-hidden="true" /> Member dashboard
                    </p>
                    <div className="mt-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex w-full items-center gap-4 md:gap-6">
                            {profile?.profile ? (
                                <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-orange-400 via-amber-300 to-orange-600 p-[3px] shadow-[0_18px_32px_rgba(249,115,22,0.45)]">
                                    <img
                                        alt={`${profile.full_name || user.username}'s profile`}
                                        className="h-24 w-24 rounded-[24px] object-cover sm:h-32 sm:w-32 md:h-40 md:w-40"
                                        src={mediaUrl(profile.profile)}
                                    />
                                </div>
                            ) : (
                                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-[24px] border border-white/15 bg-white/10 text-4xl font-black text-orange-300 sm:h-32 sm:w-32 md:h-40 md:w-40">
                                    {(profile?.full_name || user.username).charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className="min-w-0">
                                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">
                                    <FiShield aria-hidden="true" />
                                    {profile?.role || (user.is_superuser ? "Superuser" : "Staff")}
                                </div>
                                <h1 className="break-words text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                                    {profile?.full_name || user.username}
                                </h1>
                                <p className="mt-2 text-sm text-slate-300 md:text-base">@{user.username}</p>
                                <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
                                    {user.email || "No email address on file"}
                                    {profile?.phone_number ? ` · ${profile.phone_number}` : ""}
                                </p>
                            </div>
                        </div>

                        {staff && (
                            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                                <Link
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-orange-400/60 bg-orange-500 px-5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-400"
                                    to="/new-membership"
                                >
                                    <FiCreditCard aria-hidden="true" /> Create membership
                                    <FiArrowUpRight aria-hidden="true" />
                                </Link>
                                <Link
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                                    to="/scan-membership"
                                >
                                    <FiActivity aria-hidden="true" /> Scan membership QR
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section aria-label="Account summary" className="mb-10 grid gap-4 sm:grid-cols-3">
                <div className="group rounded-3xl border border-orange-100 bg-gradient-to-br from-white via-orange-50 to-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Memberships</p>
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700"><FiCreditCard size={21} /></span>
                    </div>
                    <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{memberships.length}</p>
                </div>
                <div className="group rounded-3xl border border-violet-100 bg-gradient-to-br from-white via-violet-50 to-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Check-ins</p>
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700"><FiActivity size={21} /></span>
                    </div>
                    <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{checkIns.length}</p>
                </div>
                <div className="group rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Rewards balance</p>
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><FiGift size={21} /></span>
                    </div>
                    <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{profile?.coins_balance ?? 0}</p>
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
                        <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-900">
                            <FiZap aria-hidden="true" className="text-orange-600" />
                            {profile.current_streak} day check-in streak
                        </p>
                    )}
                </div>

                {memberships.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                        <FiCreditCard aria-hidden="true" className="mx-auto mb-4 text-slate-300" size={36} />
                        <h3 className="text-lg font-semibold">No memberships yet</h3>
                        <p className="mt-2 text-slate-600">
                            Your active membership and QR code will appear here once staff creates it.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-2">
                        {memberships.map((membership) => (
                            <article
                                className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-xl sm:flex-row sm:items-center"
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
                                        className="size-36 shrink-0 self-center rounded-2xl border border-slate-200 bg-slate-50 p-3 object-contain"
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
            </div>
        </main>
    );
}

export default Profile;
