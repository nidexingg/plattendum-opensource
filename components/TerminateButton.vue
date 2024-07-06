<script setup lang="ts">
import { useRouter } from "vue-router"; // Import for navigation

const router = useRouter();
const { t } = useI18n();
const localePath = useLocalePath();

const terminateProcess = () => {
  const confirmed = window.confirm(t("create.terminate_prompt"));

  if (confirmed) {
    // Handle termination logic here (e.g., API call, data update)
    router.push(localePath({ path: "/create" }));
  }
};
</script>

<template>
  <div class="d-grid gap-2" style="margin-top: 1rem">
    <button
      class="btn btn-outline-danger"
      type="button"
      @click="terminateProcess()"
    >
      <Icon name="ic:baseline-close" /> {{ t("create.terminate") }}
    </button>
  </div>
</template>
