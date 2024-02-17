import * as fathom from "fathom-client";
import type { EventOptions, PageViewOptions } from "fathom-client";

function safeFathomCall<T extends (...args: any[]) => any>(fathomFunction: T) {
  return (...args: Parameters<T>) => {
    if (import.meta.client) {
      return fathomFunction(...args);
    }
  };
}

type FathomAPI = {
  blockTrackingForMe: () => void;
  enableTrackingForMe: () => void;
  isTrackingEnabled: () => boolean;
  setSite: (id: string) => void;
  trackEvent: (eventName: string, opts?: EventOptions) => void;
  trackPageview: (opts?: PageViewOptions) => void;
};

const fathomFunctions = [
  "blockTrackingForMe",
  "enableTrackingForMe",
  "isTrackingEnabled",
  "setSite",
  "trackEvent",
  "trackPageview",
] as const;

export function useFathom(): FathomAPI {
  return fathomFunctions.reduce((api, functionName) => {
    api[functionName] = safeFathomCall(fathom[functionName]);
    return api;
  }, {} as FathomAPI);
}
