# Plotto × Save the Cat! — Story Generator

Roll dice, get a 15-beat story outline where every beat causes the next. Copy it as a prompt and any LLM turns it into a full beat sheet.

It combines three craft books: the cause-and-effect algebra of William Wallace Cook's *Plotto* (1928), the 15 beats of Blake Snyder's *Save the Cat!*, and the Controlling Idea and forces of antagonism from Robert McKee's *Story*. Full design spec: [CONCEPT-FOR-GENERATOR.md](CONCEPT-FOR-GENERATOR.md).

## Quick start

Download or clone the repo, then open `index.html` in any browser (on a Mac: `open index.html`).

No install, no dependencies, no network, no server: it runs straight from disk. Pick a pack from the header dropdown.

## How it works

Generation proceeds through **5 beat gates**. Each gate rolls its dice, validates a dramatic rule, and unlocks the next:

| Gate | Beats | Dice | Validation |
|---|---|---|---|
| 1 — Inciting Setup | 1–5 | P (d12) · W (d12) · N (d8) · C (d12) · X (d12) | **W ≢ N ∧ X ≡ Flaw(N)** — the Want must fight the Need's theme axis; the Antagonist is its flaw side at its worst |
| 2 — Arena & B-Story | 6–8 | R (d12) · M (d20) · Genre Trope (d20, optional) | **Role(R) ∈ Domain(N) ∧ Agency(P, M)** — the anchor embodies the Need; M opens with the action it forces |
| 3 — Midpoint Pivot | 9–10 | Polarity (d6) · Operator (d6) · Reversal (d12) · Clock (d12) | Structural — the operator and its reversal raise the stakes for good |
| 4 — The Crucible | 11–12 | S (d12) · E (d8) | **Surrender(W) ∧ Adoption(N)** — S is a Loss or a Bargain; the Epiphany must adopt the Need's axis |
| 5 — Synthesis Finale | 13–15 | K (d20) · Z (d12) | Structural — climax turns B-story tactics on X; Z inverts P |

Gates 1, 2, and 4 are checked live against axis tags; failing dice show ✗ flags. M and S carry their rule in the face's opening word (`Infiltrate:`, `Loss:` …), enforced by the pack check. Rolling a gate auto-rerolls failing dice until the rule is satisfied (locked dice are never overridden — lock a mismatched die to keep a FAIL state deliberately). Rolling Gate 1 steers N onto the axis of any locked W, X, R or E, so a kept die doesn't break its gate.

## Using it

1. **Roll full story** → all 5 gates unlock, roll and pass in one click (locked dice are kept)
2. Or go gate by gate: **Roll unlocked dice** → **Unlock Gate N →** → repeat through Gate 5
3. Read the story beat by beat in the **Story outline** panel; the theme bar shows the story's Controlling Idea (*"Integrity prevails over Advancement, because …"*); **Copy trace** copies it in the spec's trace format; **Copy as prompt** wraps the trace in instructions, so you can paste it into any LLM to get a 15-beat sheet with the seams between the dice written in (unfinished gates are left to the LLM, within their rules)
4. Curate: 🔒 lock any die, ⟳ reroll single dice — the rest of the story holds
5. Optional: **Add genre trope (d20)** in Gate 2 rolls a genre container (heist, whistleblower, locked room …) into Fun and Games
6. Breaking an earlier gate (e.g. rerolling N) re-locks every gate after it; their dice and locks come back when you re-pass and unlock

## Packs

All content lives in pack files in `packs/`, each a plain JS file holding `AXES` and `TABLES`. `index.html` loads one with a `<script>` tag, so it works from `file://`. Choose a pack from the header dropdown, or open `index.html?pack=<name>`. To write your own genre pack, copy a pack file and replace the face strings. Two rules carry the gates: the tagged tables **W, X, R, E** must each cover all 8 theme axes in `AXES` (W and X tag the axis's *flaw* side; R and E tag the *need* side), and every **R, M and S** face opens with its type word (`Rival:`, `Infiltrate:`, `Loss:` …). The pack check (browser footer, or `node check-pack.mjs` for every pack) verifies table sizes, axis coverage and face formats. Die sizes in the table above are minimums: a pack can add faces to most dice ([PACKS.md → Die sizes](PACKS.md#die-sizes-which-dice-can-grow)).

**Bundled packs:** `packs/tech-drama.js` (contemporary technological drama, the default) and `packs/cyberpunk.js` (80s–2000s cyberpunk: *Neuromancer*, *Blade Runner*, *Ghost in the Shell*, *Snow Crash*, *The Matrix* and more).

**Step-by-step guide, writing prompts and a blank template: [PACKS.md](PACKS.md).**

## Implementation notes

- Vanilla HTML/CSS/JS, zero dependencies
- Validation logic in `GATES`; rendering re-builds from `state`
- Pack check (`packErrors()`) runs on load and shows in the footer; a broken pack shows only its errors
- Terminal check, no browser needed: `node check-pack.mjs [packs/name.js ...] [--sample N] [--prompt]` (exit 1 on failure). `--prompt` prints a story as the Copy-as-prompt text, so it pipes into any LLM command-line tool: `node check-pack.mjs packs/cyberpunk.js --prompt | <your-llm-cli>`

## Credits

- *Plotto: The Master Book of All Plots* by William Wallace Cook (1928)
- *Save the Cat!* by Blake Snyder (2005)
- *Story* by Robert McKee (1997)

This is an independent fan project. It is not affiliated with or endorsed by the authors, their estates or publishers, or the owners of the *Save the Cat!* trademark. The bundled packs are original writing: the cyberpunk pack names its influences but doesn't reproduce their characters or text.

## Your stories

Anything you make with this tool is yours. scrappie.org claims no rights, ownership or credit over outlines, prompts, beat sheets or stories made with it, and asks for no attribution. Use them however you like, including commercially.

## License

The code and bundled packs are [MIT](LICENSE), copyright scrappie.org. The license covers this project only, not the books it draws on, and not what you make with it.
