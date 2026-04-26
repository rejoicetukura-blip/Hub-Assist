"use client";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "success" | "error";

interface NewsLetterConfirmProps {
  status: Status;
}

export function NewsLetterConfirm({ status }: NewsLetterConfirmProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#C5BEB6] p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#F3EBE2] p-8 shadow-sm text-center">
        <h1 className="mb-6 text-2xl font-semibold text-[#1A1A1A]">HubAssist Newsletter</h1>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 text-[#6B6B6B]">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Confirming your subscription…</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="h-10 w-10 text-[#A8C5A0]" />
            <p className="text-base font-medium text-[#1A1A1A]">Your subscription is confirmed!</p>
            <p className="text-sm text-[#6B6B6B]">Thanks for subscribing. You&apos;ll hear from us soon.</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3">
            <XCircle className="h-10 w-10 text-[#D4916E]" />
            <p className="text-base font-medium text-[#1A1A1A]">Invalid or expired link</p>
            <p className="text-sm text-[#6B6B6B]">This confirmation link is no longer valid.</p>
          </div>
        )}
      </div>
    </div>
  );
}
