<script setup lang="ts">
const supabase = useSupabaseClient()
const {t} = useI18n();
const localePath = useLocalePath();

interface Event {
  name: string
  attends: string
  created_on: string
  url: string
}

const props = defineProps<{
  eventId: string
  url: string
  name: string
  createdOn: string
}>()

const user = useSupabaseUser()

const { data: eventData, count: Count } = await supabase.from('attendees').select('*', { count: 'exact' }).eq('event_id', props.eventId)
// console.log(Count)
// console.log(eventData)

const localEvent = ref<Event>({
  name: props.name, // fetched data from the database
  attends: Count, // fetched data from the database
  created_on: props.createdOn,
  url: props.url,
})
</script>

<template>
  <!-- CARD COMPONENT -->
  <div class="list-group">
    <NuxtLink
      :to="localePath({ path: `/events/${localEvent.url}` })"
      type="button"
      class="list-group-item list-group-item-action"
    >
      <h6>{{ localEvent.name }}</h6>
      <div style="font-size: small">
        <p id="attendee_total">
          <Icon name="ic:round-groups" /> {{ t("home.attendee") }}: <b>{{ localEvent.attends }}</b>
        </p>
        <p id="created_date">
          <Icon name="ic:round-calendar-month" /> {{ t("home.created_on") }}:
          <b>{{ $dayjs(localEvent.created_on).format('DD/MM/YYYY hh:mm:ss a') }}</b>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
