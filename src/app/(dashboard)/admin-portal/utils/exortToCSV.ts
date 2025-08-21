// utils/exportToCSV.ts
export const exportToCSV = <T extends Record<string, unknown>>(filename: string, rows: T[]): void => {
  if (!rows || rows.length === 0) return;

  const separator = ",";
  const keys = Object.keys(rows[0]);
  let csvContent = keys.join(separator) + "\n";

  rows.forEach((row) => {
    const values = keys.map((key) => {
      const value =
        row[key] === null || row[key] === undefined ? "" : String(row[key]);
      return `"${value}"`;
    });
    csvContent += values.join(separator) + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
