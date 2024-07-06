<template>
  <title>{{ t("title.join") }}</title>

  <div>
    <nav>
      <div class="header-container">
        <TopBarLogo />
        <div class="text-container">
          <h3>{{ t("join.header") }}</h3>
        </div>
        <TopBarAvatar />
      </div>
    </nav>
    <div>
      <div class="form-floating">
        <select
          v-model="selectedDevice"
          class="form-select"
          id="floatingSelect"
        >
          <option v-for="device in devices" :key="device.label" :value="device">
            {{ device.label }}
          </option>
        </select>
        <label for="floatingSelect"
          ><Icon name="material-symbols:camera-video-rounded" />
          {{ t("join.camera") }}</label
        >
      </div>

      <qrcode-stream
        v-if="selectedDevice !== null"
        :constraints="{ deviceId: selectedDevice.deviceId }"
        :track="trackFunctionSelected.value"
        :formats="selectedBarcodeFormats"
        @error="onError"
        @detect="onDetect"
      />
      <p v-else class="error">No cameras on this device</p>
    </div>
    <NavBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import swal from "sweetalert";
import { useRouter } from "vue-router";

const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const result = ref("");

/*** select camera ***/

const selectedDevice = ref(null);
const devices = ref([]);

async function onDetect(detectedCodes) {
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));
  // Find Event in DB
  // console.log(detectedCodes[0].rawValue)
  // console.log(user.value?.id)
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("url", detectedCodes[0].rawValue)
    .single();
  // console.log(data);
  // Join event by creating attendee object and link event id
  const userId = user.value?.id;
  // Check if already join!

  const { data: existedEvent, error: eventError } = await supabase
    .from("attendees")
    .select("*")
    .eq("event_id", data.id)
    .eq("user_id", userId)
    .single();

  console.log(existedEvent);

  if (existedEvent) {
    swal(`You've already joined the event: ${data.name}`);
    router.push(localePath({ path: "/home" }));
    return;
  }

  // console.log(detectedCodes[0].rawValue)

  const { data: attendee, error: err } = await supabase
    .from("attendees")
    .insert({
      event_id: data.id,
      user_id: userId,
    });
  // console.log(attendee)
  // console.log(err)

  swal(`You've sucessfully join an event: ${data.name}`);

  router.push(localePath({ path: "/home" }));
}

onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === "videoinput"
  );

  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0];
  }
});

/*** track functons ***/

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.strokeRect(x, y, width, height);
  }
}
function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode;

    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#35495e";
    ctx.strokeText(detectedCode.rawValue, centerX, centerY);

    ctx.fillStyle = "#5cb984";
    ctx.fillText(rawValue, centerX, centerY);
  }
}
const trackFunctionOptions = [
  { text: "nothing (default)", value: undefined },
  { text: "outline", value: paintOutline },
  { text: "centered text", value: paintCenterText },
  { text: "bounding box", value: paintBoundingBox },
];
const trackFunctionSelected = ref(trackFunctionOptions[1]);

/*** barcode formats ***/

const barcodeFormats = ref({
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: true,
  rm_qr_code: false,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false,
});
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter(
    (format) => barcodeFormats.value[format]
  );
});

/*** error handling ***/

const error = ref("");

function onError(err) {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
}
</script>

<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
