<script setup lang="ts">
import { ref } from "vue";

const { t } = useI18n();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const activeTab = ref("my_event");

function loadSection(sectionId: string): void {
  activeTab.value = sectionId;
}

const userID = user.value?.id;

const { data: joinedEvents, refresh: Refresh } = await useAsyncData(
  "joinedEvents",
  async () => {
    const { data } = await supabase
      .from("attendees")
      .select(
        `
    joined_date,
    events(*)
    `
      )
      .eq("user_id", userID);
    return data;
  }
);

const { data: myEvents, refresh: RefreshEvent } = await useAsyncData(
  "myEvents",
  async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("host", userID);
    return data;
  }
);

function searchMyEvent(): void {
  let input: string = (
    document.getElementById("searchMyEvent") as HTMLInputElement
  ).value;
  input = input.toLowerCase();
  let x: HTMLCollectionOf<Element> =
    document.getElementsByClassName("searchMyEvent");

  for (let i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      (x[i] as HTMLElement).style.display = "none";
    } else {
      (x[i] as HTMLElement).style.display = "list-item";
    }
  }
}

function searchJoinedEvent(): void {
  let input: string = (
    document.getElementById("searchJoinedEvent") as HTMLInputElement
  ).value;
  input = input.toLowerCase();
  let x: HTMLCollectionOf<Element> =
    document.getElementsByClassName("searchJoinedEvent");

  for (let i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      (x[i] as HTMLElement).style.display = "none";
    } else {
      (x[i] as HTMLElement).style.display = "list-item";
    }
  }
}

const searchMyEventInput = ref<HTMLInputElement | null>(null);
const searchJoinedEventInput = ref<HTMLInputElement | null>(null);

const focusInputOnKeyCombination = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (activeTab.value === "my_event" && searchMyEventInput.value) {
      searchMyEventInput.value.focus();
    } else if (
      activeTab.value === "joined_event" &&
      searchJoinedEventInput.value
    ) {
      searchJoinedEventInput.value.focus();
    }
  }
};

onMounted(() => {
  document.addEventListener("keydown", focusInputOnKeyCombination);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", focusInputOnKeyCombination);
});

useSeoMeta({
  title: t("title.home"),
  ogTitle: t("title.home"),
  description: t("seo.description"),
  ogDescription: t("seo.description"),
  ogImage: "https://cloudmariazona.vercel.app/img/seo/weattend.png",
  twitterCard: "summary_large_image",
});

// export default {
//   data() {
//     return {
//       activeTab: "my_event",
//     };
//   },
//   methods: {
//     loadSection(sectionId: string): void {
//       this.activeTab = sectionId;
//     },
//   },
// };
</script>

<template>
  <title>{{ t("title.home") }}</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>{{ t("home.header") }}</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>

  <div class="content-container">
    <div
      class="btn-group nav justify-content-center"
      role="group"
      aria-label="Basic radio toggle button group"
      style="margin-top: 10px"
    >
      <input
        id="btnradio1"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
        checked
        @click="loadSection('my_event')"
      />
      <label class="btn btn-outline-success" for="btnradio1"
        ><Icon name="f7:person-2-square-stack-fill" size="30" /><br />{{
          t("home.my_event")
        }}</label
      >

      <input
        id="btnradio2"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
        @click="loadSection('joined_event')"
      />
      <label class="btn btn-outline-success" for="btnradio2"
        ><Icon name="ic:round-groups" size="30" /><br />{{
          t("home.joined_event")
        }}</label
      >
    </div>

    <div style="margin-top: 1rem" />

    <section v-show="activeTab === 'my_event'" id="my_event">
      <!-- searchbar -->
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="My Event"
          id="searchMyEvent"
          ref="searchMyEventInput"
          @keyup="searchMyEvent"
        />
        <label for="floatingInput"
          ><Icon name="solar:calendar-search-bold-duotone" />
          {{ t("home.search") }} <UKbd>⌘/Ctrl+K</UKbd></label
        >
      </div>

      <div id="list" style="flex-direction: column-reverse; display: flex">
        <MyEventCard
          v-for="(item, index) in myEvents"
          :key="index"
          :name="item.name"
          :event-id="item.id"
          :created-on="item.created_at"
          :url="item.url"
          class="searchMyEvent"
        />
      </div>
    </section>

    <section v-show="activeTab === 'joined_event'" id="joined_event">
      <!-- searchbar -->
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="My Event"
          id="searchJoinedEvent"
          ref="searchJoinedEventInput"
          @keyup="searchJoinedEvent"
        />
        <label for="floatingInput"
          ><Icon name="solar:calendar-search-bold-duotone" />
          {{ t("home.search") }} <UKbd>⌘/Ctrl+K</UKbd></label
        >
      </div>
      <div id="list" style="flex-direction: column-reverse; display: flex">
        <JoinedEventCard
          v-for="(item, index) in joinedEvents"
          :key="index"
          :name="item.events.name"
          :host="item.events.host"
          :joined_at="item.joined_date"
          :created_on="item.events.created_at"
          class="searchJoinedEvent"
        />
      </div>
    </section>
  </div>
  <NavBar />
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
