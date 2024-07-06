<template>
  <div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="My Event"
        id="searchbar"
      />
      <label for="floatingInput"
        ><Icon name="solar:calendar-search-bold-duotone" />
        {{ t("home.search") }}</label
      >
    </div>
  </div>
</template>

<script setup>
const {t} =useI18n();
</script>
