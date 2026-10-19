import { useEffect, useRef, useState } from "react";
import { api } from "../api/client.js";
import Badge from "../Components/UI/Badge.jsx";

function getErrorMessage(error) {
    const detail = error.response?.data?.detail;
    return typeof detail === "string"
        ? detail
        : "The membership QR code could not be checked. Please try again.";
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
            setResult({ type: "success", message: response.data.detail });
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
        <main className="mx-auto max-w-3xl px-5 py-10 md:px-8">
            <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-9">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-800">
                    Staff check-in
                </p>
                <h1 className="mt-2 text-3xl font-bold">Scan a membership QR code</h1>
                <p className="mt-3 text-slate-600">
                    Scan a member&apos;s QR code to verify their membership and check them in.
                </p>

                <div
                    className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                    id="membership-qr-reader"
                />

                <div className="mt-4 flex flex-wrap gap-3">
                    {isScanning ? (
                        <button
                            className="rounded-lg bg-slate-800 px-5 py-3 font-semibold text-white hover:bg-slate-700"
                            onClick={() => stopScanner().catch((error) => {
                                setCameraError(error.message || "Could not stop the camera scanner.");
                            })}
                            type="button"
                        >
                            Stop camera
                        </button>
                    ) : (
                        <button
                            className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
                            onClick={startScanner}
                            type="button"
                        >
                            Start camera scanner
                        </button>
                    )}
                </div>

                <form
                    className="mt-8 border-t border-slate-200 pt-6"
                    onSubmit={(event) => {
                        event.preventDefault();
                        checkMembership(qrToken);
                    }}
                >
                    <label className="block text-sm font-semibold" htmlFor="qr-token">
                        Or enter the QR code value
                    </label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                        <input
                            autoComplete="off"
                            className="min-h-12 min-w-0 flex-1 rounded-lg border border-slate-300 px-4"
                            id="qr-token"
                            onChange={(event) => setQrToken(event.target.value)}
                            placeholder="Paste QR code value"
                            value={qrToken}
                        />
                        <button
                            className="min-h-12 rounded-lg bg-ink px-5 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isChecking || !qrToken.trim()}
                            type="submit"
                        >
                            {isChecking ? "Checking..." : "Check membership"}
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
                    <Badge
                        className="mt-4 block w-full rounded-lg p-4 text-left text-sm"
                        color={result.type === "success" ? "green" : "red"}
                        role={result.type === "error" ? "alert" : "status"}
                    >
                        {result.message}
                    </Badge>
                )}
            </section>
        </main>
    );
}

export default ScanMembership;
