<script setup lang="ts">
import swal from "sweetalert";
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const name = ref("");
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const handleFormSubmit = async (event: Event) => {
  event.preventDefault(); // Prevent default form submission behavior
  // Check if form is valid
  const form = document.getElementById("form") as HTMLFormElement;
  if (form.checkValidity()) {
    const userId = user.value?.id;
    const url =
      name.value.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const { data, error } = await supabase.from("events").insert({
      name: name.value,
      host: userId,
      url: url,
    });
    // console.log(error)
    // Get current log user

    // Create new event on server
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
      title: t("create.success"),
    });
    router.push(localePath({ path: `/events/live/${url}` }));
  } else {
    form.reportValidity();
  }
};
</script>

<template>
  <title>{{ t("title.create") }}</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>{{ t("create.header") }}</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>

  <div class="content-container">
    <form
      id="form"
      class="needs-validation"
      novalidate
      @submit.prevent="handleFormSubmit"
    >
      <div class="input-group flex-nowrap">
        <span
          id="addon-wrapping"
          class="input-group-text"
          style="border-radius: 15px 0 0 15px"
          ><Icon name="ic:baseline-edit-calendar"
        /></span>
        <input
          id="eventinput"
          v-model="name"
          type="text"
          class="form-control"
          name="event_name"
          :placeholder="$t('create.eventname_phd')"
          aria-label="event_name"
          aria-describedby="addon-wrapping"
          style="border-radius: 0 15px 15px 0"
          required
        />
      </div>
      <small style="font-size: x-small">
        {{ t("create.policies") }} <br />
        <ul>
          <li>
            {{ t("create.policy1") }}
          </li>
          <li>
            {{ t("create.policy2") }}
          </li>
          <li>
            {{ t("create.policy3") }}
          </li>
          <li>
            {{ t("create.policy4") }}
          </li>
          <li>
            {{ t("create.policy5") }}
          </li>
        </ul>
      </small>
      <div class="d-grid gap-2" style="margin-top: 20px">
        <button class="btn btn-success" type="submit">
          {{ t("create.create") }}
        </button>
      </div>
    </form>
  </div>
  <NavBar />
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
