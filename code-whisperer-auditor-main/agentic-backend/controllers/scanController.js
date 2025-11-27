import { runStaticAnalysis } from "../services/scanService.js";
import { runAIRefactor } from "../services/aiService.js";

export const startScan = async (req, res) => {
  try {
    const staticResult = await runStaticAnalysis();
    const aiResult = await runAIRefactor(staticResult);

    res.json({
      message: "✅ Scan Complete",
      staticAnalysis: staticResult,
      aiSuggestions: aiResult
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "❌ Scan failed" });
  }
};
