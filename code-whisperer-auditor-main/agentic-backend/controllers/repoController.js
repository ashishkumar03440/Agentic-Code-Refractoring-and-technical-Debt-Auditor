import { extractZipFile } from "../utils/unzip.js";

export const uploadRepo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    await extractZipFile(req.file.path, req.file.filename);
    
    res.json({ message: "✅ Repository uploaded and extracted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Upload failed" });
  }
};
