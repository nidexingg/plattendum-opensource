<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
import { onMounted, ref } from "vue";

const selectedTheme = ref("light");

const changeTheme = () => {
  document.body.classList.toggle("dark-theme", selectedTheme.value === "dark");
  localStorage.setItem("theme", selectedTheme.value);
};

onMounted(() => {
  const currentTheme = localStorage.getItem("theme") || "light";
  selectedTheme.value = currentTheme;
  document.body.classList.toggle("dark-theme", currentTheme === "dark");
});
</script>
<template>
  <div class="bottom-navbar">
    <NuxtLink :to="localePath({ path: '/home' })" class="nav-item">
      <Icon name="ph:house-duotone" size="30" />
      <span>{{ t("navbar.home") }}</span>
    </NuxtLink>
    <NuxtLink :to="localePath({ path: '/create' })" class="nav-item">
      <Icon name="solar:calendar-add-bold-duotone" size="30" />
      <span>{{ t("navbar.create") }}</span>
    </NuxtLink>
    <NuxtLink :to="localePath({ path: '/join' })" class="nav-item">
      <Icon name="solar:code-scan-bold-duotone" size="30" />
      <span>{{ t("navbar.join") }}</span>
    </NuxtLink>
    <NuxtLink :to="localePath({ path: '/settings' })" class="nav-item">
      <Icon name="ph:gear-fine-duotone" size="30" />
      <span>{{ t("navbar.settings") }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
