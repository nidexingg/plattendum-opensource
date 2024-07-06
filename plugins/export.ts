import XLSX from "xlsx";
const data: any[][] = [
  ["Name", "Age", "Email"],
  ["Chandara Hach", 30, "dara@example.com"],
  ["Hach Chandara", 25, "chandara@example.com"],
];

export const exportData = () => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "exported_data.xlsx");
};
