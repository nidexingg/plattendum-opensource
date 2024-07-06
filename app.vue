<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
if (typeof document !== "undefined") {
  // Prevent zooming via Ctrl+/- or Ctrl+mousewheel
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "+" ||
        event.key === "-" ||
        event.key === "=" ||
        event.key === "0")
    ) {
      event.preventDefault();
    }
  });

  // Prevent zooming via mousewheel
  document.addEventListener(
    "wheel",
    (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  // Prevent pinch-to-zoom
  document.addEventListener(
    "touchmove",
    (event: TouchEvent) => {
      const touches = event.changedTouches;
      if (touches.length === 2) {
        const initialDistance = Math.hypot(
          touches[0].clientX - touches[1].clientX,
          touches[0].clientY - touches[1].clientY
        );
        const currentDistance = Math.hypot(
          touches[0].clientX - touches[1].clientX,
          touches[0].clientY - touches[1].clientY
        );
        if (
          initialDistance !== 0 &&
          currentDistance !== 0 &&
          currentDistance / initialDistance > 1
        ) {
          event.preventDefault();
        }
      }
    },
    { passive: false }
  );
}
</script>

<style>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
