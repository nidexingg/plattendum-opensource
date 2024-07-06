<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/home')
  }
})
</script>

<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <h3 class="mb-3 text-center">
            <Icon
              name="ph:fingerprint-duotone"
              size="70"
            /><br>Authentication
          </h3>
          <div class="bg-white shadow rounded">
            <div class="row">
              <div class="col-md-7 pe-0">
                <div class="form-left h-100 py-5 px-5">
                  <form
                    action=""
                    class="row g-4"
                  >
                    <div class="col-12" />

                    <div class="col-12">
                      <div class="d-grid gap-2 m-2">
                        <small
                          class="text-center"
                          style="font-size: x-small"
                        >
                          <img
                            src="~/public/144.png"
                            alt="logo"
                            style="margin: 0 auto; display: block"
                          >
                          <br>Create Plattendum account <br>
                          with a single click below:</small>
                        <!-- removed sign-in with GitHub, only with Google
                        <button
                          class="btn btn-outline-success"
                          type="button"
                          @click="
                            auth.signInWithOAuth({
                              provider: 'github',
                              options: { redirectTo },
                            })
                          "
                        >
                          <Icon name="logos:github-icon" /> Sign in/up with
                          GitHub
                        </button>
                        -->
                        <button
                          class="btn btn-outline-success"
                          type="button"
                          @click="
                            auth.signInWithOAuth({
                              provider: 'google',
                              options: { redirectTo },
                            })
                          "
                        >
                          <Icon name="logos:google-icon" /> Sign in/up with
                          Google
                        </button>
                        <small
                          class="text-center"
                          style="font-size: xx-small"
                        ><Icon
                          name="tabler:heart-handshake"
                          size="24px"
                        /><br>We value your privacy. <br>Check 3<sup>rd</sup>
                          party privacy policy of Google OAuth<a
                            href="https://developers.google.com/identity/protocols/oauth2/policies"
                            target="_blank"
                          >
                            here.
                          </a></small>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-5 ps-0 d-none d-md-block">
                <div class="form-right h-100 bg-dark text-white text-center">
                  <img
                    src="~/public/192.png"
                    alt="logo"
                  >
                  <h2 class="fs-1">
                    Plattendum
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
