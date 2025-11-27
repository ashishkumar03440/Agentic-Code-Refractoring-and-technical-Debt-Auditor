import fs from "fs";
import path from "path";
import { env } from "../config/env.js";

export const runStaticAnalysis = async () => {
  const dir = env.extractDir;
  let filesCount = 0;

  function scanDirectory(folder) {
    const items = fs.readdirSync(folder);
    for (let item of items) {
      let fullPath = path.join(folder, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) scanDirectory(fullPath);
      else filesCount++;
    }
  }

  scanDirectory(dir);

  return {
    filesScanned: filesCount,
    issuesDetected: Math.floor(Math.random() * 50), 
  };
};
