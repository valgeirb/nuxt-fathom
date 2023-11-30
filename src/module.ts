import {
  defineNuxtModule,
  addPlugin,
  addImports,
  createResolver,
} from "@nuxt/kit";
import { defu } from "defu";
import type { LoadOptions } from "fathom-client";

export type Options = LoadOptions & {
  manual?: boolean;
};

export interface ModuleOptions {
  siteId: string;
  config?: Options;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "fathom",
    configKey: "fathom",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    siteId: "",
    config: {
      manual: false,
    },
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Add module options to public runtime config
    nuxt.options.runtimeConfig.public.fathom = defu(
      nuxt.options.runtimeConfig.public.fathom,
      options
    );

    addPlugin(resolver.resolve("./runtime/plugin.client"));
    addImports({
      name: "useFathom",
      as: "useFathom",
      from: resolver.resolve("runtime/composables/useFathom"),
    });
  },
});
