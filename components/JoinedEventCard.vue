<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();

interface Event {
  name: string;
  host: string;
  joined_at: string;
  created_on: string;
}

const props = defineProps<{
  name: string;
  host: string;
  joined_at: string;
  created_on: string;
}>();

// const { data: eventData, error: eventError } = await supabase.from('events').select("*").eq('host',props.host).single()

// console.log(props.host)
const { data: hostData, error } = await supabase
  .from("users")
  .select("*")
  .eq("id", props.host)
  .single();

// console.log(hostData)

const localEvent = ref<Event>({
  name: props.name, // fetched data from the database
  host: hostData.name, // fetched data from the database
  joined_at: props.joined_at,
  created_on: props.created_on,
});
</script>

<template>
  <!-- CARD COMPONENT -->
  <div class="list-group" style="margin-top: 18px">
    <div class="list-group-item list-group-item-action">
      <h6>{{ localEvent.name }}</h6>
      <div style="font-size: small">
        <p id="host">
          <Icon name="ic:baseline-account-circle" /> {{ t("home.host") }}:
          <b>{{ localEvent.host }}</b>
        </p>
        <p id="created_date">
          <Icon name="ic:round-calendar-month" /> {{ t("home.created_on") }}:
          <b>{{
            $dayjs(localEvent.created_on).format("DD/MM/YYYY hh:mm:ss a")
          }}</b>
        </p>
        <p id="joined_at">
          <Icon name="ic:baseline-person-add-alt-1" />
          {{ t("home.joined_at") }}:
          <b>{{
            $dayjs(localEvent.joined_at).format("DD/MM/YYYY hh:mm:ss a")
          }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
