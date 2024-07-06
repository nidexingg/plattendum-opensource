<template>
  <div v-if="i18nEnabled" class="form-floating">
    <select
      v-bind:value="localeIdentity"
      class="form-select"
      id="floatingSelect"
      style="border-radius: 15px"
      @change="changeLocale"
    >
      <option
        v-for="(locale, index) in locales"
        :key="index"
        :value="locale.code"
      >
        {{ localeMap[locale.code] }}
      </option>
    </select>
    <label for="floatingSelect"
      ><Icon name="bi:globe-asia-australia" />
      {{ t("settings.language") }}</label
    >
  </div>
  <div class="absolute top-0">
    <!-- dummy select to get the width of the select based on the selected item -->
    <select ref="switchWidthRef" style="visibility: hidden">
      <option>{{ localeMap[locale] }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { localeMap } from "~/i18n.config";

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const { t } = useI18n();
const localeIdentity = ref("");
const switchWidth = ref(0);
const switchWidthRef = ref<HTMLElement | null>(null);

const changeLocale = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const path = switchLocalePath(target.value);
  navigateTo(path);

  setTimeout(() => {
    switchWidth.value = switchWidthRef.value!.offsetWidth;
  }, 100);
};

const i18nEnabled = computed(() => {
  // returns true if the resulting path is not empty
  return switchLocalePath("en");
});

watch(locale, () => {
  localeIdentity.value = locale.value;
});

onMounted(() => {
  localeIdentity.value = locale.value;

  switchWidth.value = switchWidthRef.value!.offsetWidth;
});
</script>
