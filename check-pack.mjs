// Check packs from the terminal (no browser, no dependencies):
//   node check-pack.mjs [packs/yourpack.js ...] [--sample N] [--prompt]     (default: every file in packs/)
// Runs index.html's own engine script against a stub DOM, so the rules live in one place: packErrors() in index.html.
// Exit code 0 = every pack passes, 1 = problems found. --sample prints N full random stories (Genre Trope on) to read against PACKS.md.
// --prompt prints each story as the UI's "Copy as prompt" text instead (1 story unless --sample says otherwise), with
// everything else on stderr, so it pipes cleanly: node check-pack.mjs packs/cyberpunk.js --prompt | <your-llm-cli>
import { readFileSync, readdirSync } from "node:fs";

const args = process.argv.slice(2);
const at = args.indexOf("--sample"), num = at >= 0 && /^\d+$/.test(args[at + 1] ?? "");
const prompt = args.includes("--prompt"), log = prompt ? console.error : console.log;
const samples = at < 0 ? +prompt : num ? Number(args[at + 1]) : 5;
const given = args.filter((a, i) => !a.startsWith("--") && !(num && i === at + 1));
const files = given.length ? given : readdirSync("packs").filter(f => f.endsWith(".js")).map(f => `packs/${f}`);

const engine = readFileSync(new URL("index.html", import.meta.url), "utf8").match(/<script id="engine">([\s\S]*?)<\/script>/)?.[1];
if (!engine) { console.error("✗ index.html: no <script id=\"engine\"> block found"); process.exit(1); }

let failed = false;
for (const file of files) check(file);
process.exit(failed ? 1 : 0);

function check(file) {
  const fail = msg => { console.error(`✗ ${file}: ${msg}`); failed = true; };
  const els = {};
  globalThis.document = { title: "", getElementById: id => (els[id] ??= { innerHTML: "", textContent: "", className: "", focus() {} }), activeElement: null };
  let page;
  try {
    const pack = readFileSync(file, "utf8").replace(/^"use strict";$/m, ""); // one strict prologue (the engine's) for the joined script
    page = new Function(`"use strict";\nconst PACKS = {}, PACK = "check";\n${pack}\n${engine}\nreturn { PACK_ERRORS, resetAll, rollStory, outlineText, promptText, toggleTrope };`)();
  } catch (e) {
    return fail(`the pack won't run: ${e.message}\n  (a straight " inside a face ends the string; use “curly quotes” or ' instead)`);
  }

  if (page.PACK_ERRORS.length) return fail(`${page.PACK_ERRORS.length} problem(s):\n${page.PACK_ERRORS.map(e => `  - ${e}`).join("\n")}`);
  log(`✓ ${file}: pack check passed`);

  if (samples) page.toggleTrope(); // samples include the optional Genre Trope die, so its faces get read too
  for (let i = 1; i <= samples; i++) {
    page.resetAll();
    page.rollStory();
    log(`\n===== Sample story ${i} of ${samples} =====`);
    console.log(prompt ? page.promptText() : page.outlineText());
  }
}
