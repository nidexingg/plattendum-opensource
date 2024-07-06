<script setup lang="ts">
import Swal from "sweetalert2";
const client = useSupabaseClient();
const user = useSupabaseUser();
const isOpen = ref(false);
const { t } = useI18n();
import type { FormError, FormErrorEvent, FormSubmitEvent } from "#ui/types";

const handleFormSubmit = async (event: Event) => {
  event.preventDefault(); // Prevent default form submission behavior
  // Check if form is valid
  const form = document.getElementById("form") as HTMLFormElement;
  if (form.checkValidity()) {
    let timerInterval: NodeJS.Timeout | undefined;

    Swal.fire({
      title: t("reportissue.sweetalertheader"),
      html: "Success in <b></b> milliseconds.",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        if (timer) {
          timerInterval = setInterval(() => {
            if (Swal.getTimerLeft()) {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }
          }, 100);
        }
      },
      willClose: () => {
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
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
          title: t("reportissue.toast"),
        });
      }
    });

    form.submit();
  } else {
    form.reportValidity();
  }
};
</script>

<template>
  <div>
    <div class="d-grid gap-2 text-center" style="margin-top: 1rem">
      <a type="button" label="Open" @click="isOpen = true">{{
        t("settings.report")
      }}</a>
    </div>

    <UModal v-model="isOpen" prevent-close class="dark:bg-black">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between h-1">
            <p
              class="text-base font-semibold leading-6 text-gray-900 dark:text-black"
            >
              <Icon name="noto:megaphone" /> {{ t("reportissue.header") }}
            </p>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <form
          id="form"
          @submit.prevent="handleFormSubmit"
          action="https://formsubmit.co/3a85bfa8b6777fa623c05e0b17d3a844"
          method="POST"
        >
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInputDisabled"
              name="username"
              :value="user?.user_metadata.full_name"
              readonly
            />
            <label for="floatingInputDisabled">{{
              t("reportissue.reporter")
            }}</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInputDisabled"
              name="email"
              :value="user?.user_metadata.email"
              readonly
            />
            <label for="floatingInputDisabled">{{
              t("reportissue.email")
            }}</label>
          </div>

          <div class="form-floating">
            <textarea
              class="form-control"
              id="floatingTextarea"
              name="message"
              required
            ></textarea>
            <label for="floatingTextarea">{{ t("reportissue.message") }}</label>
          </div>
          <div class="d-grid gap-2" style="margin-top: 1rem">
            <button class="btn btn-success" type="submit">
              {{ t("reportissue.submit") }} <Icon name="iconamoon:send-duotone"/>
            </button>
          </div>
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://weattend.vercel.app/settings"
          />
        </form>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
