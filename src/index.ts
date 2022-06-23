import { useEffect, useState } from 'react';

import { BeforeInstallPromptEvent, Options, ReturnType } from './types';

const usePWAInstall = (options?: Options): ReturnType => {
  const {
    acceptedFn = () => console.log('User accepted the A2HS prompt'),
    dismissedFn = () => console.log('User dismissed the A2HS prompt'),
    installedFn = () => console.log('Already installed'),
  } = { ...options };
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent] = useState<
    BeforeInstallPromptEvent
  >();
  const [isInstalled, setIsInstalled] = useState(false);

  const install = async () => {
    if (!beforeInstallPromptEvent) return false;

    beforeInstallPromptEvent.prompt();

    const { outcome } = await beforeInstallPromptEvent.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      acceptedFn();
    } else {
      dismissedFn();
    }
  };

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setBeforeInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (!beforeInstallPromptEvent) {
      setIsInstalled(true);
      installedFn();
    } else {
      setIsInstalled(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [installedFn]);

  useEffect(() => {
    const handler = () => {
      setIsInstalled(true);
      // For apply setIsInstalled(true) when install and popup new pwa
      window.location.reload();
    };

    window.addEventListener('appinstalled', handler);

    return () => {
      window.removeEventListener('appinstalled', handler);
    };
  }, []);

  return { isInstalled, install };
};

export default usePWAInstall;
