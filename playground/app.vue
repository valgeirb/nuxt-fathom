<template>
  <div>
    <nav>
      <NuxtLink to="/"> Home </NuxtLink>
      <NuxtLink to="/about"> About </NuxtLink>

      <button @click="trackEvent('this is the event')">Track event</button>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useFathom } from "#imports";

const {
  blockTrackingForMe,
  enableTrackingForMe,
  isTrackingEnabled,
  setSite,
  trackEvent,
  trackPageview,
} = useFathom();
</script>
