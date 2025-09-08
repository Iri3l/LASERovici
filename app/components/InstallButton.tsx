"use client";

import { useEffect, useState } from "react";

type DeferredPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallButton() {
  const [deferred, setDeferred] = useState<DeferredPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));
    // @ts-ignore - supported in Safari
    const standaloneIOS = window.navigator.standalone === true;
    const standaloneMedia = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standaloneIOS || standaloneMedia);

    const onBIP = (e: Event) => {
      e.preventDefault();
      setDeferred(e as DeferredPrompt);
    };
    const onInstalled = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") setDeferred(null);
  };

  if (installed || isStandalone) return null;

  if (isIOS) {
    return (
      <div className="rounded-2xl border p-3 text-sm flex items-center gap-2">
        <span>📲</span>
        <span>
          On iPhone: tap <strong>Share</strong> → <strong>Add to Home Screen</strong> to install.
        </span>
      </div>
    );
  }

  if (deferred) {
    return (
      <button
        onClick={handleInstall}
        className="px-4 py-2 rounded-2xl border shadow-sm hover:shadow transition"
      >
        Install app
      </button>
    );
  }

  return null;
}
