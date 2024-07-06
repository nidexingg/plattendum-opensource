<script setup lang="ts">
const { t } = useI18n();
const colorMode = useColorMode();

const client = useSupabaseClient();
const user = useSupabaseUser();

const confirmSignOut = async () => {
  const confirmed = confirm(t("settings.confirm"));
  if (confirmed) {
    await client.auth.signOut();
    navigateTo("/");
  }
};
type Theme = "light" | "dark";

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};

useSeoMeta({
  title: t("title.settings"),
  ogTitle: t("title.settings"),
  description: t("seo.description"),
  ogDescription: t("seo.description"),
  ogImage: "https://cloudmariazona.vercel.app/img/seo/weattend.png",
  twitterCard: "summary_large_image",
});
</script>
<template>
  <title>{{ t("title.settings") }}</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>{{ t("settings.header") }}</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>

  <div class="content-container">
    <div class="text-center">
      <img
        :src="user?.user_metadata.avatar_url"
        class="rounded mx-auto d-block"
        width="90px"
        height="90px"
        alt="user_avatar"
      />
      <h3 style="margin-top: 20px">
        {{ user?.user_metadata.full_name }}
        <a
          href="https://myaccount.google.com/personal-info?hl=en&utm_source=OGB&utm_medium=act"
          target="_blank"
          ><abbr :title="t('settings.editprofile')"><Icon name="solar:pen-new-square-line-duotone" /></abbr
        ></a>
      </h3>
      <p>
        <span class="badge rounded-pill text-bg-dark"
          ><Icon name="logos:google-icon" size="15" />
          {{ user?.user_metadata.email }}</span
        >
      </p>
      <p>
        <Icon name="tabler:heart-handshake" size="24" /><br />
        {{ t("settings.created_on") }} :
        {{ $dayjs(user?.created_at).format("DD/MM/YYYY hh:mm:ss a") }}
      </p>
    </div>
    <div class="d-grid gap-2" style="margin-top: 20px">
      <LangSwitcher />
      <!-- <div class="form-floating">
        <select
          class="form-select"
          id="floatingSelect"
          style="border-radius: 15px"
          v-model="$colorMode.preference"
        >
          <option value="system">{{ t("settings.system") }}</option>
          <option value="light">{{ t("settings.light") }}</option>
          <option value="dark">{{ t("settings.dark") }}</option>
          <option value="sepia">{{ t("settings.sepia") }}</option>
        </select>
        <label for="floatingSelect" v-if="$colorMode.value == 'dark'"
          ><Icon name="ph:moon-duotone" /> {{ t("settings.theme") }}</label
        >
        <label for="floatingSelect" v-else
          ><Icon name="ph:sun-duotone" /> {{ t("settings.theme") }}</label
        >
      </div> -->
      <UIThemeSwitcher />
      <button
        v-if="user"
        class="btn btn-outline-danger"
        @click="confirmSignOut"
        type="button"
      >
        <Icon name="material-symbols:digital-out-of-home" />
        {{ t("settings.signout") }}
      </button>
    </div>
    <UIReport />
  </div>
  <NavBar />
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
