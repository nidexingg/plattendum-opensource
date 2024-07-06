<script setup lang="ts">
import { onMounted, ref } from "vue";
const { t } = useI18n();

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
  <div class="form-floating">
    <select
      id="floatingSelect"
      class="form-select"
      style="border-radius: 15px"
      v-model="selectedTheme"
      @change="changeTheme"
    >
      <option value="light">{{ t("settings.light") }}</option>
      <option value="dark">{{ t("settings.dark") }}</option>
    </select>
    <label for="floatingSelect" v-if="selectedTheme == 'dark'"
      ><Icon name="ph:moon-duotone" /> {{ t("settings.theme") }}</label
    >
    <label for="floatingSelect" v-else
      ><Icon name="ph:sun-duotone" /> {{ t("settings.theme") }}</label
    >
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
