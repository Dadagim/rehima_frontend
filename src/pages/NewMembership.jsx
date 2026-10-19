import { useEffect, useState } from "react";
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
        <main className="mx-auto max-w-5xl px-5 py-10 md:px-8">
            <div className="mb-8">
                <Link className="text-sm font-semibold text-orange-800 hover:underline" to="/profile">
                    ← Back to profile
                </Link>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-800">
                    Staff tools
                </p>
                <h1 className="mt-2 text-3xl font-bold">Create a membership</h1>
                <p className="mt-2 max-w-2xl text-slate-600">
                    Choose a member and plan. Their membership dates and individual QR code will be generated automatically.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <form
                    className="space-y-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8"
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
                                <label className="mb-2 block text-sm font-semibold" htmlFor="member">
                                    Member
                                </label>
                                <select
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange"
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
                                <label className="mb-2 block text-sm font-semibold" htmlFor="plan">
                                    Membership plan
                                </label>
                                <select
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange"
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
                                    <label className="mb-2 block text-sm font-semibold" htmlFor="start-date">
                                        Start date
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-slate-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange"
                                        id="start-date"
                                        onChange={(event) => setStartDate(event.target.value)}
                                        required
                                        type="date"
                                        value={startDate}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold" htmlFor="amount-paid">
                                        Amount paid
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-slate-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange"
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
                                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-5 font-semibold text-white transition hover:bg-orange disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={saving || !members.length || !plans.length}
                                type="submit"
                            >
                                {saving ? "Creating membership..." : "Create membership & QR code"}
                            </button>
                        </>
                    )}
                </form>

                <aside className="h-fit rounded-3xl bg-orange/10 p-6">
                    <h2 className="text-lg font-bold">What happens next?</h2>
                    <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-6 text-slate-700">
                        <li>The membership is linked to the selected member account.</li>
                        <li>The plan duration determines the expiry date.</li>
                        <li>A unique QR code is generated for check-ins.</li>
                        <li>The member can see the details and QR code on their profile.</li>
                    </ul>
                </aside>
            </div>

            {createdMembership && (
                <section className="mt-8 flex flex-col items-center gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:flex-row">
                    {createdMembership.qr_code_image && (
                        <img
                            alt="New membership QR code"
                            className="w-50 h-65 lg:w-25 lg:h-90 rounded-lg border border-emerald-200 bg-white p-2"
                            src={new URL(createdMembership.qr_code_image, api.defaults.baseURL).toString()}
                        />
                    )}
                    <div>
                        <h2 className="text-lg font-bold text-emerald-900">Membership created</h2>
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
        </main>
    );
}

export default NewMembership;
