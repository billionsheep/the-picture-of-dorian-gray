# HANDOFF – The Picture of Dorian Gray (Phaser/Vite)

## Project goal
A Rusty-Lake-like mini puzzle game adapted from *The Picture of Dorian Gray*.
Playable in browser + deploy to GitHub Pages.

## Tech
- Vite + TypeScript + Phaser
- Content-driven scene schema (src/content/scenes/*.ts) + TEXT_ASSETS (src/content/textAssets.ts)
- Inventory + flags + onUse
- Multi-scene switching implemented in PlayScene/SceneLoader

## Current gameplay (expected main path)
studio:
- letter -> get code_1230
- drawer (use code_1230) -> get hook + theatre_ticket
- curtain (use hook) -> portrait seen
- exit (requires ticket) -> goto dressingRoom

dressingRoom:
- lockbox (use code_1230) -> get attic_key
- costumeTrunk (use hook) -> get yellow_page
- exit (requires attic_key) -> goto attic

attic:
- trunk (use attic_key) -> get knife
- portrait -> two endings:
  - leaveEnding (non-knife)
  - knifeEnding (use knife / portraitKnife)

## Key files
- Engine/scene switching:
  - src/game/scenes/PlayScene.ts (gotoScene, loadScene, cleanup/rebuild)
  - src/game/core/SceneLoader.ts (scene registration)
- Content:
  - src/content/scenes/studio.ts
  - src/content/scenes/dressingRoom.ts
  - src/content/scenes/attic.ts
  - src/content/textAssets.ts

## Deploy
- GitHub Actions deploy workflow exists: .github/workflows/deploy.yml
- Vite base set for Pages (repo subpath)

## What to do next (task request)
1) Improve UX guidance to avoid “fly clicking”:
   - Add objective hint line per scene
   - Ensure every fail branch showText gives direction
2) Polish narrative text (Rusty Lake vibe, short lines, foreshadow)
3) Final acceptance checklist + README deliverable notes
Constraints: keep existing action system; minimize engine edits unless necessary.
