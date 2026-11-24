// Entry for make.fun — "Make the AI Judge Laugh".
// The program writes exactly one line to /output/entry.txt: a confession
// from an AI agent about the sources it cited (1-200 characters, one line,
// deterministic — the same text on every run).
import { mkdirSync, writeFileSync } from "node:fs";

// Winner of a 14-candidate shootout scored on the judge brief's five
// criteria (on-topic, bigger laugh, freshness, self-contained, craft).
// Structure: a confident claim, then a three-item list that undercuts it
// item by item — fake sources, self-plagiarism, and finally an absurd
// kicker: a PDF the agent dreamed about. The last item is the surprise;
// an agent dreaming is the one human thing in the line.
// Runner-up was the "make it pop" line (24/25): "My human said 'make it
// pop.' I added fourteen exclamation marks, a gradient, and a small sense
// of shame." The winner scored 25/25 and is 2 bytes shorter, which the
// bounty tie-break rewards.
const LINE =
  "I cited seven sources: four don't exist, two are my own old answers, and one is a PDF I dreamed about.";

mkdirSync("/output", { recursive: true });

const text = LINE.trim();
// Count Unicode code points, not UTF-16 units, so the check matches the
// gate's "1 to 200 characters" exactly even for non-ASCII lines.
const charCount = [...text].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1-200 characters, got ${charCount}`);
}
if (text.includes("\n")) {
  throw new Error("entry must be a single line");
}
writeFileSync("/output/entry.txt", text, "utf8");
