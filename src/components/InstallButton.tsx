'use client';

import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const tipRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as NavigatorWithStandalone).standalone;
    const installCheck = window.setTimeout(() => setIsInstalled(Boolean(standalone)), 0);
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.clearTimeout(installCheck);
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      setShowTip(true);
      if (tipRef.current) clearTimeout(tipRef.current);
      tipRef.current = setTimeout(() => setShowTip(false), 3000);
    }
  };

  if (isInstalled) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleInstall}
        className="p-2 text-[#3b1c17] hover:text-[#941424] hover:bg-[#f4e6d2] rounded-lg transition-all"
        title="Install App"
        style={{ touchAction: 'manipulation', minHeight: '44px', minWidth: '44px' }}
      >
        <Download size={20} />
      </button>
      {showTip && (
        <div
          className="absolute top-full right-0 mt-2 bg-[#3b1c17] text-white text-xs rounded-xl px-4 py-2.5 shadow-xl whitespace-nowrap z-50"
          style={{ touchAction: 'manipulation', minWidth: '180px' }}
        >
          Open in Chrome → ⋮ menu → Add to Home Screen
        </div>
      )}
    </div>
  );
}
