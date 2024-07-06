<!-- ត្រូវការ ៣ តម្លៃ ពី Database: Attendee Profile, Attendee name, Attendee JoinedAt -->
<script setup lang="ts">
const {t} = useI18n();

interface Attendee {
  name: string
  joined_at: string
  profile_picture: string
}
const props = defineProps<{
  name: string
  joined: string
  avatar: string
}>()

const attendee = ref<Attendee>({
  name: props.name, // fetched data from the database
  joined_at: props.joined, // fetched data from the database
  profile_picture:
    props.avatar,
})
</script>

<template>
  <!-- CARD COMPONENT -->
  <div class="list-group">
    <div
      class="list-group-item list-group-item-action d-flex align-items-center"
    >
      <div class="profile-picture me-3">
        <img
          :src="attendee.profile_picture"
          width="100%"
          alt="Profile Picture"
        >
      </div>
      <div class="content">
        <h6>{{ attendee.name }}</h6>
        <p id="joined_at">
          <Icon name="ic:baseline-person-add-alt-1" /> {{ t("home.joined_at") }}:
          <b>{{ $dayjs(attendee.joined_at).format('DD/MM/YYYY hh:mm:ss a') }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
