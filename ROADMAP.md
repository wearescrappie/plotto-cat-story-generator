# Plotto × Save the Cat! Roadmap

Updated 2026-10-13

## Shipped

Three ideas from Robert McKee's *Story* are in the engine, and both packs pass `node check-pack.mjs`.

| Date | Item | What it does |
| --- | --- | --- |
| 2026-10-13 | Antagonist die X (d12, Gate 1) | Gate 1 is now W ≢ N ∧ X ≡ Flaw(N). X embodies N's flaw side at its worst, drives C and is faced in K. 12 faces per pack. |
| 2026-10-13 | The Gap (prompt rule) | Copy as prompt asks every beat to open a gap between what P expects and what the world gives back. |
| 2026-10-13 | Controlling Idea | N's axis becomes "Need prevails over Flaw, because …" in the theme bar and trace; the LLM finishes the cause from E and K. |

## Next: McKee ideas

Ending charge comes first: it's the cheaper of the two, and it suits cyberpunk's bittersweet endings.

| Item | What it adds | Touches | Estimate |
| --- | --- | --- | --- |
| Ending charge (up / down / ironic) | Endings stop being always positive. A small die or a tag on Z picks an up, down or ironic (win the Want, lose the Need, or the reverse) ending. | New die or Z tag, both packs, `packErrors`, prompt | About 1 hour |
| Negation of the negation | Each axis gets a 4-step ladder: Need, contrary, contradictory, worst form. All Is Lost must hit the worst form of N's flaw. | Pack format (`AXES`), both packs, PACKS.md | Half a day |

## Pack work

X is the smallest new gap: at 12 faces, half the axes have only one possible antagonist. Targets are PACKS.md's recommended die sizes.

| Die | tech-drama now | cyberpunk now | Target |
| --- | --- | --- | --- |
| X Antagonist | 12 | 12 | 16–24, evenly per axis |
| C Catalyst | 19 | 12 | 16–20 |
| S Sacrifice | 19 | 12 | 16–20, half Loss, half Bargain |
| ESC Clock | 17 | 12 | 16 |

- [ ] Grow X to 24 in both packs (3 per axis)
- [ ] Grow cyberpunk C, S and ESC to target
- [ ] Read `--sample 10` per pack and rewrite flat X faces

## Engine and housekeeping

The project isn't under version control yet, so `git init` comes before any bigger change.

- [ ] `git init` and a first commit of the current state
- [ ] Keep one engine regression check (Gate 1 X rule, lock steering) next to `check-pack.mjs`
- [ ] Mention the Controlling Idea line in README's Copy trace description

## Open questions

- Ending charge: a new die, or a tag on each Z face?
- Should X get type words like R's bond types (person, institution, inner voice), checked by the pack check?
- Is a third pack (horror, workplace satire) worth adding before the McKee work?
