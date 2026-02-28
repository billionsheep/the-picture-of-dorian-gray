# 🎨 The Picture of Dorian Gray — Interactive Puzzle Game

> *An interactive browser-based point-and-click puzzle game adapting Oscar Wilde's novel, inspired by the [Rusty Lake / Cube Escape](https://www.rustylake.com/) series.*

![Title Screen](docs/screenshots/title.png)

## About

This project reimagines Oscar Wilde's *The Picture of Dorian Gray* (1890) as a **point-and-click puzzle game** set in three interconnected Victorian rooms. Instead of passively reading, the player *embodies* Dorian Gray in the novel's final act — exploring environments, solving puzzles, and making choices that lead to one of **three distinct endings**.

The game was built as a creative project for the **Projektseminar** course (English Literature) at **LMU Munich**.

### Key Features

- 🕯 **Three atmospheric scenes** — Basil's Studio, Theatre Dressing Room, Locked Attic
- 🧩 **Environmental puzzles** — find items, combine clues, unlock secrets
- 🎭 **Three moral endings** — Confession, Hypocrisy, or Departure
- 🎨 **AI-generated Victorian gothic art** — consistent hand-painted sepia aesthetic
- 🎵 **Atmospheric background music** — scene-specific ambient soundtracks
- 📖 **Literary depth** — every puzzle mirrors a thematic element from the novel

## 🎮 Play Online

👉 **[https://billionsheep.github.io/the-picture-of-dorian-gray/](https://billionsheep.github.io/the-picture-of-dorian-gray/)**

## Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18+

### Quick Start
```bash
git clone https://github.com/billionsheep/the-picture-of-dorian-gray.git
cd the-picture-of-dorian-gray
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build
```bash
npm run build
# Output in dist/ — serve with any static file server
```

## 🕹 How to Play

| Action | How |
|--------|-----|
| Examine objects | Click on hotspots in the scene |
| Collect items | Items appear in the inventory bar (bottom) |
| Use items | Select an item (click in inventory), then click a target |
| Navigate | Click exits when you have the right item |
| Settings | Click ⚙ in the top bar (music toggle, restart) |

**Playtime:** ~10–15 minutes per playthrough. Multiple runs recommended to see all endings.

## 🏠 Game Structure

```
Title → Prologue → Studio → Dressing Room → Attic → Ending
                      ↑          ↑              ↓
                      └──────────┘         3 possible endings
```

### Three Endings

| Ending | Condition | Theme |
|--------|-----------|-------|
| **Confession** | Keep the evidence, use the knife | Genuine remorse — mirrors the novel's conclusion |
| **Hypocrisy** | Burn the evidence, then use the knife | Self-deception — Dorian dies believing he fooled everyone |
| **Departure** | Walk away through the door | Cowardice — the portrait rots alone |

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Game engine | [Phaser 3](https://phaser.io/) |
| Language | TypeScript |
| Build tool | [Vite](https://vitejs.dev/) |
| Art | AI-generated (Victorian gothic, sepia palette) |
| Architecture | Data-driven scene configs + generic engine |

## 📁 Project Structure

```
├── public/
│   ├── audio/           # Background music (.ogg)
│   ├── backgrounds/     # Scene backgrounds (.png)
│   └── items/           # Inventory icons (.png)
├── src/
│   ├── content/
│   │   ├── scenes/      # Scene configs (hotspots, puzzles, flags)
│   │   └── textAssets.ts # All game dialogue
│   └── game/
│       ├── core/        # Schema, scene loader
│       └── scenes/      # PlayScene engine
└── docs/
    ├── game_script.md   # Complete game text
    └── projektseminar_documentation.md
```

## 📝 Academic Context

This game was developed as a creative project for the **Projektseminar** (English Literature) at **Ludwig-Maximilians-Universität München (LMU)**, supervised by Prof. Dr. Ingo Berensmeyer.

The project explores how interactive media can serve as a tool for literary engagement — translating the thematic concerns of Wilde's novel (vanity, moral decay, the cost of aesthetic obsession) into puzzle mechanics and player choice. See [`docs/projektseminar_documentation.md`](docs/projektseminar_documentation.md) for the full project report.

## Credits

- **Game design & development:** Xi C.
- **Original novel:** Oscar Wilde, *The Picture of Dorian Gray* (1890/1891)
- **Visual inspiration:** [Rusty Lake Studio](https://www.rustylake.com/)
- **Game framework:** [Phaser 3](https://phaser.io/) (MIT License)
- Art assets generated with AI assistance; background music sourced for atmospheric use.

## License

This project is open-sourced for educational purposes. The game text is an original creative adaptation and is not a reproduction of Wilde's novel (which is in the public domain).
