"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DAYS = ["Today", "Tomorrow", "This week"] as const;
const TIMES = ["Morning", "Afternoon"] as const;

function Choice<T extends string>({ options, value, onChange, label }: { options: readonly T[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`h-11 flex-1 rounded-full border-2 px-2 text-[15px] font-semibold transition ${
            value === o ? "border-teal bg-teal text-white" : "border-teal-200 bg-white text-teal-700 hover:border-teal"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// Name, phone and a time window. Emails the front desk; no health details.
export function CallbackForm({ phone }: { phone: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [day, setDay] = useState<(typeof DAYS)[number]>("Tomorrow");
  const [time, setTime] = useState<(typeof TIMES)[number]>("Morning");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (tel.replace(/\D/g, "").length < 10) return setError("Please enter a 10-digit phone number.");
    setBusy(true);
    try {
      const res = await fetch("/api/peptide-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: tel, day, time, company }),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/go/peptides/booked");
    } catch {
      setBusy(false);
      setError(`That didn't go through. Please try again, or call us at ${phone}.`);
    }
  };

  const input =
    "h-12 w-full rounded-xl border-2 border-sage-200 bg-white px-4 text-lg outline-none transition placeholder:text-[#9aa5a2] focus:border-teal";

  return (
    <form onSubmit={submit} noValidate className="space-y-3 text-left">
      <input className={input} placeholder="Your name" aria-label="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className={input} placeholder="Phone number" aria-label="Phone number" type="tel" inputMode="tel" autoComplete="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
      <p className="!mt-4 text-sm font-bold uppercase tracking-[0.08em] text-purple">Best time to call</p>
      <Choice label="Day" options={DAYS} value={day} onChange={setDay} />
      <Choice label="Time of day" options={TIMES} value={time} onChange={setTime} />
      {error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="!mt-5 w-full rounded-full bg-purple px-10 py-4 text-xl font-semibold text-white shadow-lg shadow-purple/25 transition hover:bg-purple-600 disabled:opacity-60"
      >
        {busy ? "Sending..." : "Request my callback"}
      </button>
      <p className="text-center text-xs text-[#6b7673]">We&apos;ll only use your number to call you about this request.</p>
    </form>
  );
}
