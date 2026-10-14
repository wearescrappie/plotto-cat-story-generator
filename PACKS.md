# Create Your Own Pack

A **pack** is every face on every die: the characters, wants, themes, arenas and endings the generator rolls. The engine (gates, validation, outline) stays the same. Swap the pack and the same structure writes hard sci-fi, psychological horror, political thriller or workplace satire.

This guide is built on the design spec, [CONCEPT-FOR-GENERATOR.md](CONCEPT-FOR-GENERATOR.md). The default pack, `packs/tech-drama.js` (contemporary technological drama), is **one interpretation of the spec, not a template**. Where this guide and the default pack disagree, follow the guide.

You need a text editor and a browser. No build step, no install.

| Pack size | What you rewrite | Faces | Time |
|---|---|---|---|
| **Reskin** | P and M, the two pools the spec names for changing genre | 32 | about an hour |
| **Full pack** | Everything, including your own theme axes | ~184 (POL and OP can stay) | an afternoon |

> A reskin works because Z is written as inversion patterns that flip any P (see **Why Z uses patterns**). If your Z faces describe specific P faces, rewrite Z too.

---

## Quick start

1. Copy `packs/tech-drama.js` to a new file, e.g. `packs/salvage.js`. Each pack is one plain JS file holding `const AXES` and `const TABLES`.
2. Add it to the pack picker: in `index.html`, add `salvage: "Salvage"` to `const PACKS` (~line 140). Until then, open it directly with `index.html?pack=salvage`.
3. Read **The six principles**, then replace the faces step by step.
4. Check it: `node check-pack.mjs packs/salvage.js` must print **✓ pack check passed**. Or open `index.html`, pick the pack, and the footer must read **Self-check: OK**.
5. Read 10 stories (`node check-pack.mjs packs/salvage.js --sample 10`, or roll them in the browser). If a story falls apart, fix the faces, not the engine.

---

## The six principles

These come straight from the spec. Every face you write should satisfy all six.

### 1. Every face must survive any roll
The spec promises **selective rerolling**: lock most of a story, reroll one die, and the story still holds. So a face can never depend on *which* face another die rolled.

- ❌ *"Back in the cockpit of the Kestrel"* (only works if P rolled the Kestrel's pilot)
- ✅ *"The thing P owned alone at the start is now held in common, and works better"* (works for any P)

Common slips (found by running `--sample` on the cyberpunk pack). A face breaks when it assumes:
- **P has a particular occupation.** This is the most common slip, and it hides in W. *"Deliver the sealed package"* assumes a courier, *"Make partner at the security firm"* a security worker, *"keeps beating you to jobs"* a runner. A wide P table (nannies, firefighters, census officers) exposes it fast. Instead, **introduce the opportunity in the face**: *"Take the side gig carrying a sealed package…"*, *"Auction the secret you stumbled onto…"*. Words to search for: `job`, `client`, `run`, `crew`, `boss`.
- **P holds something it may not have:** *"the data you were saving as leverage"*, *"your implants"*, *"your badge"*, *"your crew"*. Instead, name the die (*"P's best asset"*) or introduce the thing in the face itself.
- **M is a particular kind of place:** *"M's floors"* fails when M is a prediction engine or a blood sport. Use *"inside M"* or *"M's systems"*.
- **R has followers:** *"R's people"* reads oddly when R is a kid or a grandmother. Use *"every favor R is owed"*.
- **R has a particular bond type:** *"P stands where R stood"* means "P becomes the mentor", which fails when R is a Dependent. Lean on what **every** R shares: R embodies N and stands in P's way (*"P is now the one standing in their way, the way R stood in P's"*).
- **R matches a W it doesn't match:** an R written for one W face (*"the clone body you've been saving for"*) jars against the other W faces on its axis.

### 2. Write in variables
*Plotto* is an algebra: situations are written with symbols, so they combine. Do the same. When a face involves another die, name that die by its letter instead of describing it.

| Letter | Means |
|---|---|
| **P** | the protagonist, as rolled |
| **W** | what P wants |
| **N** | the Need, the theme |
| **R** | the relationship anchor |
| **M** | the arena |
| **X** | the antagonist |

Example: *"R's crew holds the locks while P cuts the core"* reads correctly for every R, P and M.

### 3. Give the operators something to grab
At the midpoint, the Algebra Operator transforms a "character or device variable": it **Inverts** an asset into a liability, **Transfers** a complication from P to R, **Severs** a lifeline. Those only work if the variables exist. So:
- **P** names an asset, a dependence and a vulnerability.
- **M** is a tangible device or system, with rules that can be exploited.
- **R** is a bond a complication can move onto.

### 4. Each gate has a job; faces must make it doable
| Gate | The spec's rule, in plain words |
|---|---|
| 1 | W **contradicts** N. P tries to fix things with their old way of thinking, which is doomed. X **is** N's flaw at its worst. |
| 2 | R **embodies** N. M **demands action**: P has to do things there, not watch. |
| 3 | Stakes **rise** (OP, then REV makes it permanent), a clock starts, and Act I's status quo is **gone for good**. |
| 4 | S **destroys** W or P's fallback. E makes P **consciously adopt** N. |
| 5 | K is won against **X** with **R's lessons** and **M's skills**. Z **inverts** P's opening state. |

The engine checks W, X, R and E against N on every roll. The pack check enforces the opening word on M (the action it demands) and S (Loss or Bargain), but only you can make the face live up to that word. Gates 3 and 5 depend entirely on how you write the faces.

### 5. Stakes only go up
The spec's ladder runs from *personal discomfort* (Gate 1) to *irreversible consequences* (Gate 3 onward). Write each die at its rung: C hurts, ESC can't be undone, S costs something P can't get back.

### 6. Every turning point has a cause
The spec's case against a black-box generator: each beat should "point to an underlying causal link." Prefer faces that imply *why*: *"The guild calls in the debt **because** your registry turned up on a wreck"* beats *"The guild calls in the debt."*

---

## Anatomy of a pack

Two JavaScript objects.

**`AXES`**: the theme axes. Each entry is a letter and a `"Need/Flaw"` pair.
```js
const AXES = { A: "Trust/Self-Reliance", B: "Curiosity/Caution", /* … through H */ };
```

**`TABLES`**: 16 dice, all the same shape.
```js
C: { label: "Pressure / Catalyst (C)", faces: [
  "A derelict answers your salvage ping, using your own ship's registry code",
  // … at least 12 faces (see Die sizes)
]},
```

| Field | Meaning | Can you change it? |
|---|---|---|
| key (`C`) | Which die it is. The gates reference these 16 keys. | **No** |
| `label` | Shown as `Pressure / Catalyst · C`. | Yes, e.g. drop "Modern" from M for a fantasy pack. Keep the `(KEY)` suffix. |
| `faces` | The content. The face count is the die size: 30 faces roll as a d30. | Yes, that's the job. See **Die sizes** for how many each die needs. |

**Freeform dice** (P, C, M, T, POL, OP, REV, ESC, S, K, Z) use plain strings. **Tagged dice** (N, W, X, R, E) use `{ ax: "A", t: "text" }`, and the gates validate the `ax` letter. M and S are freeform but must open with a type word (Step 4).

### Die sizes: which dice can grow

The spec's die sizes are **minimums**. Most dice can take more faces, and more faces means fewer repeated stories. The checker enforces the minimum (or exact count); the recommended size is a target, not a rule. Rows are in priority order: grow from the top down.

| Die | Minimum (checked) | Recommended | Why |
|---|---|---|---|
| **E** | 8 | **16–24**, evenly | At 8, E is one face per axis, so N alone decides the epiphany. 2–3 per axis fixes that. |
| **W** | 12 | **24**, evenly | Gates only show faces tagged with N's axis, so at 12 half the axes have a single possible Want. 3 per axis. |
| **R** | 12 | **24**, evenly | Same as W. 24 also splits into 6 of each bond type. |
| **P** | 12 | **20–24** | Opens every story, so repeats are the most visible. |
| **K** | 20 | **24–30** | Every climax; the second most visible beat. |
| **S** | 12 | **16–20** | Keep `Loss:` and `Bargain:` about half and half. |
| **C** | 12 | **16–20** | The inciting event; noticeable in Gate 1. |
| **X** | 12 | **16–24**, evenly | Like W: only faces on N's axis can roll, so at 12 half the axes have one antagonist. |
| **M** | 20 | 20–30 | Already the widest die. |
| **T** | 20 | 20 | Optional, and off by default. |
| **REV** | 12 | 12–16 | Paired with OP it already gives 72 combinations. |
| **ESC** | 12 | 16 | A clock varies less from story to story. |
| **Z** | 12 | 12–16 | Patterns are generic, so many more turn into near-duplicates. |
| **N** | exactly one per axis | 8 | Grows only by adding axes (then W, X, R and E must cover the new ones). |
| **POL** | exactly 6 | 6 | 3 False Victory, 3 False Defeat. More faces would only reword these. |
| **OP** | exactly 6 | 6 | *Plotto*'s six operators, one each. |

**Evenly** means in multiples of the axis count (16, 24 with 8 axes), the same number of faces on every axis.

**Quality caps the count.** Every face must still survive any roll (Principle 1): 12 strong faces beat 30 with filler. After each batch, run `--sample 10` and cut any face that reads flat. The full recommended set is about 100 new faces per pack.

---

## Step 1: Choose 8 theme axes

The spec defines N as a d8 **moral binary**: a value conflict that forces internal change (its examples: *Autonomy ↔ Belonging*, *Truth ↔ Safety*). So you need 8 binaries.

Write each one as `"Need/Flaw"`. The Need is what P must learn to choose; the Flaw is what P chooses at the start.

- **Both sides are tempting.** The Flaw is a virtue in the wrong amount (Safety, Loyalty, Certainty), not a cartoon vice.
- **Each axis could carry a whole story by itself.**
- **The 8 axes are distinct.** If two would produce the same story, merge them and find another.

| Deep-space salvage | Small-town gothic | Workplace satire |
|---|---|---|
| Trust/Self-Reliance | Grief/Denial | Candor/Politeness |
| Curiosity/Caution | Belonging/Escape | Craft/Metrics |
| Honesty/Mystique | Forgiveness/Inheritance | Solidarity/Ladder |
| Duty/Freedom | Memory/Peace | Rest/Hustle |

---

## Step 2: Write N (Theme / Need), one face per axis

Format: **`"Need over Flaw — what that means in one line"`**, with a spaced em dash ` — `. The `Need over Flaw` part must match the face's axis in `AXES` exactly, with the `/` written as ` over `.

```js
// AXES has  A: "Trust/Self-Reliance"
{ ax: "A", t: "Trust over Self-Reliance — let the crew carry part of the weight" },
```

The checker enforces the match, which catches an N face tagged with the wrong letter. When a gate fails, the alert keeps only the text before ` — ` (*"E must adopt **Trust over Self-Reliance**"*).

---

## Step 3: Write the tagged dice: W, X, R, E

These dice are validated against N. Tag each face with the axis it belongs to.

### W: Want, External (d12, Gate 1)
**Spec:** "a tangible objective driving immediate action": a *measurable real-world pursuit* (status, escape, extraction). Gate 1 requires W to *contradict* N: it's P's attempt to fix things the old way.

- Tag: the axis whose **Flaw** side W serves.
- Measurable: you can say on a given day whether P got it.
- Prompt: *"What finish line would someone stuck in the Flaw sprint toward?"*
- ✅ `{ ax: "A", t: "Pay off the guild alone before the next dock fee, so no one can ever ground the ship" }`

### X: Antagonist (d12, Gate 1)
**Source:** McKee's *Story*: a protagonist is only as compelling as the forces of antagonism. Gate 1 requires X to embody N's **Flaw** side at its worst: what P becomes if W wins.

- Tag: the axis whose **Flaw** side X lives, taken all the way.
- A person with power, not a faceless system: they can lead one, but give it a face.
- Reasonable from the inside: X believes the Flaw is the virtue (Safety, Loyalty, Certainty).
- Already pointed at P (*"has just opened yours"*), so X can set C in motion and be faced in K. Don't assume P's job (Principle 1).
- Prompt: *"Who won the game W is playing, and what did it cost them and everyone near them?"*
- ✅ `{ ax: "A", t: "The salvage baron who has never shared a haul or a crew, and has just bought the debt on your ship" }`

### R: Relationship Anchor (d12, Gate 2)
**Spec:** a *relational counterpart complicating the pursuit*, with a **typed bond**: mentor, dependent, rival or co-conspirator. Gate 2 requires R to *embody* N; R delivers the theme's argument.

- Tag: the axis whose **Need** side R lives.
- **Start every face with its bond type:** `Mentor: `, `Dependent: `, `Rival: ` or `Co-conspirator: ` (the checker requires one of these four). **Mix them:** a rival who embodies the Need complicates things more than another wise mentor. The default pack uses 3 of each.
- R must **complicate** W, not just advise. R should be in P's way, or P should owe R.
- ✅ `{ ax: "A", t: "Rival: the scavenger captain who splits every haul evenly and has never lost a hand" }`
- ✅ `{ ax: "A", t: "Dependent: P's apprentice, who keeps volunteering the crew's help P refuses" }`

### E: Epiphany Lock (d8, Gate 4)
**Spec:** "forces *conscious* alignment with N." Gate 4 requires P to *adopt* N.

- Tag: the axis whose **Need** side it adopts. At least one face per axis; two or three per axis keeps the same N from always giving the same epiphany.
- Write it as the sentence P finally understands, the one that breaks the old logic.
- ✅ `{ ax: "A", t: "A ship flown by one person is just a coffin with a view" }`

**Coverage rule (the footer checks this):** W, X, R and E must **each** have at least one face for **every** axis. At 12 faces, W, X and R give 4 axes a second face; spread the doubles across different axes, or grow to 24 for 3 per axis (see **Die sizes**).

---

## Step 4: Write the freeform dice

Apart from the opening word on M and S, the engine doesn't validate these, so the principles above do the work.

| Die | Gate | The spec's job | Write it so… | Sample-genre example |
|---|---|---|---|---|
| **P** Character Position (d12) | 1 | Social footing, vulnerability, baseline status quo: *archetypal role, institutional dependence, social leverage* | it names a role, an **asset**, a **dependence** and a **vulnerability** (Principle 3) | *Salvage pilot who owns her ship outright and owes the docking guild for everything else* |
| **C** Pressure / Catalyst (d12) | 1 | Disrupts the status quo, **demanding proactive intervention** | P can't ignore it or wait it out | *A derelict answers your salvage ping, using your own ship's registry code* |
| **M** Mechanism / Arena (d20) | 2 | A tangible asset or threat; the **sandbox** where P tests new tactics | it has rules P can exploit and it **demands action**. **Start with the action:** `Infiltrate: `, `Exploit: `, `Expose: `, `Sabotage: ` or `Win: ` (checked) | *Infiltrate: a drifting cargo hulk whose locks reset every orbit, so work fast or be sealed in* |
| **T** Genre Trope (d20, optional) | 2 | A genre convention that sets the **container** for Fun and Games | it names the trope, then how it bends this story. It brings its own people, so it fits any R | *Isolated outpost — the station's last shuttle left yesterday, and the next one is in a month* |
| **POL** Midpoint Polarity (d6) | 3 | False Victory (P seemingly attains W) or False Defeat (the strategy collapses publicly) | it stays structural: the spec fixes 1–3 / 4–6 | *False Defeat — P's Act I strategy collapses in public* |
| **OP** Algebra Operator (d6) | 3 | The six *Plotto* operations: Invert, Transfer, Escalate, Reveal, Sever, Enclose | all six stay, one each; reword only to fit your genre | *Transfer — the complication moves from P to R* |
| **REV** Reversal / Consequence (d12) | 3 | The operation's fallout: a status change (*inversion, exposure, pyrrhic gain*) | it's **permanent** and fits **either** polarity (False Victory or False Defeat) | *Scapegoat — the guild pins the lost hull on P, with the logs to prove it* |
| **ESC** Pressure Escalation (d12) | 3 | Activates the **ticking clock**; consequences become irreversible | it has a time **and** can't be undone | *The hulk's orbit decays into the gas giant in 40 hours* |
| **S** Sacrifice / Whiff of Death (d12) | 4 | **Destroys W** or **eliminates P's fallback** | P loses something for good. **Start with** `Loss: ` (W or the fallback is gone) or `Bargain: ` (W stays on offer at a price N forbids, so refusing costs W) (checked). Mix both. | *Loss: the reactor dies; the only way home is in someone else's hold.* *Bargain: the guild will forgive the debt, in exchange for the ship.* |
| **K** Climax Crucible (d20) | 5 | A confrontation that needs **Act II's skills** and **Act IV's transformation** at once; resolved with **R's lessons** | it's impossible alone and uses variables (R, M) so it fits any roll | *P can only open M's core if R's people hold every lock at once* |
| **Z** New Normal / Inversion (d12) | 5 | The final image: **mirrors and reverses the Opening Image** (P) | it's an **inversion pattern** that flips any P's opening state | *The thing P owned alone at the start is now held in common, and works better* |

### Why Z uses patterns
Z is rolled independently of P. If each Z face inverts one specific P face, a story gets a matching ending only 1 roll in 12, which breaks Principle 1. A pattern ("what P owned alone is now shared", "the system that ranked P now answers to P", "P is back where they started, but now someone else is in the danger P was in") inverts **every** P. That works because Principle 3 guarantees every P face names an asset, a dependence and a vulnerability for the pattern to flip.

---

## Rules checklist

**Checked automatically (by `check-pack.mjs` and the browser footer):**
- [ ] All 16 die keys are present, and every die has at least its spec size in faces (exactly 6 for POL and OP; see **Die sizes**).
- [ ] Freeform faces are plain strings; tagged faces (N, W, X, R, E) are `{ ax, t }`.
- [ ] Every `ax` letter exists in `AXES`.
- [ ] W, X, R and E each tag every axis at least once.
- [ ] N has exactly one face per axis, starting with that axis as `Need over Flaw — `.
- [ ] Every R face starts with `Mentor: `, `Dependent: `, `Rival: ` or `Co-conspirator: `.
- [ ] Every M face starts with `Infiltrate: `, `Exploit: `, `Expose: `, `Sabotage: ` or `Win: `.
- [ ] Every S face starts with `Loss: ` or `Bargain: `.
- [ ] No `<`, `>` or `&` in faces, and no `"`, `<`, `>` or `&` in labels.

**Not checked; follow these yourself (use `--sample`):**
- [ ] W and X tag the **Flaw** side; R and E tag the **Need** side.
- [ ] Every X is a person with power, already pointed at P, and could win.
- [ ] No face depends on which face another die rolled (Principle 1).
- [ ] Every P face names an asset, a dependence and a vulnerability.
- [ ] R faces use a mix of bond types, and every R complicates W.
- [ ] Every M face lives up to its opening verb; every REV is permanent; every ESC face is timed and irreversible.
- [ ] A `Loss:` destroys W or the fallback; a `Bargain:` costs W to refuse; K faces need R's lessons; Z faces are inversion patterns.

**Characters to avoid:**
- `<` and `>`: faces are inserted as HTML, so these can break the layout.
- `&`: it can turn into a different character (`&copy` shows as ©). Write "and" instead.
- Straight double quotes `"` inside a face: they end the string. Use curly quotes “like this” or single quotes.

**Weighting:** to make an outcome more likely, list it more than once (POL lists each outcome three times).

---

## Limits of the current engine

**Fixed by the engine (`GATES` in `index.html`):** the 16 die keys, the M and S opening words, which gate rolls which die, the gate rules and their wording, the 15 beats, and the five-act outline.

**Checks the engine doesn't run:** Gate 3's stakes and clock, and Gate 5's "K uses R's lessons" and "Z inverts P". Gate 2's "M demands action" and Gate 4's "S destroys W" are checked only as far as the opening word. Your faces have to carry the rest.

**Genre Trope is optional:** T is off until someone clicks **Add genre trope** in Gate 2, and `--sample` always turns it on. Every pack still needs at least 20 T faces.

---

## For agents

An AI agent can write a full pack from this guide. Brief it like this:

> Read PACKS.md and CONCEPT-FOR-GENERATOR.md. Copy packs/tech-drama.js to packs/<genre>.js, replace `AXES` and `TABLES` with a <genre> pack that follows the six principles, and add it to `PACKS` in index.html. Loop until done:
> 1. Run `node check-pack.mjs packs/<genre>.js` and fix every listed problem.
> 2. Run `node check-pack.mjs packs/<genre>.js --sample 5`, read each story against Principle 4's gate table and the unchecked items in the Rules checklist, and rewrite any face that fails.
> Stop when the check passes and 5 samples in a row read as coherent stories.

The check exits `0` on pass and `1` on failure, so it can also gate a script or CI step. It runs the page's own engine script, so the browser footer and the terminal always apply the same rules.

---

## Testing your pack

1. Run `node check-pack.mjs packs/yourpack.js` (or no argument to check every pack), or reload the page and look for **Self-check: OK** in the footer. A broken pack shows only the error list, not the gates.
2. Run `node check-pack.mjs packs/yourpack.js --sample 10` to print 10 complete random stories. Or, in the browser, click **Roll full story** 10 times.
3. Read each **Story outline** from top to bottom, checking the gate jobs in Principle 4: does W fight N? Is R in the way? Does the clock make things irreversible? Does Z flip P?
4. **Mismatch hunt:** for each sample, ask whether W, R, S and K would still read naturally next to the *least* likely P in your table. The slips in Principle 1 show up here first.
5. **Repeat tally:** across 10 samples, note any face that appears 3 or more times. A die that keeps repeating is too small; grow it (see **Die sizes**).
6. **Reroll test (Principle 1):** after a full story, reroll a single P, then a single R. Does the ending (K, Z) still make sense? If not, a face is depending on another die's specific face.
7. Force a failure: reroll W until it shows ✗. The alert should read cleanly.
8. Click **Copy trace** and paste it somewhere to check the plain-text format.

---

## Blank template

Paste this into `packs/yourpack.js`, then fill in each list.

```js
const AXES = {
  A: "Need/Flaw", B: "Need/Flaw", C: "Need/Flaw", D: "Need/Flaw",
  E: "Need/Flaw", F: "Need/Flaw", G: "Need/Flaw", H: "Need/Flaw",
};

const TABLES = {
  P:   { label: "Character Position (P)", faces: [ /* 12+: role + asset + dependence + vulnerability */ ]},
  W:   { label: "Want, External (W)", faces: [ /* 12+ × { ax, t }: measurable, serves the FLAW; every axis at least once */ ]},
  N:   { label: "Theme / Need (N)", faces: [ /* 8 × { ax, t: "Need over Flaw — gloss" }: one per axis */ ]},
  C:   { label: "Pressure / Catalyst (C)", faces: [ /* 12+: forces P to act */ ]},
  X:   { label: "Antagonist (X)", faces: [ /* 12+ × { ax, t }: the FLAW at its worst, with a face, pointed at P; every axis */ ]},
  R:   { label: "Relationship Anchor (R)", faces: [ /* 12+ × { ax, t: "Bond: …" }: lives the NEED, complicates W; every axis */ ]},
  M:   { label: "Mechanism / Arena (M)", faces: [ /* 20+ × "Infiltrate|Exploit|Expose|Sabotage|Win: …": tangible system with exploitable rules */ ]},
  T:   { label: "Genre Trope (T)", faces: [ /* 20+ × "Trope — how it bends this story": brings its own people, fits any R */ ]},
  POL: { label: "Midpoint Polarity", faces: [ /* 3 × False Victory, 3 × False Defeat */ ]},
  OP:  { label: "Algebra Operator", faces: [ /* Invert, Transfer, Escalate, Reveal, Sever, Enclose */ ]},
  REV: { label: "Reversal / Consequence", faces: [ /* 12+ × "Type — fallout": permanent, fits either polarity */ ]},
  ESC: { label: "Pressure Escalation / Clock", faces: [ /* 12+: timed and irreversible */ ]},
  S:   { label: "Sacrifice / Whiff of Death (S)", faces: [ /* 12+ × "Loss: …" or "Bargain: …": destroys W or the fallback, or costs W to refuse */ ]},
  E:   { label: "Epiphany Lock (E)", faces: [ /* 8+ × { ax, t }: P's realization, adopts the NEED; every axis, evenly */ ]},
  K:   { label: "Climax Crucible (K)", faces: [ /* 20+: impossible alone; uses R's lessons and M's rules */ ]},
  Z:   { label: "New Normal / Inversion (Z)", faces: [ /* 12+ inversion patterns that flip any P */ ]},
};
```
