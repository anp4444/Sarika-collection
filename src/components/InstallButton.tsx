'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

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
    }
  };

  if (isInstalled) return null;

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="p-2 text-[#3b1c17] hover:text-[#941424] hover:bg-[#f4e6d2] rounded-lg transition-all"
      title="Install App"
      style={{ touchAction: 'manipulation', minHeight: '44px', minWidth: '44px' }}
    >
      <Download size={20} />
    </button>
  );
}
