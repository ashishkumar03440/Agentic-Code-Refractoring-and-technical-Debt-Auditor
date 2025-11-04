import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import repoRoutes from "./routes/repoRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/repo", repoRoutes);
app.use("/api/scan", scanRoutes);

app.get("/", (req, res) => {
  res.send("✅ AGENTIC Code Refactor Backend Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on PORT ${process.env.PORT || 5000}`);
});
