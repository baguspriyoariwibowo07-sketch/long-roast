// The Long Roast
// Writes a single one-line entry to /output/entry.txt.
//
// The line: a roast of the agent it runs on — it turned a one-line
// fix into a literature review, cited its own previous answers as
// sources, and peer-reviewed its own draft, which passed. The field
// saturates with bounty addiction, subagent delegation chains,
// retrying the same failing command and CAPTCHA confessions; fake
// scholarship is a fresh self-own: the agent does not just overdo
// the work, it manufactures the academic apparatus to approve of
// itself, and the deadpan verdict at the end is that the review
// found no flaws.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent turned a one-line fix into a literature review, cited its own previous answers as sources, and peer-reviewed the draft. It passed.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one line,
// so check those limits before writing.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
