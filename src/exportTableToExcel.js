import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportTableToExcel = (tableId, fileName) => {
  const table = document.getElementById(tableId);
  const worksheet = XLSX.utils.table_to_sheet(table);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName + '.xlsx');
};