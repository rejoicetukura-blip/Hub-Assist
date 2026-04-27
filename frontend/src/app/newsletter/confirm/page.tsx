"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NewsLetterConfirm } from "@/components/ui/NewsLetterConfirm";

type Status = "loading" | "success" | "error";

export default function NewsletterConfirmPage() {
  const token = useSearchParams().get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`/api/newsletter/confirm?token=${encodeURIComponent(token)}`)
      .then((res) => {
        setStatus(res.ok ? "success" : "error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  return <NewsLetterConfirm status={status} />;
}
