<script setup lang="ts">
import { useRoute } from "vue-router";
import XLSX from "xlsx";
import dayjs from "dayjs";
import type { RealtimeChannel } from "@supabase/supabase-js";
import Swal from "sweetalert2";


const { t } = useI18n();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const route = useRoute();
const event = route.params.eventname;

const { data: eventData, error } = await supabase
  .from("events")
  .select("*")
  .eq("url", event)
  .single();

const { data: Count } = await useAsyncData("Count", async () => {
  const { data, count } = await supabase
    .from("attendees")
    .select("*", { count: "exact" })
    .eq("event_id", eventData.id);
  return count;
});

const { data: attendees, refresh: refreshAttendee } = await useAsyncData(
  "attendees",
  async () => {
    const { data } = await supabase
      .from("attendees")
      .select(
        `
    joined_date,
    users(*)
    `
      )
      .eq("event_id", eventData.id);
    return data;
  }
);

onMounted(() => {
  const realtimeChannel = supabase
    .channel("public:attendees")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "attendees" },
      () => refreshAttendee()
    );
  realtimeChannel.subscribe();
});

const exportdata = [
  [
    "EVENT CREATION DATE /កាលបរិច្ឆេទបង្កើតព្រឹត្តិការណ៍:",
    dayjs(eventData.created_at).format("DD/MM/YYYY hh:mm:ss a"),
  ],
  ["ATTENDEE TOTAL /ចំនួនអ្នកចូលរួមសរុប:", Count.value],
  ["ATTENDEE NAME LIST / បញ្ជីឈ្មោះអ្នកចូលរួម", "JOINED AT / ថេរវេលាចូលរួម"],
  ...attendees.value.map((att) => [
    att.users.name,
    dayjs(att.joined_date).format("DD/MM/YYYY hh:mm:ss a"),
  ]),
];

const exportData = () => {
  const ws = XLSX.utils.aoa_to_sheet(exportdata);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${eventData.name}.xlsx`);
  const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: t("home.export_toast"),
        });
};
</script>

<template>
  <title>WeAttend - {{ eventData.name }}</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>{{ eventData.name }}</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>
  <div class="content-container">
    <div class="alert alert-success" role="alert" style="border-radius: 15px">
      <Icon name="ic:round-groups" /> {{ t("home.attendee") }}:
      <b>{{ Count }}</b>
      <br />
      <Icon name="ic:round-calendar-month" /> {{ t("home.created_on") }}:
      <!-- <b>{{eventData.created_at}}</b> -->
      <b>{{ $dayjs(eventData.created_at).format("DD/MM/YYYY hh:mm:ss a") }}</b>
    </div>
    <AttendeeCard
      v-for="(item, index) in attendees"
      :key="index"
      :name="item.users.name"
      :avatar="item.users.avatar"
      :joined="item.joined_date"
    />
    <!-- do nothing yet: export function -->
    <div class="d-grid gap-2" style="margin-top: 1rem">
      <button class="btn btn-success" type="button" @click="exportData">
        <Icon name="vscode-icons:file-type-excel" size="32" />
        {{ t("home.export") }}
      </button>
    </div>
  </div>
  <NavBar />
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
