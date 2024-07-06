<script setup lang="ts">
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/home");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="loading">
    <div class="loading-text">
      <span class="loading-text-words">R</span>
      <span class="loading-text-words">E</span>
      <span class="loading-text-words">D</span>
      <span class="loading-text-words">I</span>
      <span class="loading-text-words">R</span>
      <span class="loading-text-words">E</span>
      <span class="loading-text-words">C</span>
      <span class="loading-text-words">T</span>
      <span class="loading-text-words">I</span>
      <span class="loading-text-words">N</span>
      <span class="loading-text-words">G</span>
      <span class="loading-text-words">...</span>
    </div>
  </div>
</template>
<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
