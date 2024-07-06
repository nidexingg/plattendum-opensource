<script setup lang="ts">
const {t} =useI18n();
useSeoMeta({
  title: t("title.auth"),
  ogTitle: t("title.auth"),
  description: t("seo.description"),
  ogDescription: t("seo.description"),
  ogImage: "https://cloudmariazona.vercel.app/img/seo/weattend.png",
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <title>{{ t("title.auth") }}</title>
  <div class="container p-2">
    <Auth />
  </div>
</template>
