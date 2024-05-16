import { defineNuxtPlugin } from "#app";
import { useRuntimeConfig, useRoute, watch } from "#imports";
import { load } from "fathom-client";
import type { ModuleOptions } from "../module";
import { useFathom } from "./composables/useFathom";

export default defineNuxtPlugin(() => {
  const {
    fathom: { siteId, config },
  } = useRuntimeConfig().public as {
    fathom: ModuleOptions;
  };

  if (!siteId) return;

  load(siteId, config);

  if (!config?.manual) {
    const { trackPageview } = useFathom();
    const route = useRoute();

    watch(
      () => route.path,
      () => {
        trackPageview({ url: route.fullPath });
      }
    );
  }
});
