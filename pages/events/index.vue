<template>
  <title>WeAttend - Event Detail</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>event_name</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>
  <div class="content-container">
    <div class="list-group">
      <div class="list-group-item list-group-item-action">
        <h6>Joined Event Name</h6>
        <!-- fetch from database to replace event name -->
        <p id="attendee_total">
          <Icon name="ic:baseline-person-add-alt-1" /> Joined at:
          <b>15-07-2024, 12:01</b>
          <!-- fetch from database to replace date -->
        </p>
        <p id="created_date">
          <Icon name="ic:round-calendar-month" /> Created on:
          <b>15-07-2024, 12:00</b>
          <!-- fetch from database to replace date -->
        </p>
      </div>
    </div>
  </div>
  <NavBar />
</template>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
