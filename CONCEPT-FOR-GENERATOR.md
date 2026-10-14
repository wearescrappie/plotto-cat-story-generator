This document specifies the system architecture for a modernized, polyhedral story-generation engine combining William Wallace Cook’s *Plotto* algebraic causality with Blake Snyder’s *Save the Cat!* structural gating.
---

## Architectural Overview

The core engine bridges two distinct narrative disciplines:
1. **Micro-Causality (*Plotto* Algebra)**: Manages typed character variables, mechanical devices, and explicit state changes where situation \(A\) provides the necessary preconditions for situation \(B\).
2. **Macro-Pacing (*Save the Cat!* Beat Gates)**: Enforces narrative momentum across fifteen classical beats grouped into five structural validation checkpoints.



Instead of rolling all elements simultaneously as disconnected prompts, generation proceeds sequentially through five gates. Each gate requires the user (or software validator) to satisfy specific dramatic preconditions before unlocking downstream dice pools.

***

## Polyhedral Narrative Inventory

The standard configuration utilizes a six-die core array, six gate dice that each drive one beat, an antagonist die, two structural modulation dice and an optional genre trope die.

| Die Pool | Face Count | Functional Role | Mathematical / Dramatic Domain |
|---|:---:|---|---|
| **Character Position** | `d12` | Social footing, vulnerability, baseline status quo | Archetypal role, institutional dependence, social leverage |
| **Want (External)** | `d12` | Tangible objective driving immediate action | Measurable real-world pursuit (status, escape, extraction) |
| **Theme / Need** | `d8` | Value conflict requiring internal transformation | Moral binary (\(\text{Autonomy} \leftrightarrow \text{Belonging}\), \(\text{Truth} \leftrightarrow \text{Safety}\)) |
| **Relationship Anchor**| `d12` | Relational counterpart complicating the pursuit | Typed bond (`mentor`, `dependent`, `rival`, `co-conspirator`) |
| **Modern Mechanism** | `d20` | Contemporary catalytic object or system | Tangible plot asset/threat (synthetic media, debt ledger, exploit) |
| **Reversal / Consequence**| `d12` | Narrative fallout and status transformation | Structural outcome (inversion, exposure, false victory, pyrrhic gain) |
| **Pressure / Catalyst** | `d12` | Gate 1 disruption of the status quo, demanding proactive intervention | Inciting event (accusation, eviction, leak, sudden erasure) |
| **Antagonist** | `d12` | Gate 1 force of antagonism behind \(C\), faced again in \(K\) (after McKee's *Story*) | The flaw side of \(N\) at its worst, with a face: what \(P\) becomes if \(W\) wins |
| **Pressure Escalation** | `d12` | Gate 3 ticking clock that makes the midpoint irreversible | Timed, irreversible event (hearing date, demolition, deactivation) |
| **Sacrifice / Whiff of Death** | `d12` | Gate 4 loss that destroys \(W\) or the protagonist's fallback | Outright loss or bargain (forfeiture, betrayal offer, death of a refuge) |
| **Epiphany Lock** | `d8` | Gate 4 conscious adoption of the Need \(N\) | Realization on the Need side of \(N\)'s moral binary |
| **Climax Crucible** | `d20` | Gate 5 confrontation that needs Act II's skills and Act IV's change at once | Collective set piece resolved with \(R\)'s lessons (live leak, coordinated action, public refusal) |
| **New Normal / Inversion** | `d12` | Gate 5 final equilibrium, mirroring and reversing the Opening Image | Inversion of \(P\)'s opening state (dependence → ownership, isolation → community) |
| **Midpoint Polarity** | `d6` | Act III structural pivot orientation | 1–3: False Victory; 4–6: False Defeat  |
| **Algebra Operator** | `d6` | *Plotto* state transformation primitive | Transformative operation applied to character or device variables  |
| **Genre Trope (Opt.)** | `d20` | Genre-specific convention modifier | Situational container (*enemies-to-lovers*, *isolated outpost*, *whistleblower*) |

***

## The 5 Beat Gates: Function & Ability Specification

```
[Gate 1: Inciting Setup] ➔ [Gate 2: Arena & B-Story] ➔ [Gate 3: Midpoint Pivot] ➔ [Gate 4: The Crucible] ➔ [Gate 5: Synthesis Finale]
```

### Gate 1: The Inciting Setup (*Save the Cat!* Beats 1–5)

* **Covered Beats**: Opening Image, Theme Stated, Setup, Catalyst, Debate.
* **Active Dice Rolled**:
  * `d12 Character Position` (\(P\))
  * `d12 Want` (\(W\))
  * `d8 Theme / Need` (\(N\))
  * `d12 Pressure / Catalyst` (\(C\))
  * `d12 Antagonist` (\(X\))
* **Mechanical Functions**:
  * **\(P\) (Protagonist)**: Establishes baseline resources, social leverage, and systemic vulnerability.
  * **\(W\) (External Want)**: Defines the immediate, conscious trajectory of the protagonist.
  * **\(N\) (Thematic Need)**: Governs the moral argument and character flaw.
  * **\(C\) (Catalyst)**: Disrupts the status quo, demanding proactive intervention.
  * **\(X\) (Antagonist)**: The force of antagonism. It sets \(C\) in motion, closes in at Bad Guys Close In and is confronted in \(K\). The story is only as strong as \(X\).
* **Gating Validation Rule**:
  $$\text{Gate}_1: W \not\equiv N \quad \land \quad X \equiv \text{Flaw}(N)$$
  *The external goal \(W\) must contradict the internal transformation \(N\), and the antagonist \(X\) must embody \(N\)'s flaw side taken to its extreme.* The protagonist must attempt to solve the disruption using their existing behavioral paradigm, which is structurally doomed to fail.

***

### Gate 2: The Arena & B-Story (*Save the Cat!* Beats 6–8)

* **Covered Beats**: Break into Two, B-Story, Fun and Games (Promise of the Premise).
* **Active Dice Rolled**:
  * `d12 Relationship Anchor` (\(R\))
  * `d20 Modern Mechanism / Arena` (\(M\))
  * `d20 Genre Trope` (\(T\), optional)
* **Mechanical Functions**:
  * **\(R\) (Relationship Anchor)**: Introduces the character who delivers or represents the thematic argument \(N\).
  * **\(M\) (Modern Mechanism)**: Defines the dynamic sandbox or system where the protagonist tests new tactics (e.g., algorithmic black-market, regulatory audit, isolated server cluster).
  * **\(T\) (Genre Trope, optional)**: Sets the genre container for Fun and Games, the Promise of the Premise (e.g., *enemies-to-lovers*, *isolated outpost*, *whistleblower*).
* **Gating Validation Rule**:
  $$\text{Gate}_2: \text{Role}(R) \in \text{Domain}(N) \quad \land \quad \text{Agency}(P, M) = \text{Proactive}$$
  *Character \(R\) must embody the internal Need \(N\), and the Arena \(M\) must demand active, tangible choices rather than passive observation.*

***

### Gate 3: The Midpoint Pivot (*Save the Cat!* Beats 9–10)

* **Covered Beats**: Midpoint, Bad Guys Close In.
* **Active Dice Rolled**:
  * `d6 Midpoint Polarity`
  * `d6 Algebra Operator`
  * `d12 Reversal / Consequence`
  * `d12 Pressure Escalation`
* **Mechanical Functions**:
  * **Polarity Die**: Determines whether the midpoint represents a **False Victory** (protagonist seemingly attains \(W\)) or **False Defeat** (initial strategy collapses publicly).
  * **Algebra Operator**: Executes a structural transformation on a primary variable:
    1. *Invert*: An asset becomes a direct liability.
    2. *Transfer*: Complications shift from \(P\) to \(R\).
    3. *Escalate*: Stakes jump from private/financial to physical/existential.
    4. *Reveal*: Pre-existing causation or hidden collusion comes to light.
    5. *Sever*: An essential institutional lifeline or ally is eliminated.
    6. *Enclose*: An irreversible deadline or physical boundary is imposed.
  * **Reversal / Consequence Die**: Delivers the operation's fallout, a permanent change in status (inversion, exposure, pyrrhic gain), so the stakes cannot fall back.
  * **Pressure Escalation Die**: Starts the ticking clock.
* **Gating Validation Rule**:
  $$\text{Gate}_3: \Delta(\text{Stakes}) > 0 \quad \land \quad \text{Clock} = \text{Active}$$
  *The Midpoint must permanently destroy the status quo of Act I; stakes must elevate from personal discomfort to irreversible consequences, activating a ticking clock.*

***

### Gate 4: The Crucible (*Save the Cat!* Beats 11–12)

* **Covered Beats**: All Is Lost, Dark Night of the Soul.
* **Active Dice Rolled**:
  * `d12 Sacrifice / Whiff of Death` (\(S\))
  * `d8 Epiphany Lock` (\(E\))
* **Mechanical Functions**:
  * **\(S\) (Sacrifice)**: Destroys the original external Want (\(W\)) or eliminates the protagonist’s fallback position.
  * **\(E\) (Epiphany)**: Forces conscious alignment with the thematic Need (\(N\)).
* **Gating Validation Rule**:
  $$\text{Gate}_4: \text{Surrender}(W) = \text{True} \quad \land \quad \text{Adoption}(N) = \text{True}$$
  *The initial strategy must die. The protagonist cannot progress to Gate 5 while clinging to their Act I worldview.*

***

### Gate 5: The Synthesis Finale (*Save the Cat!* Beats 13–15)

* **Covered Beats**: Break into Three, Finale (Five-Point Execution), Final Image.
* **Active Dice Rolled**:
  * `d20 Climax Crucible` (\(K\))
  * `d12 New Normal / Inversion` (\(Z\))
* **Mechanical Functions**:
  * **\(K\) (Climax Crucible)**: High-pressure confrontation requiring simultaneous deployment of the technical skills learned in Act II and the moral transformation achieved in Act IV.
  * **\(Z\) (New Normal)**: Establishes post-resolution equilibrium, mirroring and reversing the Opening Image from Gate 1.
* **Gating Validation Rule**:
  $$\text{Gate}_5: \text{Mechanism}(K) \in \text{Lessons}(R) \quad \land \quad \text{State}(Z) \equiv \text{Inversion}(\text{State}(P_1))$$
  *The climax must be resolved using principles taught by \(R\) during the B-Story, and the final state must visually or structurally invert the opening image.*

***

## End-to-End Execution Trace

To illustrate the engine in practice, consider an automated run configured for a contemporary technological drama:

```text
[GATE 1]
- P (Character): Displaced investigative journalist surviving on platform gig-contracts (d12: 4)
- W (Want): Win a permanent in-house editorial contract with a media conglomerate (d12: 8)
- N (Need/Theme): Autonomy & Community Solidarity vs. Complicity & Self-Preservation (d8: 3)
- C (Catalyst): Leaked municipal telemetry revealing automated resource denial in public housing (d12: 11)
Validation: PASS (W seeks institutional security; N demands opposing corporate complicity)

[GATE 2]
- R (B-Story Anchor): Grassroots housing archivist documenting elder displacement (d12: 7)
- M (Arena/Mechanism): Infiltrating a proprietary data-annotation facility employing undocumented laborers (d20: 16)
Validation: PASS (R embodies community solidarity; M forces proactive physical and digital infiltration)

[GATE 3]
- Midpoint Polarity: False Victory (d6: 2) -> P publishes a heavily edited scoop, securing corporate contract offer
- Algebra Operator: Transfer (d6: 2) -> Conglomerate hands P's raw interview notes to municipal police
- Reversal / Consequence: Pyrrhic Gain (d12: 2) -> R is arrested on the evidence P's scoop supplied
- Pressure Escalation: A grand jury convenes Monday (d12: 5)
Validation: PASS (P's short-term victory directly triggers the arrest of R; professional stakes turn mortal)

[GATE 4]
- S (Sacrifice): Corporate employer demands an NDA and ownership surrender of all source files under threat of blacklist (d12: 6)
- E (Epiphany): P realizes financial security inside an extractive conglomerate is voluntary imprisonment (d8: 3)
Validation: PASS (P burns the contract, explicitly abandoning W to embrace N)

[GATE 5]
- K (Climax): P and the data workers coordinate an un-censorable live leak during a televised municipal investor keynote (d20: 9)
- Z (New Normal): P is blacklisted from legacy media, operating a decentralized neighborhood investigation wire from the union hall (d12: 12)
Validation: PASS (Climax executes B-Story collective tactics; Final Image reverses Opening Image isolation)
```

***

## Implementation Considerations

For digital tools (web apps, local terminal utilities, or Obsidian/TTRPG plugins), this system provides significant practical advantages over generic large-language-model prompts:
1. **Explainable Mechanics**: Every generated turning point points to an underlying causal link or operator rather than an unpredictable AI hallucination.
2. **Selective Rerolling**: Writers can lock five gates and reroll single dice (e.g., changing only the *Modern Mechanism* or *Algebra Operator*) without collapsing the global story logic.
3. **Pluggable Packs**: Swapping the `d20 Modern Mechanism` and `d12 Character Position` pools allows the same algebraic spine to generate hard science fiction, psychological horror, political thrillers, or workplace satire while retaining structural rigor.

---

## Sources

- [Plotto: how-to](https://plotto.tedt.org/how-to.html)
- [Plotto master formula](https://garykac.github.io/plotto/plotto-mf.html)
