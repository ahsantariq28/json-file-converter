# json-file-converter

Convert JSON data to CSV or Excel (.xlsx) files and return a public URL.
Perfect for backend APIs, report generation, and data export.

---

## 🚀 Features

- Convert **JSON arrays** to CSV or Excel (.xlsx)
- Automatically save files to a specified directory
- Returns **full public URL** of generated file
- Supports **nested JSON (auto flattening)**
- Generates **random filenames** (no collisions)
- Simple and clean API

---

## 📦 Installation

```bash
npm install json-file-converter
```

---

## ⚡ Usage

```js
const { convert } = require("json-file-converter");

const data = [
  {
    name: "Ahsan",
    age: 25,
    address: { city: "Sahiwal", country: "Pakistan" },
  },
  {
    name: "Ali",
    age: 30,
    address: { city: "Lahore", country: "Pakistan" },
  },
];

const result = convert(data, {
  outputDir: "public/files",
  baseUrl: "http://localhost:3000/files",
  fileName: "", // optional (random if empty)
  format: "xlsx", // "csv" or "xlsx"
});

console.log(result);
```

---

## 📤 Output

```json
{
  "filePath": "public/files/3b1f8a92-1f4d-4c8b-a8d3-5c7e9e2f1a9b.xlsx",
  "fileUrl": "http://localhost:3000/files/3b1f8a92-1f4d-4c8b-a8d3-5c7e9e2f1a9b.xlsx"
}
```

## 🧠 How It Works

- Takes a JSON array as input
- Flattens nested objects automatically
- Converts to CSV or Excel format
- Saves file locally
- Returns a public URL

---

## ⚙️ Options

| Option    | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| outputDir | string | ✅ Yes   | Directory where file will be saved        |
| baseUrl   | string | ✅ Yes   | Base URL for accessing the file           |
| fileName  | string | ❌ No    | Custom file name (random if not provided) |
| format    | string | ❌ No    | "csv" or "xlsx" (default: xlsx)           |

---

## 📁 Example Output (Flattened JSON)

Input:

```json
{
  "name": "Ahsan",
  "address": {
    "city": "Sahiwal",
    "country": "Pakistan"
  }
}
```

Output (CSV/Excel):

| name  | address.city | address.country |
| ----- | ------------ | --------------- |
| Ahsan | Sahiwal      | Pakistan        |

---

## 🔑 Keywords

json, csv, excel, xlsx, converter, export, file, report, nodejs

---

## 📄 License

MIT
