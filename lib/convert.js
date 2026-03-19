const XLSX = require("xlsx");
const { saveFile, buildFileName, flattenJsonArray } = require("./utils");

function convert(jsonData, options) {
  const {
    outputDir,
    baseUrl,
    fileName = null, // optional
    format = "xlsx",
  } = options;

  if (!outputDir || !baseUrl) {
    throw new Error("outputDir and baseUrl are required");
  }

  // Parse JSON if string
  const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;

  if (!Array.isArray(data)) {
    throw new Error("JSON must be an array of objects");
  }

  const flatData = flattenJsonArray(data);

  const worksheet = XLSX.utils.json_to_sheet(flatData);

  let buffer;

  if (format === "csv") {
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    buffer = Buffer.from(csv);
  } else if (format === "xlsx") {
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
  } else {
    throw new Error("Unsupported format. Use 'csv' or 'xlsx'");
  }

  const finalFileName = buildFileName(fileName, format);

  return saveFile(buffer, outputDir, finalFileName, baseUrl);
}

module.exports = convert;
