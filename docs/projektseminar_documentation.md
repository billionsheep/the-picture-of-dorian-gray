# From Pages to Pixels: An Interactive Adaptation of Oscar Wilde's *The Picture of Dorian Gray*

## Projektseminar Documentation

**Student:** [Your Name]
**Programme:** [Your Programme]
**Semester:** Winter Semester 2025/26
**Supervisor:** Prof. Dr. Ingo Berensmeyer

---

## 1. Introduction: Why a Game?

Oscar Wilde's *The Picture of Dorian Gray* (1890/1891) is a novel built around a single, devastating image: a portrait that absorbs its subject's sins while the subject himself remains eternally young. The story's power lies not in plot complexity — the events are relatively straightforward — but in the tension between what is visible and what is hidden, between surface beauty and concealed corruption. This tension, I argue, maps naturally onto the mechanics of point-and-click puzzle games, where the player must look beneath surfaces, investigate hidden objects, and piece together meaning from environmental clues.

This project is an interactive digital adaptation of *The Picture of Dorian Gray*, built as a browser-based point-and-click puzzle game inspired by the **Rusty Lake / Cube Escape** series. Rather than retelling Wilde's novel in linear fashion, the game distils its thematic essence — vanity, moral decay, the cost of aesthetic obsession — into three interconnected rooms that the player must explore, solve puzzles within, and ultimately confront the portrait itself.

The game was developed using **Phaser 3** (a JavaScript game framework), **TypeScript**, and **Vite**, and runs entirely in a web browser. All visual assets were generated using AI image generation to maintain a consistent hand-painted, sepia-toned Victorian gothic aesthetic. Original background music was sourced and integrated to create an immersive atmospheric experience.

---

## 2. Conceptual Framework: Literature as Interactive Experience

### 2.1 The Limits of Passive Reading

Traditional literary study privileges the reader as a passive recipient of narrative. While close reading, annotation, and critical analysis are invaluable tools, they position the student *outside* the text. My project seeks to explore what happens when we place the reader *inside* the literary work — not as a passive observer, but as an active agent who must make choices that carry moral weight.

This approach draws on theories of **interactive narrative** and **ludoludology** (the study of games as meaning-making systems). As Ian Bogost argues in *Persuasive Games* (2007), games can make arguments through their mechanics — through what they allow and forbid, reward and punish. A puzzle game about Dorian Gray does not merely *describe* moral corruption; it asks the player to *enact* it.

### 2.2 Why Rusty Lake?

The **Rusty Lake** series (developed by Rusty Lake Studio, Amsterdam) provides an ideal formal model for this adaptation. These games are characterised by:

- **Claustrophobic single-room environments** that reward careful observation
- **Symbolic object interactions** where everyday items carry metaphorical weight
- **A pervasive atmosphere of unease** created through art style, music, and narrative ambiguity
- **Multiple endings** that reflect the player's choices and moral alignment

These qualities align remarkably well with the thematic concerns of *The Picture of Dorian Gray*: the locked room functions as a metaphor for Dorian's sealed-off conscience; the hidden objects parallel the secrets he conceals; and the multiple endings mirror the novel's exploration of whether redemption is possible — or merely another form of vanity.

---

## 3. Game Design and Structure

### 3.1 Narrative Adaptation

The game compresses the novel's plot into a first-person experience told through fragments. The player inhabits a version of Dorian Gray in the final act of the story, revisiting three key locations:

1. **Basil Hallward's Studio** — where the portrait was painted. Here, the player finds a letter, a clock code, and a drawer containing a hook and a backstage pass. The studio establishes the theme of artistic creation and its dangerous consequences.

2. **The Theatre Dressing Room** — associated with Sibyl Vane and the world of performance. The player uses items from the studio to unlock a lockbox (obtaining a key to the attic) and a trunk (obtaining a torn page from a book — evidence of past sins). The dressing room explores Dorian's cruelty and the destruction of innocence.

3. **The Locked Attic** — the culmination. Using the key, the player opens a chest to find a knife. The portrait awaits. The player must choose: use the knife on the portrait, confronting what they have become.

### 3.2 The Branching Ending

The game features **three distinct endings**, determined by the player's actions across the three rooms:

- **The Confession Ending** (portrait intact + knife): Dorian destroys the portrait in an act of genuine remorse. The painting returns to its original beauty; Dorian is found dead, aged and withered — recognisable only by his ring. This mirrors the novel's conclusion.

- **The Hypocrisy Ending** (page burned + knife): If the player burns the evidence of their sins before confronting the portrait, the act of destroying it becomes one of self-preservation rather than repentance. Dorian dies believing he has fooled the world, but the portrait knows the truth.

- **The Departure Ending** (leave through the door): The player can simply walk away, leaving the portrait to rot in the attic. This ending — absent from Wilde's novel — explores the possibility of cowardice as a third moral position.

### 3.3 Puzzle Design as Literary Interpretation

Each puzzle in the game is designed to function as an act of literary interpretation:

| Puzzle | Literary Parallel |
|--------|-------------------|
| Reading the letter to find a clock code | Dorian's initial encounter with Lord Henry's corrupting influence |
| Setting the clock to unlock a drawer | The passage of time that Dorian escapes but cannot evade |
| Using the hook on a curtain | Unveiling hidden truths (cf. the veil metaphor in Wilde) |
| Choosing whether to burn the page | The temptation to destroy evidence of moral failure |
| Using the knife on the portrait | The climactic act of self-confrontation |

The player's interaction with each puzzle is, in effect, a reenactment of the novel's key moral moments.

---

## 4. Technical Implementation

### 4.1 Technology Stack

The game was built using:

- **Phaser 3**: An open-source HTML5 game framework providing scene management, input handling, and audio playback
- **TypeScript**: For type-safe game logic and scene configuration
- **Vite**: As the build tool and development server
- **AI Image Generation**: All background scenes and item icons were generated to maintain a consistent visual style

### 4.2 Architecture

The game uses a **data-driven architecture** where game content is separated from engine logic:

- **Scene configurations** (TypeScript data files) define each room's hotspots, items, puzzles, dialogue text, and flag conditions
- **A generic PlayScene engine** interprets these configurations at runtime, handling rendering, input, inventory management, and scene transitions
- **An action system** with types including `showText`, `addItem`, `removeItem`, `setFlag`, `gotoScene`, `changeBackground`, and `end` — allowing complex narrative sequences to be authored without modifying engine code

This architecture means that new scenes, puzzles, and narrative branches can be added simply by writing new configuration data, making the system extensible for future literary adaptations.

### 4.3 Visual Design

The visual aesthetic draws directly from the Rusty Lake series: warm sepia tones, thick oil-painting brush strokes, and soft amber candlelight. All three main scenes (Studio, Dressing Room, Attic) were generated with consistent style parameters to ensure visual coherence.

A key visual moment occurs when the player uses the knife on the portrait: the background dynamically switches to a slashed version of the painting, showing deep cuts across the canvas with the original painting torn and destroyed. This real-time visual change — implemented through a custom `changeBackground` action — creates a visceral moment of consequence that passive reading cannot replicate.

### 4.4 Sound Design

Three original background music tracks were integrated into the game, each matched to the emotional register of its scene:

- **Title / Studio / Dressing Room**: A melancholic, ambient track with piano and strings
- **Prologue**: A more ethereal, atmospheric piece establishing the story's tone
- **Attic**: A darker, more oppressive track with low-frequency tension

The music system supports seamless transitions between scenes sharing the same track (e.g., Studio → Dressing Room) and automatic switching when entering a scene with different music.

---

## 5. Reflection: What the Game Reveals About the Novel

### 5.1 The Player as Dorian

The most significant insight gained through this project is how **embodiment changes interpretation**. When reading the novel, Dorian's final act — stabbing the portrait — can feel inevitable, even predetermined. But when the player holds the knife in their inventory and must *choose* to click on the portrait, the moment acquires a weight that passive reading cannot provide.

Several playtesters reported hesitation at this moment — a reluctance to click — despite knowing it was "just a game." This hesitation, I suggest, is precisely the kind of readerly engagement that Wilde himself sought to provoke: an aesthetic experience that forces self-examination.

### 5.2 The Politics of Puzzles

Designing the puzzles revealed something about the novel's structure that I had not previously appreciated: **the degree to which Dorian is trapped by his own past actions**. In the game, each item obtained in one room becomes the key to progress in another. The clock code from the letter unlocks the drawer; the hook from the drawer opens the curtain; the ticket grants access to the dressing room; the key from the dressing room opens the attic.

This chain of dependency mirrors the novel's logic of consequence: each act of cruelty or vanity produces the conditions for the next. The game makes this causal chain *tactile* in a way that narrative prose does not.

### 5.3 What Is Lost in Translation

It would be dishonest not to acknowledge what is lost in this adaptation. Wilde's prose — his epigrammatic wit, his sensuous descriptions, his philosophical dialogues — cannot be replicated in the fragmentary text boxes of a puzzle game. The game's text works in a different register: suggestive, atmospheric, elliptical. It gestures toward Wilde's language without attempting to reproduce it.

This is, perhaps, the central limitation and the central insight of the project: **literary adaptation is always a form of translation**, and translation always involves both loss and discovery.

---

## 6. Conclusion

This project demonstrates that interactive digital media can serve as a productive tool for literary engagement — not as a replacement for close reading, but as a complement to it. By translating the thematic concerns of *The Picture of Dorian Gray* into the mechanics of a point-and-click puzzle game, the project reveals aspects of the novel's structure (its logic of consequence, its exploration of moral choice, its concern with surfaces and depths) that are difficult to appreciate through reading alone.

The game is playable in a standard web browser at no cost and requires no installation. It represents approximately 120 hours of development work encompassing narrative design, puzzle design, visual asset creation, music curation, and software engineering.

Future development could extend the game with additional scenes (Lord Henry's salon, the opium den, Sibyl Vane's theatre), more complex puzzle chains, and deeper engagement with Wilde's secondary texts, particularly *The Decay of Lying* and *The Critic as Artist*, which theorise the relationship between art and morality that the novel dramatises.

---

## 7. Bibliography

### Primary Literature

- Wilde, Oscar. *The Picture of Dorian Gray*. Ed. Joseph Bristow. Oxford: Oxford University Press, 2006 [1890/1891].
- Wilde, Oscar. "The Decay of Lying." *Intentions*. London: Osgood, McIlvaine, 1891.
- Wilde, Oscar. "The Critic as Artist." *Intentions*. London: Osgood, McIlvaine, 1891.

### Secondary Literature

- Bogost, Ian. *Persuasive Games: The Expressive Power of Videogames*. Cambridge, MA: MIT Press, 2007.
- Eco, Umberto. *The Role of the Reader: Explorations in the Semiotics of Texts*. Bloomington: Indiana University Press, 1979.
- Hayles, N. Katherine. *Electronic Literature: New Horizons for the Literary*. Notre Dame: University of Notre Dame Press, 2008.
- Murray, Janet H. *Hamlet on the Holodeck: The Future of Narrative in Cyberspace*. Cambridge, MA: MIT Press, 2017 [1997].
- Regan, Stephen. "Oscar Wilde and Aestheticism." *The Cambridge Companion to Oscar Wilde*. Ed. Peter Raby. Cambridge: Cambridge University Press, 1997. 20–38.
- Ryan, Marie-Laure. *Narrative as Virtual Reality: Immersion and Interactivity in Literature and Electronic Media*. Baltimore: Johns Hopkins University Press, 2001.

### Game References

- Rusty Lake Studio. *Cube Escape* series. 2015–present. [https://www.rustylake.com](https://www.rustylake.com)

### Technical References

- Phaser 3 Game Framework. [https://phaser.io](https://phaser.io)
- Vite Build Tool. [https://vitejs.dev](https://vitejs.dev)

---

## Appendix: How to Run the Game

1. Ensure **Node.js** (v18 or later) is installed on your machine.
2. Open a terminal in the project root directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open `http://localhost:5173` in a web browser (Chrome or Firefox recommended).
6. Click **Start** to begin.

The game takes approximately 10–15 minutes to complete. Multiple playthroughs are encouraged to experience all three endings.
