<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import type { RealtimeChannel } from "@supabase/supabase-js";

const activeTab = ref("qr_code");

const { t } = useI18n();

const route = useRoute();
const event = route.params.eventname;
const supabase = useSupabaseClient();

const { data: eventData, error } = await supabase
  .from("events")
  .select("*")
  .eq("url", event)
  .single();

const { data: attendees, refresh: refreshAttendee } = await useAsyncData(
  "attendees",
  async () => {
    const { data, count } = await supabase
      .from("attendees")
      .select(
        `
    joined_date,
    users(*)
    `,
        { count: "exact" }
      )
      .eq("event_id", eventData.id);
    return { data, count };
  }
);

function loadSection(sectionId: string): void {
  activeTab.value = sectionId;
}
async function displayEventName() {
  console.log(attendees.value);
}

let realtimeChannel: RealtimeChannel;

onMounted(() => {
  realtimeChannel = supabase
    .channel("public:attendees")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "attendees" },
      () => refreshAttendee()
    );
  realtimeChannel.subscribe();
});
</script>

<template>
  <div>
    <title>WeAttend - {{ eventData.name }}</title>
    <nav>
      <div class="header-container">
        <div class="text-container">
          <h3>
            <Icon name="ic:baseline-calendar-month" />{{ eventData.name }}
          </h3>
        </div>
      </div>
    </nav>

    <div class="content-container">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <span class="nav-link disabled"
            ><Icon name="ic:round-groups" size="30" />
            <b>{{ attendees.count }}</b></span
          >
        </li>
        <li class="nav-item">
          <span class="nav-link disabled"
            ><Icon name="ic:round-calendar-month" size="30" />
            <b>{{
              $dayjs(eventData.created_on).format("DD/MM/YYYY hh:mm:ss")
            }}</b></span
          >
        </li>
      </ul>
      <div
        class="btn-group nav justify-content-center"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          id="btnradio1"
          type="radio"
          class="btn-check"
          name="btnradio"
          autocomplete="off"
          checked
          @click="loadSection('qr_code')"
        />
        <label class="btn btn-outline-success" for="btnradio1"
          ><Icon name="ic:baseline-qr-code-2" size="30" /><br />{{ t("create.qrcode") }}</label
        >

        <input
          id="btnradio2"
          type="radio"
          class="btn-check"
          name="btnradio"
          autocomplete="off"
          @click="loadSection('attendee_list')"
        />
        <label class="btn btn-outline-success" for="btnradio2"
          ><Icon name="ic:round-groups" size="30" /><br />{{ t("create.attendee_list") }}</label
        >
      </div>
      <div style="margin-top: 10px" />
​​
      <!-- QR code section -->
      <section v-show="activeTab === 'qr_code'" id="qr_code">
        <div class="qr-box" @click="displayEventName">
          <img
            :src="`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${event}`"
            alt="QR Code"
          />
        </div>
        <p class="text-center justify">
          <Icon name="solar:scanner-bold" size="60" />
          <br />
          {{ t("create.instruction1") }}
        </p>
      </section>

      <!-- Attendee list section -->
      <section v-show="activeTab === 'attendee_list'" id="attendee_list">
        <AttendeeCard
          v-for="(item, index) in attendees.data"
          :key="index"
          :name="item.users.name"
          :avatar="item.users.avatar"
          :joined="item.joined_date"
        />
      </section>
      <TerminateButton />
    </div>
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
