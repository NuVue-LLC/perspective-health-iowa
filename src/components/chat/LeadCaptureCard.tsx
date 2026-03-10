"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^[\d\s\-\(\)\+]{7,20}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  service: z.string().optional(),
  message: z.string().max(500, "Message is too long").optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface LeadCaptureCardProps {
  onSubmitSuccess: () => void;
  onDismiss: () => void;
}

export function LeadCaptureCard({ onSubmitSuccess, onDismiss }: LeadCaptureCardProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitStatus("success");
      setTimeout(onSubmitSuccess, 1500);
    } catch {
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="flex items-start mb-3">
        <div className="bg-sage-100 rounded-2xl rounded-tl-sm px-4 py-4 max-w-[85%]">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-medium">Request sent! We&apos;ll be in touch soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start mb-3">
      <div className="bg-sage-100 rounded-2xl rounded-tl-sm px-4 py-4 max-w-[85%] w-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-charcoal">Request a Callback</h3>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Dismiss form"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          {/* Name */}
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Your name *"
              autoComplete="name"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-xs text-charcoal placeholder-gray-400 bg-white",
                "focus:outline-none focus:ring-1 focus:ring-teal focus:border-transparent",
                errors.name ? "border-red-400" : "border-gray-200"
              )}
            />
            {errors.name && (
              <p className="mt-0.5 text-red-500 text-[10px] flex items-center gap-0.5">
                <AlertCircle size={10} /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email address *"
              autoComplete="email"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-xs text-charcoal placeholder-gray-400 bg-white",
                "focus:outline-none focus:ring-1 focus:ring-teal focus:border-transparent",
                errors.email ? "border-red-400" : "border-gray-200"
              )}
            />
            {errors.email && (
              <p className="mt-0.5 text-red-500 text-[10px] flex items-center gap-0.5">
                <AlertCircle size={10} /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone number (optional)"
              autoComplete="tel"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-xs text-charcoal placeholder-gray-400 bg-white",
                "focus:outline-none focus:ring-1 focus:ring-teal focus:border-transparent",
                errors.phone ? "border-red-400" : "border-gray-200"
              )}
            />
            {errors.phone && (
              <p className="mt-0.5 text-red-500 text-[10px] flex items-center gap-0.5">
                <AlertCircle size={10} /> {errors.phone.message}
              </p>
            )}
          </div>

          {/* Service */}
          <select
            {...register("service")}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-charcoal bg-white focus:outline-none focus:ring-1 focus:ring-teal focus:border-transparent"
          >
            <option value="">Service interest (optional)</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="General Inquiry">General Inquiry</option>
          </select>

          {/* Message */}
          <textarea
            {...register("message")}
            rows={2}
            placeholder="Anything you'd like us to know? (optional)"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-charcoal placeholder-gray-400 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-teal focus:border-transparent"
          />

          {/* Trust signal */}
          <p className="text-[10px] text-gray-400 text-center">
            Contact info only. No health data collected.
          </p>

          {/* Error state */}
          {submitStatus === "error" && (
            <p className="text-red-500 text-[10px] text-center">
              Something went wrong. Please try again or call (515) 724-0377.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitStatus === "submitting"}
            className={cn(
              "w-full flex items-center justify-center gap-1.5 rounded-lg bg-purple text-white py-2 text-xs font-medium transition-colors hover:bg-purple/90",
              submitStatus === "submitting" && "opacity-70 cursor-not-allowed"
            )}
          >
            {submitStatus === "submitting" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Send Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
