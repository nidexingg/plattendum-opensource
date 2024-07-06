<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
</script>

<template>
  <div class="right-image-container">
    <img
      class="user-avatar"
      :src="user?.user_metadata.avatar_url"
      alt="user-avatar"
    >
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
