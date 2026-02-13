# HANDOFF_TEXT_EN_V1 — English-only Text Pack
Project: The Picture of Dorian Gray (micro Rusty-Lake style)
Scope: Replace all current in-game Chinese text with English text. Keep mechanics unchanged.

Notes
- Tone: short lines, cold, with gaps; hints are internalized as inner monologue (not “system instructions”).
- Objective UI can stay directive, but scene texts should feel like Dorian thinking, not the game teaching.
- Keep item IDs unchanged; only change display names.

------------------------------------------------------------
0) System / Meta
------------------------------------------------------------

[system.storyBackground]
You are Dorian.
You once made a wish: let the portrait rot in your place.
Tonight is the third night. Time is stuck at 12:30.
Someone is hiding the painting — and themselves.
Controls: click hotspots to read. Select an item in the inventory, then click a target to use it.

[system.musicMissing]
No BGM assets detected.
The music toggle is wired, but audio files are not yet integrated. (TODO)

------------------------------------------------------------
Objective Texts (UI)
(These can be used by your Objective panel in PlayScene.)
------------------------------------------------------------

[objective.title]
Goal: Click Start to enter the prologue.

[objective.prologue]
Goal: Finish the prologue. Understand the portrait and the time: 12:30.

[objective.studio_findClue]
Goal: Find the clue that can open the drawer (a specific time).

[objective.studio_openDrawer]
Goal: Use “12:30” to open the drawer and take what’s inside.

[objective.studio_liftCurtain]
Goal: Use the hook on the curtain. Reveal what was hidden.

[objective.studio_exit]
Goal: Leave the studio and reach the theatre backstage.

[objective.dressing_openLockbox]
Goal: Use 12:30 to open the lockbox. Obtain the attic key.

[objective.dressing_getPage]
Goal: Use the hook to pull the yellow page from the trunk seam.

[objective.dressing_toAttic]
Goal: Go upstairs with the attic key.

[objective.attic_openChest]
Goal: Use the attic key on the iron chest. Take the knife.

[objective.attic_choice]
Goal: Face the portrait. Make your choice.

------------------------------------------------------------
1) Title
------------------------------------------------------------

[title.settingsPlaceholder]
[Settings — Placeholder]
Background: Adapted from The Picture of Dorian Gray. A portrait takes the rot so the face can stay young.
Controls: click hotspots to read; select an inventory item first, then click a target to use it.
AI note: Parts of the prototype and text were drafted with AI assistance and then edited by a human.

(Title Start action: gotoScene('prologue'))

------------------------------------------------------------
2) Prologue (5 segments)
------------------------------------------------------------

[prologue.part1]
London nights look too clean.
As if someone wiped the evidence before you arrived.

[prologue.part2]
He made a wish:
Let the portrait take the years. Let the face stay.

[prologue.part3]
Tonight is the third night.
The clock stops at 12:30 and refuses to move.

[prologue.part4]
Someone is hiding the painting.
Not to protect it — to protect themselves.

[prologue.part5]
You begin in the studio.
Find what was covered, then decide who pays the final price.

(Then: gotoScene('studio'))

------------------------------------------------------------
3) Studio (Basil Studio)
------------------------------------------------------------

[studio.intro]
No wind in the studio.
Only a painting that does not want to be seen.

--- Letter ---
[studio.letterFirst]
The paper is damp. The ink is sharp.
“12:30. The third night.”

(Item gained: code_1230 — display name: “Time: 12:30”)

[studio.letterRepeat]
The ink has dried.
But time still drips. 12:30.

--- Drawer (locked/opened) ---
[studio.drawerLocked]
Locked.
Like a smile that learned manners.

[studio.drawerUseFail]
Nothing turns.
The keyhole does not recognize my impatience.

[studio.drawerUseFailGuide]  (If you currently show a second guide pop-up, use this)
The letter left a time behind my teeth.
Twelve. Thirty.

[studio.drawerUnlocked]
Click.
Something has been waiting in the dark for a long time.

[studio.drawerUnlockedGuide]
A hook. A backstage pass.
The curtain is next.

(Items gained: hook — “Hook”; theatre_ticket — “Backstage Pass”)

[studio.drawerRepeatOpen]
The drawer gapes.
Only the smell of wood remains.

[studio.drawerOpenedUseHook]
The hook sits well in my hand.
It does not belong in this mouth.

[studio.drawerOpenedUseOtherFail]
An empty drawer won’t answer twice.

[studio.drawerOpenedUseOtherFailGuide]
Something else is still covered.
The curtain.

--- Curtain / Portrait / Exit ---
[studio.curtainLocked]
Don’t.
Not yet.
I am not ready to see what sees me.

[studio.curtainUseHookFail]
The cloth won’t move.
My fingers are too clean for this.

[studio.curtainUseHookFailGuide]
The hook.
Let the metal do the dirty work.

[studio.curtainUseHookSuccess]
Metal bites fabric.
Inch by inch, an old secret learns light.

[studio.curtainUseHookSuccessGuide]
The portrait is exposed.
The pass in my palm can open the next door.

[studio.portraitLocked]
I stare at the drape.
It stares back.

[studio.portraitRevealed]
The shape under cloth is breathing.
I should leave.

[studio.exitLocked]
The handle is cold.
I need something that speaks for me — a ticket.

[studio.exitToTheatre]
I hide the pass in my palm.
A sick white light burns at the end of the hall.

(gotoScene('dressingRoom'))

--- Optional flavor hotspots ---
[studio.mirrorFirst]
The face in the mirror is too complete.
Too complete to be alive.

[studio.mirrorRepeat]
He is still watching.
Longer than I can watch him.

[studio.clockFirst]
The minute hand sits at six.
The hour hand is crushed between twelve and one.
It refuses to move.

[studio.clockRepeat]
Still 12:30.
Third night. No past.

[studio.paintboxFirst]
Pigment has crusted into dark red.
Like an old wound that learned to dry.

[studio.paintboxRepeat]
Turpentine.
It cleans paint — not consequences.

[studio.ringFirst]
Cold metal.
Inside, a small engraving:
“Not the man. The finger.”

[studio.ringRepeat]
Faces decay.
Metal remembers.

[studio.windowFirst]
No view beyond the glass.
Only a pale, grey sky.

[studio.windowRepeat]
Fog presses its mouth to the window.
As if someone is breathing outside.

------------------------------------------------------------
4) Dressing Room (Theatre Dressing Room)
------------------------------------------------------------

[dressingRoom.intro]
Backstage is an empty shell.
The applause has already died.

--- Playbill ---
[dressingRoom.playbillFirst]
The clipping edges crackle.
“Royal Theatre. Prussic Acid.”

[dressingRoom.playbillRepeat]
The ink hasn’t changed.
Only the cold in my reading.

--- Lockbox ---
[dressingRoom.lockboxHint]
The brass box keeps its mouth shut.
I have seen that number before.

[dressingRoom.lockboxUseFail]
The tumblers turn halfway, then retreat.
Not this memory.

[dressingRoom.lockboxUseFailGuide]
The studio letter.
Twelve. Thirty.

[dressingRoom.lockboxUseSuccess]
Four digits bite.
Inside lies an attic key.

(Item gained: attic_key — display name: “Attic Key”)

[dressingRoom.lockboxUseSuccessGuide]
One more thing in this room wants the hook.
Then you can go upstairs.

[dressingRoom.lockboxOpened]
The lid stays open.
It has already shown mercy once.

--- Costume trunk ---
[dressingRoom.trunkHint]
A yellowed page is trapped in the seam.
My fingers can’t reach it.

[dressingRoom.trunkUseFail]
I pry at the gap.
The paper hides deeper.

[dressingRoom.trunkUseFailGuide]
The seam wants a hook.
Nothing else fits.

[dressingRoom.trunkUseSuccess]
The hook catches paper.
It smells like damp ash.

(Item gained: yellow_page — display name: “Yellow Page”)

[dressingRoom.trunkUseSuccessGuide]
Now the key can take you upstairs.
You’ve taken what you came for.

[dressingRoom.trunkOpened]
Only folds of costume cloth.
Like skin after the curtain falls.

--- Exit ---
[dressingRoom.exitLocked]
No handle on the attic door.
A keyhole waiting for a real key.

[dressingRoom.exitToAttic]
Key in lock — a small sound like bone.
The stairs rise like a throat.

(gotoScene('attic'))

------------------------------------------------------------
5) Attic (Locked Attic)
------------------------------------------------------------

[attic.intro]
Dust and secrets in one pile.
Even breathing disturbs it.

--- Iron chest ---
[attic.chestHint]
Two old scars on the iron chest.
One fits the attic key.

[attic.chestUseFail]
Metal shrieks for a moment.
Not the right key.

[attic.chestUseFailGuide]
The attic key is already mine.
Use it. Properly.

[attic.chestUseSuccess]
The bolt snaps.
A thin knife waits for a hand.

(Item gained: knife — display name: “Knife”)

[attic.chestUseSuccessGuide]
Knife in hand.
The portrait is waiting.

[attic.chestOpened]
Only cold timber now.
The knife is already with you.

--- Portrait / final pressure ---
[attic.portraitPressure]
The portrait looks back.
As if it wants me to confess first.

[attic.portraitKnifePrompt]
The tip hovers over canvas.
One step closer — and there is no way back.

[attic.portraitUseFail]
My hand shakes.
I need a blade that can actually end it.

[attic.portraitUseFailGuide]
The iron chest.
The knife.
Choose it — then come back.

--- Endings ---
[attic.endingLeave]
I turn away from the portrait.
The door closes behind me, slowly.
It stays up here — rotting in my place.

[attic.endingKnife]
Steel enters cloth.
The whole house inhales at once.

For a heartbeat I hear my own pulse —
like footsteps belonging to a stranger.

Somewhere, a young face keeps smiling.
And the painting finally gets what it was owed.
