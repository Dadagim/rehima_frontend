import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiCheckCircle, FiCreditCard, FiDollarSign, FiInfo, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";

function getLocalDate() {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
}

function getErrorMessage(error) {
    const data = error.response?.data;
    if (typeof data?.detail === "string") return data.detail;
    if (data && typeof data === "object") {
        return Object.entries(data)
            .map(([field, messages]) => `${field}: ${[].concat(messages).join(" ")}`)
            .join(" ");
    }
    return "Could not create the membership. Please try again.";
}

function NewMembership() {
    const [members, setMembers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [memberId, setMemberId] = useState("");
    const [planId, setPlanId] = useState("");
    const [startDate, setStartDate] = useState(getLocalDate);
    const [amountPaid, setAmountPaid] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [createdMembership, setCreatedMembership] = useState(null);

    useEffect(() => {
        let active = true;

        Promise.all([
            api.get("/users/members/"),
            api.get("/api/membership-plans/"),
        ])
            .then(([membersResponse, plansResponse]) => {
                if (!active) return;
                setMembers(membersResponse.data);
                setPlans(plansResponse.data);
            })
            .catch((requestError) => {
                if (active) setError(getErrorMessage(requestError));
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    function handlePlanChange(event) {
        const selectedId = event.target.value;
        setPlanId(selectedId);
        const selectedPlan = plans.find((plan) => String(plan.id) === selectedId);
        setAmountPaid(selectedPlan ? String(selectedPlan.price) : "");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setCreatedMembership(null);

        try {
            const response = await api.post("/api/memberships/", {
                user: Number(memberId),
                membership_plan: Number(planId),
                start_date: startDate,
                amount_paid: amountPaid,
            });
            setCreatedMembership(response.data);
        } catch (requestError) {
            setError(getErrorMessage(requestError));
        } finally {
            setSaving(false);
        }
    }

    const selectedMember = members.find((member) => String(member.user) === memberId);

    return (
        <main className="member-page">
            <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
            <div className="mb-8">
                <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-700" to="/profile">
                    <FiArrowLeft aria-hidden="true" /> Back to profile
                </Link>
                <section className="relative mt-5 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#090d13] via-[#111827] to-[#252c36] p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] md:p-9">
                    <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-orange-500/25 blur-3xl" />
                    <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-300">
                                <FiCreditCard aria-hidden="true" /> Staff tools
                            </p>
                            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Create a membership</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                                Choose a member and plan. We&apos;ll prepare their access details and unique QR code.
                            </p>
                        </div>
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-300">
                            <FiCreditCard aria-hidden="true" size={30} />
                        </div>
                    </div>
                </section>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <form
                    className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)] md:p-8"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                            {error}
                        </p>
                    )}

                    {loading ? (
                        <p className="py-8 text-center text-slate-600">Loading members and plans...</p>
                    ) : (
                        <>
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800" htmlFor="member">
                                <FiUser aria-hidden="true" className="text-orange-600" /> Member
                                </label>
                                <select
                                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                                    id="member"
                                    onChange={(event) => setMemberId(event.target.value)}
                                    required
                                    value={memberId}
                                >
                                    <option value="">Select a member</option>
                                    {members.map((member) => (
                                        <option key={member.user} value={member.user}>
                                            {member.full_name} (@{member.username})
                                        </option>
                                    ))}
                                </select>
                                {members.length === 0 && (
                                    <p className="mt-2 text-sm text-slate-500">
                                        No member accounts are available yet.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800" htmlFor="plan">
                                <FiCreditCard aria-hidden="true" className="text-orange-600" /> Membership plan
                                </label>
                                <select
                                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                                    id="plan"
                                    onChange={handlePlanChange}
                                    required
                                    value={planId}
                                >
                                    <option value="">Select a plan</option>
                                    {plans.map((plan) => (
                                        <option key={plan.id} value={plan.id}>
                                            {plan.name} · {plan.duration} days · {plan.price}
                                        </option>
                                    ))}
                                </select>
                                {plans.length === 0 && (
                                    <p className="mt-2 text-sm text-slate-500">
                                        Create a membership plan before assigning memberships.
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800" htmlFor="start-date">
                                        <FiCalendar aria-hidden="true" className="text-orange-600" /> Start date
                                    </label>
                                    <input
                                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                                        id="start-date"
                                        onChange={(event) => setStartDate(event.target.value)}
                                        required
                                        type="date"
                                        value={startDate}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800" htmlFor="amount-paid">
                                        <FiDollarSign aria-hidden="true" className="text-orange-600" /> Amount paid
                                    </label>
                                    <input
                                        className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                                        id="amount-paid"
                                        min="0"
                                        onChange={(event) => setAmountPaid(event.target.value)}
                                        required
                                        step="0.01"
                                        type="number"
                                        value={amountPaid}
                                    />
                                </div>
                            </div>

                            <button
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={saving || !members.length || !plans.length}
                                type="submit"
                            >
                                {saving ? "Creating membership..." : <>Create membership &amp; QR code <FiArrowRight aria-hidden="true" /></>}
                            </button>
                        </>
                    )}
                </form>

                <aside className="h-fit rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                        <FiInfo aria-hidden="true" size={22} />
                    </div>
                    <h2 className="text-lg font-bold">What happens next?</h2>
                    <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
                        <li className="flex gap-3"><FiCheckCircle aria-hidden="true" className="mt-1 shrink-0 text-emerald-600" /> Membership is linked to the selected account.</li>
                        <li className="flex gap-3"><FiCheckCircle aria-hidden="true" className="mt-1 shrink-0 text-emerald-600" /> Plan duration sets the expiry date.</li>
                        <li className="flex gap-3"><FiCheckCircle aria-hidden="true" className="mt-1 shrink-0 text-emerald-600" /> A unique QR code is generated for check-ins.</li>
                        <li className="flex gap-3"><FiCheckCircle aria-hidden="true" className="mt-1 shrink-0 text-emerald-600" /> The member sees everything on their profile.</li>
                    </ul>
                </aside>
            </div>

            {createdMembership && (
                <section className="mt-8 flex flex-col items-center gap-5 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg sm:flex-row">
                    {createdMembership.qr_code_image && (
                        <img
                            alt="New membership QR code"
                            className="size-40 shrink-0 rounded-2xl border border-emerald-200 bg-white p-3 object-contain shadow-sm"
                            src={new URL(createdMembership.qr_code_image, api.defaults.baseURL).toString()}
                        />
                    )}
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-bold text-emerald-900">
                            <FiCheckCircle aria-hidden="true" /> Membership created
                        </h2>
                        <p className="mt-1 text-sm text-emerald-800">
                            {selectedMember?.full_name || createdMembership.member_name} ·{" "}
                            {createdMembership.membership_plan_name}
                        </p>
                        <p className="mt-1 text-sm text-emerald-800">
                            {createdMembership.start_date} to {createdMembership.end_date}
                        </p>
                        <p className="mt-2 text-sm text-emerald-800">
                            The member will see this QR code when they sign in and open their profile.
                        </p>
                    </div>
                </section>
            )}
            </div>
        </main>
    );
}

export default NewMembership;
