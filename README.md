![Nuxt Fathom module](./.github/hero.png)

# Nuxt Fathom

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

> [Nuxt](https://nuxt.com) module to integrate [Fathom Analytics](https://usefathom.com/).

## Features

- ⚡ Automatic or manual tracking
- 📯 Automatically imported [composables](#composables)
- 🏷️ Fully typed Fathom API
- 🦾 SSR-ready
- 📂 [`.env` file support](#configuration)

## Setup

```bash
npx nuxi@latest module add fathom-analytics
```

## Basic Usage

Add `nuxt-fathom` to the `modules` section of your Nuxt configuration and provide your Fathom site ID.

```ts
// `nuxt.config.ts`
export default defineNuxtConfig({
  modules: ["nuxt-fathom"],

  fathom: {
    siteId: "FATHOM_SITE_ID",
  },
});
```

> Tip: you can also use an [.env file](#runtime-config) instead of a `fathom` key.

Done! Fathom Analytics will now run in your application's client.

## Configuration

All [supported module options](#module-options) can be configured using the `fathom` key in your Nuxt configuration:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-fathom'],

  fathom: {
    // The Fathom Analytics site ID to use for tracking
    siteId: string,
    // Additional configuration
    config: {
      manual?: boolean
      auto?: boolean
      honorDNT?: boolean
      canonical?: boolean
      spa?: 'auto' | 'history' | 'hash'
    }
  }
})
```

### Runtime Config

Instead of hard-coding your Fathom Analytics site ID in your Nuxt configuration, you can set your desired option in your project's `.env` file, leveraging [automatically replaced public runtime config values](https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig) by matching environment variables at runtime.

```ini
# Overwrites the `fathom.siteId` module option
NUXT_PUBLIC_FATHOM_SITE_ID=YOUR_SITE_ID
```

With this setup, you can omit the `fathom` key in your Nuxt configuration if you only intend to set the site ID.

## Module Options

| Property    | Type                        | Description                                                                                                                               | Default     |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `manual`    | `boolean`                   | If you want to manually control page view tracking.                                                                                       | `false`     |
| `auto`      | `boolean`                   | When `false`, skips automatically tracking page views on script load.                                                                     | `true`      |
| `honorDNT`  | `boolean`                   | When `true`, honors the [DNT header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DNT) in the visitor's browser.             | `false`     |
| `canonical` | `boolean`                   | When `false`, ignores the canonical tag if present.                                                                                       | `true`      |
| `spa`       | `'auto', 'history', 'hash'` | Accepts one of the following values: auto, history, or hash (see [advanced docs](https://usefathom.com/docs/script/script-advanced#spa)). | `undefined` |

## Composables

As with other composables in the Nuxt 3 ecosystem, they are auto-imported and can be used in your application's components.

### `useFathom`

The SSR-safe `useFathom` composable provides access to:

- The `blockTrackingForMe` method.
- The `enableTrackingForMe` method.
- The `isTrackingEnabled` method.
- The `setSite` method.
- The `trackEvent` method.
- The `trackPageview` method.

It can be used as follows:

```ts
// Each method is destructurable from the composable
const {
  blockTrackingForMe,
  enableTrackingForMe,
  isTrackingEnabled,
  setSite,
  trackEvent, // The method most likely to be used.
  trackPageview,
} = useFathom();
```

> [!NOTE]
> Since the `fathom` instance is available in the client only, any `useFathom` method calls executed on the server will have no effect.

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

## Credits

- [johannschopplich](https://github.com/johannschopplich/) for his nuxt-gtag project which inspired this.
- [derrickreimer](https://github.com/derrickreimer) for his fathom-client.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-fathom/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-fathom
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-fathom.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-fathom
[license-src]: https://img.shields.io/npm/l/nuxt-fathom.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-fathom
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
