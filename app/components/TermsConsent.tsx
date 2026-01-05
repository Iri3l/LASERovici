// app/components/TermsConsent.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "laserovici.terms.acceptedAt.v1";

export function useTermsConsent() {
  const [acceptedAt, setAcceptedAt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v) setAcceptedAt(v);
    } catch {}
  }, []);

  const accept = () => {
    const ts = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, ts);
    } catch {}
    setAcceptedAt(ts);
  };

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setAcceptedAt(null);
  };

  return { accepted: !!acceptedAt, acceptedAt, accept, reset };
}

export default function TermsConsentModal({
  open,
  onClose,
  onAccept,
}: {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // reset checkbox when opening/closing
    if (open) setChecked(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tc-title"
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
        <div className="p-5 border-b">
          <h2 id="tc-title" className="text-lg font-semibold text-gray-900">
            Terms & Conditions
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Please read and accept our Terms & Conditions before completing checkout.
          </p>
        </div>

        <div className="p-5">
          <div className="prose prose-sm max-w-none text-gray-800">
            <p>
              By proceeding, you agree to our{" "}
              <Link href="/terms" target="_blank" className="text-cyan-600 underline underline-offset-4">
                Terms &amp; Conditions
              </Link>{" "}
              and acknowledge our{" "}
              <Link href="/privacy" target="_blank" className="text-cyan-600 underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
            <ul className="list-disc pl-5">
              <li>Custom engraving is produced as per your submitted design.</li>
              <li>Lead times start after design approval and payment.</li>
              <li>Returns are limited for personalised items (see policy).</li>
            </ul>
          </div>

          <label className="mt-4 flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={checked}
              onChange={(e) => setChecked(e.currentTarget.checked)}
            />
            <span className="text-sm text-gray-700">
              I have read and accept the Terms &amp; Conditions.
            </span>
          </label>
        </div>

        <div className="p-5 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!checked}
            onClick={() => {
              onAccept();    // parent will persist + continue
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:from-cyan-600 hover:to-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
