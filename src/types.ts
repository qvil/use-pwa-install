export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface Options {
  acceptedFn?: () => void;
  dismissedFn?: () => void;
  installedFn?: () => void;
}

export interface ReturnType {
  isInstalled: boolean;
  install: () => Promise<false | void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
