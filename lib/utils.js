const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildFileName(name, format) {
  if (!name) {
    return `${uuidv4()}.${format}`;
  }
  return `${name}.${format}`;
}

function saveFile(buffer, outputDir, fileName, baseUrl) {
  ensureDir(outputDir);

  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, buffer);

  const fileUrl = `${baseUrl}/${fileName}`;

  return { filePath, fileUrl };
}

function flattenObject(obj, prefix = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? prefix + "." : "";
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // Recursively flatten nested objects
      Object.assign(acc, flattenObject(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {});
}

function flattenJsonArray(jsonArray) {
  return jsonArray.map((item) => flattenObject(item));
}

module.exports = {
  saveFile,
  buildFileName,
  flattenJsonArray,
  flattenObject,
};
