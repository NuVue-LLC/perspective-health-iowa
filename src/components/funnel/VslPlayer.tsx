"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pixelTrack } from "./MetaPixel";

type Props = {
  src: string;
  poster: string;
  duration: number;
  chapters: [number, string][];
  checklist?: string[];
  checklistTitle?: string;
  /** Shown beside the video (below it on phones) instead of the checklist. */
  aside?: React.ReactNode;
  startTitle: string;
  startSub: string;
  endText: string;
  storageKey?: string;
};

const fmt = (t: number) => {
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const NONE: string[] = [];

export function VslPlayer(props: Props) {
  const p = { checklist: NONE, checklistTitle: "", storageKey: "phi-vsl", ...props };
  const video = useRef<HTMLVideoElement>(null);
  const chipRow = useRef<HTMLDivElement>(null);
  const fired = useRef<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(p.duration);
  const [checked, setChecked] = useState<boolean[]>(() => p.checklist.map(() => false));

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(p.storageKey) || "[]");
      if (Array.isArray(saved)) setChecked(p.checklist.map((_, i) => !!saved[i]));
    } catch {}
  }, [p.storageKey, p.checklist]);

  const idx = p.chapters.reduce((a, c, i) => (time >= c[0] ? i : a), 0);

  useEffect(() => {
    const row = chipRow.current;
    const chip = row?.children[idx] as HTMLElement | undefined;
    if (row && chip) {
      row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
    }
  }, [idx]);

  const once = (name: string) => {
    if (fired.current[name]) return;
    fired.current[name] = true;
    pixelTrack(name);
  };

  const play = useCallback(() => {
    setStarted(true);
    setEnded(false);
    video.current?.play().catch(() => {});
  }, []);

  const seek = (t: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = Math.min(t, dur - 0.1);
    play();
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.ended) seek(0);
    else if (v.paused) play();
    else v.pause();
  };

  const onTime = () => {
    const v = video.current;
    if (!v) return;
    setTime(v.currentTime);
    if (v.currentTime / dur >= 0.5) once("VideoHalf");
  };

  const tick = (i: number) => {
    const next = checked.map((c, k) => (k === i ? !c : c));
    setChecked(next);
    try {
      localStorage.setItem(p.storageKey, JSON.stringify(next));
    } catch {}
  };

  const done = checked.filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-2xl border-t-[5px] border-teal bg-white shadow-[0_18px_50px_rgba(5,72,57,0.14)] lg:grid lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
      <div className="min-w-0">
      <div className="relative aspect-video bg-[#1f2a25]">
        <video
          ref={video}
          src={p.src}
          poster={p.poster}
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          onClick={toggle}
          onPlay={() => {
            setPlaying(true);
            once("VideoStart");
          }}
          onPause={() => setPlaying(false)}
          onSeeked={(e) => {
            if (!e.currentTarget.ended) setEnded(false);
          }}
          onTimeUpdate={onTime}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (isFinite(d) && d > 0) setDur(d);
          }}
          onEnded={() => {
            setEnded(true);
            once("VideoComplete");
          }}
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label="Play video"
            className="absolute inset-0 flex w-full items-end gap-3 bg-gradient-to-b from-black/5 from-40% to-black/70 p-4 text-left text-white sm:gap-4 sm:p-6"
          >
            <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-purple motion-safe:animate-pulse sm:h-[68px] sm:w-[68px]">
              <svg viewBox="0 0 24 24" width="34" height="34" className="ml-1">
                <path d="M8 5v14l11-7z" fill="#fff" />
              </svg>
            </span>
            <span>
              <b className="block text-lg font-bold leading-tight sm:text-[22px]">{p.startTitle}</b>
              <span className="mt-0.5 block text-[13px] opacity-90 sm:text-[15px]">{p.startSub}</span>
            </span>
          </button>
        )}
        {ended && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-teal-50 to-white to-60% p-5 text-center">
            <b className="text-2xl text-teal-700 sm:text-[28px]">You&apos;re all set.</b>
            <span className="max-w-[340px] text-sm text-[#4A4A4A] sm:text-base">{p.endText}</span>
            <button
              type="button"
              onClick={() => seek(0)}
              className="mt-2 rounded-full border-2 border-purple bg-white px-5 py-2 text-[15px] font-semibold text-purple"
            >
              Watch again
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 px-3 pb-1 pt-3 sm:gap-2.5 sm:px-3.5">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-10 w-10 flex-none place-items-center rounded-full bg-teal text-white hover:bg-teal-700"
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d={playing ? "M7 5h4v14H7zM13 5h4v14h-4z" : "M8 5v14l11-7z"} fill="currentColor" />
          </svg>
        </button>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={Math.round(dur)}
          aria-valuenow={Math.round(time)}
          className="flex h-10 min-w-0 flex-1 cursor-pointer items-center gap-1"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            seek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * dur);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") seek(Math.min(dur, time + 5));
            if (e.key === "ArrowLeft") seek(Math.max(0, time - 5));
          }}
        >
          {p.chapters.map((c, i) => {
            const end = p.chapters[i + 1]?.[0] ?? dur;
            const fill = Math.max(0, Math.min(1, (time - c[0]) / (end - c[0])));
            return (
              <div
                key={c[1]}
                title={c[1]}
                style={{ flex: `${end - c[0]} 1 0` }}
                className="relative h-2.5 overflow-hidden rounded-full bg-sage-100"
              >
                <i
                  style={{ width: `${fill * 100}%` }}
                  className={`absolute inset-y-0 left-0 rounded-full ${i === idx ? "bg-purple" : "bg-teal"}`}
                />
              </div>
            );
          })}
        </div>
        <span className="min-w-[38px] flex-none text-right text-sm font-medium tabular-nums text-[#4A4A4A]">
          {fmt(dur - time)}
        </span>
        <button
          type="button"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={() => {
            const v = video.current;
            if (!v) return;
            v.muted = !v.muted;
            setMuted(v.muted);
          }}
          className="grid h-10 w-10 flex-none place-items-center rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100"
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path
              d={
                muted
                  ? "M4 9v6h4l5 4V5L8 9H4zm12.6 3 2.4-2.4-1.2-1.2-2.4 2.4-2.4-2.4v6l2.4-1.2 2.4 2.4 1.2-1.2z"
                  : "M4 9v6h4l5 4V5L8 9H4zm11.5 3a4 4 0 0 0-2-3.5v7a4 4 0 0 0 2-3.5z"
              }
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div ref={chipRow} className="flex gap-2 overflow-x-auto px-3.5 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {p.chapters.map((c, i) => (
          <button
            key={c[1]}
            type="button"
            onClick={() => seek(c[0])}
            className={`flex-none whitespace-nowrap rounded-full border-[1.5px] px-3.5 py-1.5 text-sm font-medium ${
              i === idx
                ? "border-purple bg-purple text-white"
                : i < idx
                  ? "border-teal-200 bg-teal-50 text-teal-700"
                  : "border-sage-100 bg-white text-[#4A4A4A] hover:border-teal"
            }`}
          >
            {c[1]}
          </button>
        ))}
      </div>

      </div>

      {p.aside ? (
        <div className="border-t border-sage-100 bg-gradient-to-b from-[#F7FCFA] to-white px-[18px] py-4 lg:flex lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:py-6">
          {p.aside}
        </div>
      ) : (
      <div className="border-t border-sage-100 bg-gradient-to-b from-[#F7FCFA] to-white px-[18px] pb-3 pt-3 lg:flex lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:py-6">
        <div className="flex items-baseline justify-between gap-3">
          <b className="text-xl">{p.checklistTitle}</b>
          <span className="text-sm font-semibold text-teal-700">
            {done === p.checklist.length ? "All set" : `${done} of ${p.checklist.length} ready`}
          </span>
        </div>
        <div className="mb-2 mt-2.5 h-1.5 overflow-hidden rounded-full bg-sage-100">
          <i
            className="block h-full rounded-full bg-teal transition-[width] duration-300"
            style={{ width: `${(done / p.checklist.length) * 100}%` }}
          />
        </div>
        <ul className="grid gap-x-5 sm:grid-cols-2 lg:grid-cols-1">
          {p.checklist.map((item, i) => (
            <li key={item}>
              <label className="flex cursor-pointer items-center gap-3 py-1.5 text-base leading-snug lg:py-2.5">
                <input type="checkbox" checked={checked[i]} onChange={() => tick(i)} className="peer sr-only" />
                <span className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full border-2 border-teal-200 transition peer-checked:border-teal peer-checked:bg-teal peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-purple">
                  <svg viewBox="0 0 24 24" width="16" height="16" className={checked[i] ? "opacity-100" : "opacity-0"}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={checked[i] ? "text-[#7b8a85]" : ""}>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}
