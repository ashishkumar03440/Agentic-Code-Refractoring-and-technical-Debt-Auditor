import AdmZip from "adm-zip";
import fs from "fs";
import { env } from "../config/env.js";

export const extractZipFile = async (path, folderName) => {
  const zip = new AdmZip(path);
  const extractPath = `${env.extractDir}/${folderName}`;

  if (!fs.existsSync(env.extractDir)) fs.mkdirSync(env.extractDir);
  zip.extractAllTo(extractPath, true);
  
  return extractPath;
};
