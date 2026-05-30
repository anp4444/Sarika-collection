'use client';

import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const tipRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
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
