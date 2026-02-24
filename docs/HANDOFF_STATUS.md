# HANDOFF STATUS

Last updated: 2026-02-13

## 1) Project Status Overview

### Implemented
- [x] Title scene (`title`) with Start entry
- [x] Prologue scene (`prologue`) with 5-step intro then auto goto `studio`
- [x] Full 3-scene chain: `studio -> dressingRoom -> attic`
- [x] Inventory system (add/select/use/remove)
- [x] Flag-driven hotspot gating (`requireFlag`)
- [x] Objective HUD (top-right) with scene/flag/inventory-aware text updates
- [x] Global Settings modal (centered, backdrop, Back/overlay close)
- [x] Music toggle interface (mute switch), placeholder message when no BGM assets
- [x] End modal with replay controls (`Restart`, `Back to Title`)
- [x] Long text protection in modals: wrap + font fitting + pagination fallback
- [x] Responsive canvas/layout: Phaser `RESIZE`, world/hud container split, no hotspot-HUD overlap intent
- [x] Optional ashtray branch and dual portrait endings (Confession/Hypocrisy)

### Not implemented / partial
- [ ] Real looping BGM asset integration (currently interface only)
- [ ] Save/Continue system
- [ ] Multi-language switcher
- [ ] Dedicated credits/settings subpage UI (currently minimal modal)
- [ ] Formal automated gameplay E2E tests

## 2) Full Playthrough Path (including branches)

### Main flow
1. Title: click `Start` -> `gotoScene('prologue')`
2. Prologue: read/click through 5 text actions -> `gotoScene('studio')`
3. Studio:
   - Click `Letter` -> get item `code_1230`
   - Use `code_1230` on `Drawer` -> get `hook` + `theatre_ticket`
   - Use `hook` on `Curtain` -> reveal portrait and unlock exit state
   - Use `theatre_ticket` on `Exit` -> consume ticket and go `dressingRoom`
4. Dressing Room:
   - Use `code_1230` on `Lockbox` -> get `attic_key`, consume code
   - Use `hook` on `Costume Trunk` -> get `yellow_page`
   - Click/use `Exit` with attic access state -> `gotoScene('attic')`
5. Attic:
   - Use `attic_key` on `Trunk` -> get `knife`, consume key
   - Trigger one of endings below

### Endings
- Ending A (Confession): do **not** burn page (keep `page_unburned = true`), then use `knife` on portrait branch `attic_portrait_knife_unburned`
- Ending B (Hypocrisy): in Dressing Room use `yellow_page` on `Ashtray` (sets `page_burned = true`), then in Attic use `knife` on `attic_portrait_knife_burned`
- Ending C (Leave): click `attic_exit_leave` directly in attic

### Optional branch
- Ashtray branch in Dressing Room is optional for progression, but determines portrait ending branch state (`page_burned` / `page_unburned`)

## 3) Content Structure (TEXT_ASSETS)

### Groups
- `system` (story background, music placeholder)
- `objective` (HUD goal lines)
- `title`
- `prologue`
- `studio`
- `dressingRoom`
- `attic`

### Key additions/rewrites in current phase
- Added objective copy set under `TEXT_ASSETS.objective.*`
- Added ashtray lines under `TEXT_ASSETS.dressingRoom.ashtray*`
- Added dual ending keys under `TEXT_ASSETS.attic.endingConfession` and `TEXT_ASSETS.attic.endingHypocrisy`
- Added/expanded fail guidance keys for critical interactions
- Rewrote major story/UI text into English single-language values

### Current language status
- Runtime game text source (`src/content/textAssets.ts`) is currently English-only
- Note: `docs/story_script.md` is stale (still Chinese-heavy narrative snapshot), not the runtime source of truth

## 4) Core Mechanisms and Data Model

### Scene schema
- `SceneConfig`: `id`, `title`, `hotspots`, optional `startActions`, optional `flagsInitial`
- `HotspotConfig`: `id`, `rect`, optional `label`, optional `requireFlag`, `onClick`, optional `onUse`
- `UseRule`: `accepts[]`, `success[]`, `fail[]`
- `Action` union: `showText`, `addItem`, `removeItem`, `setFlag`, `gotoScene`, `end`

### Runtime behavior
- `PlayScene.loadScene` loads config from `SceneLoader`, initializes missing flags from `flagsInitial`
- Hotspots are always rendered; interactability is gated by `requireFlag` + current `flags`
- With selected inventory item + hotspot `onUse`: match in `accepts` => run `success`; else run `fail`
- `setFlag` triggers hotspot and objective refresh
- `removeItem` also clears `selectedItemId` if removed item was selected
- `end` opens ending modal; `gotoScene` transitions immediately

### State model
- `flags`: persistent in-session dictionary, reset only by restart flow
- `inventory`: in-memory list with unique `itemId` entries

## 5) Core File Map (priority order)

### Highest impact / most changed
1. `src/game/scenes/PlayScene.ts`
   - Main runtime: scene load, action execution, inventory, objective, settings modal, dialog/end modal rendering, responsive layout
2. `src/content/textAssets.ts`
   - All narrative/UI strings and objective lines

### Scene content layer
3. `src/content/scenes/title.ts`
   - Title entry scene
4. `src/content/scenes/prologue.ts`
   - Intro text sequence and jump to Studio
5. `src/content/scenes/studio.ts`
   - First puzzle chain and ticket-gated transition
6. `src/content/scenes/dressingRoom.ts`
   - Mid puzzle chain + ashtray branch + attic key path
7. `src/content/scenes/attic.ts`
   - Final chain + branching endings

### Core wiring/deploy
8. `src/game/core/schema.ts`
   - Action/schema contracts
9. `src/game/core/SceneLoader.ts`
   - Scene registry (`title`, `prologue`, `studio`, `dressingRoom`, `attic`)
10. `vite.config.ts`
   - GitHub Pages `base` handling (`/the-picture-of-dorian-gray/` on build)
11. `.github/workflows/deploy.yml`
   - GitHub Pages CI build/deploy pipeline

## 6) Local Dev / Build / Deploy Notes

### Local
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

### GitHub Pages deployment
- Workflow triggers on push to `main` (and manual dispatch)
- Build artifacts come from `dist/`
- `vite.config.ts` must keep `base` aligned with repo path for production build
- Pages environment uses Actions deploy (not branch copy)

### Deployment checklist
- [x] `vite.config.ts` sets build `base` to repo subpath
- [x] workflow does `npm ci` + `npm run build` + upload `dist`
- [ ] Consider updating `actions/upload-pages-artifact` to newer major if desired

## 7) Known Issues / Risks

- [ ] Text key drift risk: scene key references can silently break into undefined text if keys are renamed without cross-check
- [ ] Narrative consistency risk: some ending keys currently share similar/identical English body text (`knifeEnding`/`endingConfession`/`endingHypocrisy`), reducing branch differentiation
- [ ] Flag persistence model: `flagsInitial` only seeds undefined flags; stale values can carry across scenes in a session by design
- [ ] No real BGM assets yet; Settings music toggle is functional but uses placeholder response
- [ ] Doc drift risk: docs may not match runtime strings (`story_script.md` currently outdated)

## 8) Recommended Next Steps (highest ROI first)

1. Differentiate ending prose strongly (`endingConfession` vs `endingHypocrisy`) and verify branch identity in playtest
2. Add a lightweight key-reference validator script/checklist (scene key -> `TEXT_ASSETS` key existence) to prevent undefined text regressions
3. Integrate actual looping BGM asset and autoplay-safe start rule (first user interaction), keep current toggle wiring
4. Refresh docs parity: regenerate/update `docs/story_script.md` and align README with current English runtime
5. Add minimal automated smoke E2E (Title -> Prologue -> Studio -> Ending) for release confidence

## Build Result (for this handoff update)

- Command: `npm run build`
- Status: **Success**
- Output summary: TypeScript + Vite build completed; `dist/` generated.
- Note: Vite reported large chunk warning (>500kB after minification), not a build blocker.
