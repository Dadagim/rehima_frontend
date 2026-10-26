import { useEffect, useMemo, useState } from "react";
import { FiActivity, FiCheck, FiImage, FiPhone, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import { useAuth } from "../hooks/useAuth.jsx";

function imageUrl(path) {
    return path ? new URL(path, api.defaults.baseURL).toString() : null;
}

function CompleteProfile() {
    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState(user.profile?.full_name || "");
    const [phoneNumber, setPhoneNumber] = useState(user.profile?.phone_number || "");
    const [attendancePlan, setAttendancePlan] = useState(
        user.profile?.attendance_plan_per_week || "",
    );
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const previewUrl = useMemo(
        () => image ? URL.createObjectURL(image) : null,
        [image],
    );
    const savedImageUrl = imageUrl(user.profile?.profile);

    useEffect(
        () => () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        },
        [previewUrl],
    );

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsSaving(true);

        const data = new FormData();
        data.append("full_name", fullName.trim());
        data.append("phone_number", phoneNumber.trim());
        data.append("attendance_plan_per_week", attendancePlan);
        if (image) data.append("profile", image);

        try {
            await api.post("/users/me/profile/", data);
            await refreshUser();
            navigate("/", { replace: true });
        } catch (saveError) {
            const responseData = saveError.response?.data;
            const fieldError = responseData
                ? Object.values(responseData).flat().find(
                    (value) => typeof value === "string",
                )
                : null;
            setError(
                responseData?.detail ||
                fieldError ||
                "Your profile could not be saved. Please try again.",
            );
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="member-page">
            <div className="mx-auto max-w-2xl px-5 py-10 md:px-8">
            <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#090d13] via-[#111827] to-[#252c36] p-6 text-white md:p-8">
                    <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-orange-500/25 blur-3xl" />
                    <p className="relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-300">
                        <FiActivity aria-hidden="true" /> Welcome to RHEMA
                    </p>
                    <h1 className="relative mt-3 text-3xl font-black tracking-tight md:text-4xl">Complete your profile</h1>
                    <p className="relative mt-3 max-w-lg text-sm leading-6 text-slate-300">
                        Add your details and a profile picture to set up your member account.
                    </p>
                </div>

                <form className="space-y-6 p-6 md:p-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        {previewUrl || savedImageUrl ? (
                            <img
                                alt="Profile picture preview"
                                className="size-28 rounded-3xl border-4 border-orange-100 object-cover shadow-lg"
                                src={previewUrl || savedImageUrl}
                            />
                        ) : (
                            <div
                                aria-hidden="true"
                                className="grid size-28 place-items-center rounded-3xl bg-gradient-to-br from-orange-100 to-amber-50 text-orange-600"
                            >
                                <FiImage aria-hidden="true" size={32} />
                            </div>
                        )}
                        <div>
                            <label className="flex items-center gap-2 font-bold text-slate-800" htmlFor="profile-image">
                                <FiImage aria-hidden="true" className="text-orange-600" /> Profile picture
                            </label>
                            <input
                                accept="image/*"
                                className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:font-semibold file:text-white file:transition hover:file:bg-orange-700"
                                id="profile-image"
                                onChange={(event) => setImage(event.target.files?.[0] || null)}
                                required={!user.profile?.profile}
                                type="file"
                            />
                            <p className="mt-1 text-sm text-slate-500">
                                Choose a clear photo of yourself.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 flex items-center gap-2 font-bold text-slate-800" htmlFor="full-name">
                            <FiUser aria-hidden="true" className="text-orange-600" />
                            Full name
                        </label>
                        <input
                            autoComplete="name"
                            className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            id="full-name"
                            maxLength={100}
                            onChange={(event) => setFullName(event.target.value)}
                            required
                            value={fullName}
                        />
                    </div>

                    <div>
                        <label className="mb-2 flex items-center gap-2 font-bold text-slate-800" htmlFor="phone-number">
                            <FiPhone aria-hidden="true" className="text-orange-600" />
                            Phone number
                        </label>
                        <input
                            autoComplete="tel"
                            className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            id="phone-number"
                            maxLength={20}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            required
                            type="tel"
                            value={phoneNumber}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-bold text-slate-800" htmlFor="attendance-plan">
                            Attendance plan per week
                        </label>
                        <select
                            className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            id="attendance-plan"
                            onChange={(event) => setAttendancePlan(event.target.value)}
                            required
                            value={attendancePlan}
                        >
                            <option value="">Select days per week</option>
                            {Array.from({ length: 7 }, (_, index) => index + 1).map((days) => (
                                <option key={days} value={String(days)}>
                                    {days} {days === 1 ? "day" : "days"} per week
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && (
                        <p aria-live="polite" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                            {error}
                        </p>
                    )}

                    <button
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSaving}
                        type="submit"
                    >
                        {isSaving ? "Saving profile..." : <><FiCheck aria-hidden="true" /> Save and continue</>}
                    </button>
                </form>
            </section>
            </div>
        </main>
    );
}

export default CompleteProfile;
