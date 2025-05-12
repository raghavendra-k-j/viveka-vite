import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const cwd = process.cwd();

let indexHtmlCache = null;

fs.readFile(path.join(cwd, "dist", "index.html"), "utf8", (err, data) => {
  if (err) {
    console.error("Error reading index.html:", err);
  } else {
    indexHtmlCache = data;
  }
});

app.use(express.static(path.join(cwd, "dist")));

app.get("/", (req, res) => {
  if (indexHtmlCache) {
    res.send(indexHtmlCache);
  } else {
    res.status(500).json({ error: "Error loading the index file" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
