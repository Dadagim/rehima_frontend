import { useEffect, useRef, useState } from "react";
import {
    FiActivity,
    FiCamera,
    FiCheckCircle,
    FiHash,
    FiShield,
    FiStopCircle,
} from "react-icons/fi";
import { api } from "../api/client.js";
import Badge from "../Components/UI/Badge.jsx";

function getErrorMessage(error) {
    const detail = error.response?.data?.detail;
    return typeof detail === "string"
        ? detail
        : "The membership QR code could not be checked. Please try again.";
}

function mediaUrl(path) {
    return path ? new URL(path, api.defaults.baseURL).toString() : null;
}

function ScanMembership() {
    const scannerRef = useRef(null);
    const scanPendingRef = useRef(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [qrToken, setQrToken] = useState("");
    const [cameraError, setCameraError] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => () => {
        const scanner = scannerRef.current;
        if (scanner?.isScanning) {
            scanner.stop().catch((error) => {
                console.error("Could not stop the membership QR scanner.", error);
            });
        }
    }, []);

    async function stopScanner() {
        const scanner = scannerRef.current;
        if (scanner?.isScanning) {
            await scanner.stop();
        }
        setIsScanning(false);
    }

    async function checkMembership(token) {
        const cleanToken = token.trim();
        if (!cleanToken || scanPendingRef.current) return;

        scanPendingRef.current = true;
        setIsChecking(true);
        setResult(null);
        setCameraError("");

        try {
            await stopScanner();
        } catch (error) {
            setCameraError(error.message || "Could not stop the camera scanner.");
        }

        try {
            const response = await api.post("/api/check-ins/", { qr_token: cleanToken });
            setResult({
                type: "success",
                message: response.data.detail,
                data: response.data,
            });
            setQrToken("");
        } catch (error) {
            setResult({ type: "error", message: getErrorMessage(error) });
        } finally {
            scanPendingRef.current = false;
            setIsChecking(false);
        }
    }

    async function startScanner() {
        setCameraError("");
        setResult(null);

        try {
            const { Html5Qrcode } = await import("html5-qrcode");
            const scanner = scannerRef.current || new Html5Qrcode("membership-qr-reader");
            scannerRef.current = scanner;
            await scanner.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => checkMembership(decodedText),
            );
            setIsScanning(true);
        } catch (error) {
            setCameraError(
                error.message || "Unable to start the camera. Check camera permissions and try again.",
            );
        }
    }

    return (
        <main className="member-page">
            <div className="mx-auto max-w-4xl px-5 py-10 md:px-8">
            <section className="relative mb-6 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#090d13] via-[#111827] to-[#252c36] p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] md:p-9">
                <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-orange-500/25 blur-3xl" />
                <div className="relative z-10 flex items-center justify-between gap-5">
                    <div>
                        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-300">
                            <FiShield aria-hidden="true" /> Staff check-in
                        </p>
                        <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Scan a membership QR code</h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                            Verify a member&apos;s access and record their visit in seconds.
                        </p>
                    </div>
                    <div className="hidden size-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-300 sm:flex">
                        <FiCamera aria-hidden="true" size={30} />
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] md:p-8">
                <div className="mb-5 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                        <FiCamera aria-hidden="true" />
                    </span>
                    <div>
                        <h2 className="font-bold text-slate-900">Camera scanner</h2>
                        <p className="text-sm text-slate-500">Point your camera at a member&apos;s QR code</p>
                    </div>
                </div>

                <div
                    className="membership-scanner-reader overflow-hidden rounded-2xl border border-slate-200 bg-slate-950"
                    id="membership-qr-reader"
                />

                <div className="mt-4 flex flex-wrap gap-3">
                    {isScanning ? (
                        <button
                            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-800 px-5 font-semibold text-white transition hover:bg-slate-700"
                            onClick={() => stopScanner().catch((error) => {
                                setCameraError(error.message || "Could not stop the camera scanner.");
                            })}
                            type="button"
                        >
                            <><FiStopCircle aria-hidden="true" /> Stop camera</>
                        </button>
                    ) : (
                        <button
                            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30"
                            onClick={startScanner}
                            type="button"
                        >
                            <><FiCamera aria-hidden="true" /> Start camera scanner</>
                        </button>
                    )}
                </div>

                <form
                    className="mt-8 border-t border-slate-100 pt-6"
                    onSubmit={(event) => {
                        event.preventDefault();
                        checkMembership(qrToken);
                    }}
                >
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-800" htmlFor="qr-token">
                        <FiHash aria-hidden="true" className="text-orange-600" /> Or enter the QR code value
                    </label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                        <input
                            autoComplete="off"
                            className="min-h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            id="qr-token"
                            onChange={(event) => setQrToken(event.target.value)}
                            placeholder="Paste QR code value"
                            value={qrToken}
                        />
                        <button
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isChecking || !qrToken.trim()}
                            type="submit"
                        >
                            {isChecking ? "Checking..." : <><FiActivity aria-hidden="true" /> Check membership</>}
                        </button>
                    </div>
                </form>

                {cameraError && (
                    <Badge
                        className="mt-4 block w-full rounded-lg p-4 text-left text-sm"
                        color="amber"
                        role="alert"
                    >
                        {cameraError}
                    </Badge>
                )}
                {result && (
                    result.type === "success" ? (
                        <section
                            aria-label="Successful membership check-in"
                            className="mt-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm md:p-6"
                            role="status"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                {mediaUrl(result.data.user_profile?.profile) && (
                                    <img
                                        alt={`${result.data.user_profile.full_name || result.data.user.username}'s profile`}
                                        className="size-20 shrink-0 rounded-2xl border-2 border-white object-cover shadow-sm"
                                        src={mediaUrl(result.data.user_profile.profile)}
                                    />
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                                        <FiCheckCircle aria-hidden="true" /> Check-in successful
                                    </p>
                                    <h2 className="mt-1 text-2xl font-black text-slate-900">
                                        {result.data.user_profile?.full_name || result.data.user.username}
                                    </h2>
                                    <p className="mt-1 text-slate-600">
                                        {result.data.membership.membership_plan_name}
                                    </p>
                                </div>
                                <span className="inline-flex items-center justify-center self-start rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800 sm:self-center">
                                    {result.data.membership.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                            <div className="mt-5 grid gap-3 border-t border-emerald-200 pt-4 text-sm sm:grid-cols-2">
                                <div>
                                    <p className="text-slate-500">Valid until</p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {result.data.membership.end_date}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Days remaining</p>
                                    <p className="mt-1 font-semibold text-slate-900">
                                        {result.data.days_left}
                                    </p>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <Badge
                            className="mt-4 block w-full rounded-lg p-4 text-left text-sm"
                            color="red"
                            role="alert"
                        >
                            {result.message}
                        </Badge>
                    )
                )}
            </section>
            </div>
        </main>
    );
}

export default ScanMembership;
