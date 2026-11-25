// The Houseplant Out-of-Office — make.fun bounty
// Writes one out-of-office auto-reply, as if a houseplant sent it,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Out of office. I am a fern, ignored since March, and I have decided to stop photosynthesizing out of spite.";

// Gate self-check (RULES.txt): UTF-8 text, 1 to 120 characters, not only
// white space, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-120`);
}
if (!ENTRY.trim() || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
