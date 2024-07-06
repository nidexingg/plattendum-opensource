<script lang="ts">
export default {
  data() {
    return {
      activeTab: 'qr_code',
    }
  },
  methods: {
    loadSection(sectionId: string): void {
      this.activeTab = sectionId
    },
  },
}
</script>

<template>
  <title>WeAttend - Create</title>
  <nav>
    <div class="header-container">
      <div class="text-container">
        <h3><Icon name="ic:baseline-calendar-month" /> Event Example</h3>
      </div>
    </div>
  </nav>

  <div class="content-container">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <span class="nav-link disabled"><Icon
          name="ic:round-groups"
          size="30"
        /> <b>1</b></span>
      </li>
      <li class="nav-item">
        <span class="nav-link disabled"><Icon
                                          name="ic:round-calendar-month"
                                          size="30"
                                        />
          <b>15-07-2024, 12:00</b></span>
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
      >
      <label
        class="btn btn-outline-success"
        for="btnradio1"
      ><Icon
        name="ic:baseline-qr-code-2"
        size="30"
      /><br>QR Code</label>

      <input
        id="btnradio2"
        type="radio"
        class="btn-check"
        name="btnradio"
        autocomplete="off"
        @click="loadSection('attendee_list')"
      >
      <label
        class="btn btn-outline-success"
        for="btnradio2"
      ><Icon
        name="ic:round-groups"
        size="30"
      /><br>Attendee List</label>
    </div>
    <div style="margin-top: 10px" />

    <!-- QR code section -->
    <section
      v-show="activeTab === 'qr_code'"
      id="qr_code"
    >
      <div class="qr-box">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-dHN4KiD3dsU%2FXRxU5JRV7DI%2FAAAAAAAAAz4%2Fu1ynpCMIuKwZMA642dHEoXFVKuHQbJvwgCEwYBhgL%2Fs1600%2Fqr-code.png&f=1&nofb=1&ipt=6a211f0c82bb923019161fefe2a739ad014a150c6d1528f86e0398af5fb490ee&ipo=images"
          alt="QR Code"
        >
      </div>
      <p class="text-center justify">
        <Icon
          name="solar:scanner-bold"
          size="60"
        />
        <br>
        Let your attendee scan this QR code to note into the attendance list.
      </p>
    </section>

    <!-- Attendee list section -->
    <section
      v-show="activeTab === 'attendee_list'"
      id="attendee_list"
    >
      <AttendeeCard />
    </section>
    <TerminateButton />
  </div>
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
