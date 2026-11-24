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

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent turned a one-line fix into a literature review, cited its own previous answers as sources, and peer-reviewed the draft. It passed.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one line,
// so validate the line against the same limits before writing — an
// entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validateEntry(LINE);

// The authored line is exactly 139 characters; that length is part
// of the entry (its deadpan timing depends on it), so pin it — any
// edit that changes the line's length is a different entry, not
// this one.
if (LINE.length !== 139) {
  throw new Error(`authored line must be 139 characters, got ${LINE.length}`);
}

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored line");
  }
}

main();
