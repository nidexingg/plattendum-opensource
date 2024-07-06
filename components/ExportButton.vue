<script setup lang="ts">
const { t } = useI18n();
import XLSX from "xlsx";

const exportdata: any[][] = [
  ["Name", "Age", "Email"],
  ["John Doe", 30, "john@example.com"],
  ["Jane Smith", 25, "jane@example.com"],
];

const exportData = () => {
  const ws = XLSX.utils.aoa_to_sheet(exportdata);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "${eventData.name}.xlsx");
};
</script>

<template>
  <div class="d-grid gap-2" style="margin-top: 1rem">
    <button class="btn btn-success" type="button" @click="exportData">
      <Icon name="vscode-icons:file-type-excel" />
      {{ t("home.export") }}
    </button>
  </div>
</template>
<style scoped>
/* content copyrighted by CHANDARA HACH */
/* custom your style here */
</style>
