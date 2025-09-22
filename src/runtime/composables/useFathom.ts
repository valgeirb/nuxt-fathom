import * as fathom from "fathom-client";

function safeFathomCall<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (import.meta.client) return fn(...args);
  };
}

// Only allow function keys from the module
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...a: any[]) => any ? K : never;
}[keyof T];

const fathomKeys = [
  "blockTrackingForMe",
  "enableTrackingForMe",
  "isTrackingEnabled",
  "setSite",
  "trackEvent",
  "trackPageview",
] as const satisfies readonly FunctionKeys<typeof fathom>[];

type FathomKeys = (typeof fathomKeys)[number];
type Wrap<T> = T extends (...a: infer A) => infer R
  ? (...a: A) => R | undefined
  : never;

type FathomAPI = { [K in FathomKeys]: Wrap<(typeof fathom)[K]> };

export function useFathom(): FathomAPI {
  const entries = fathomKeys.map(
    (k) => [k, safeFathomCall(fathom[k])] as const
  );
  return Object.fromEntries(entries) as FathomAPI;
}
