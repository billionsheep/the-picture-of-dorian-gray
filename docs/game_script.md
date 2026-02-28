# The Picture of Dorian Gray — Complete Game Script

---

## System

**Story Background:**
> You are Dorian.
> You once made a wish: let the portrait rot in your place.
> Tonight is the third night. Time is stuck at 12:30.
> Someone is hiding the painting - and themselves.
> Controls: click hotspots to read. Select an item in the inventory, then click a target to use it.

---

## Objectives (Top bar hints)

| Key | Text |
|-----|------|
| title | ...the canvas is waiting. |
| prologue | The clock has stopped. It always stops at the same time. |
| studioFindCode | Something is locked. The answer hangs on the wall. |
| studioOpenDrawer | The drawer remembers a time. Do you? |
| studioUseHook | The curtain breathes. Something wants to be seen. |
| studioGoTheatre | The studio has nothing left to show you. |
| dressingGetAtticKey | A box. A number. The same number, always. |
| dressingUseHook | The trunk seam holds a page that someone tried to forget. |
| dressingGoAttic | The key is warm. The door upstairs is not. |
| atticGetKnife | The chest is iron. The lock is old. You have what it needs. |
| atticUseKnife | The portrait is watching. It has always been watching. |

---

## Prologue

**context1:**
> Dorian Gray — a young man from over a century ago.
> A painter captured his beauty in a portrait.
> He made a wish: let the painting bear all his aging and sin.
> The wish came true. His face never changed.

**context2:**
> But the cost never disappeared.
> Every person he hurt, every lie he told, every crime he committed —
> all of it was written on the painting.
> Tonight, time has stopped at 12:30. The portrait is waiting for him upstairs.

**part1:**
> London nights look too clean.
> As if someone wiped the evidence before you arrived.

**part2:**
> He made a wish:
> Let the portrait take the years. Let the face stay.

**part3:**
> Tonight is the third night.
> The clock stops at 12:30 and refuses to move.

**part4:**
> Someone is hiding the painting.
> Not to protect it - to protect themselves.

**part5:**
> You begin in the studio.
> Find what was covered, then decide who pays the final price.

---

## Scene 1: Basil's Studio

**intro:**
> No wind in the studio.
> Only a painting that does not want to be seen.

### Letter
**letterFirst:**
> The paper is damp. The ink is sharp.
> "12:30. The third night."

**letterRepeat:**
> The ink has dried.
> But time still drips. 12:30.

### Drawer
**drawerLocked:**
> Locked.
> Like a smile that learned manners.

**drawerUseFail:**
> The keyhole is cold as a tooth.
> I do not need a key.

**drawerUseFailGuide:**
> What I need is that moment.
> The letter spelled it out once.

**drawerUnlocked:**
> Click.
> Something has been waiting in the dark for a long time.

**drawerUnlockedGuide:**
> A hook. A backstage pass.
> The curtain is next.

**drawerRepeatOpen:**
> The drawer gapes.
> Only the smell of wood remains.

**drawerOpenedUseHook:**
> The hook sits well in my hand.
> It does not belong in this mouth.

**drawerOpenedUseOtherFail:**
> The empty drawer will not yield answers again.

**drawerOpenedUseOtherGuide:**
> Something else in this room is still hiding.
> It fears my gaze more than the lock ever did.

### Curtain
**curtainLocked:**
> Don't.
> Not yet.
> I am not ready to see what sees me.

**curtainUseHookFail:**
> The cloth does not stir.
> My hands are too clean for this.

**curtainUseHookFailGuide:**
> Let the metal from the drawer do the dirty work.

**curtainUseHookSuccess:**
> Metal bites fabric.
> Inch by inch, an old secret learns light.

**curtainUseHookSuccessGuide:**
> The portrait is exposed.
> The pass in my palm can open the next door.

### Portrait
**portraitLocked:**
> I stare at the drape.
> It stares back.

**portraitSeen:**
> The shape under cloth is breathing.
> I should leave.

### Exit
**exitLocked:**
> The handle is cold.
> I need something that speaks for me - a ticket.

**exitToTheatre:**
> I hide the pass in my palm.
> A sick white light burns at the end of the hall.

### Mirror
**mirrorFirst:**
> The face in the mirror is too complete.
> Too complete to be alive.

**mirrorRepeat:**
> He is still watching.
> Longer than I can watch him.

**mirrorAfterDrawerOpen:**
> The glass clouds over.
> My face feels borrowed.

### Clock
**clockFirst:**
> The minute hand sits at six.
> The hour hand is crushed between twelve and one.
> It refuses to move.

**clockRepeat:**
> Still 12:30.
> Third night. No past.

### Paintbox
**paintboxFirst:**
> Pigment has crusted into dark red.
> Like an old wound that learned to dry.

**paintboxRepeat:**
> Turpentine.
> It cleans paint - not consequences.

### Ring
**ringFirst:**
> Cold metal.
> Inside, a small engraving:
> "Not the man. The finger."

**ringRepeat:**
> Faces decay.
> Metal remembers.

### Window
**windowFirst:**
> No view beyond the glass.
> Only a pale, grey sky.

**windowRepeat:**
> Fog presses its mouth to the window.
> As if someone is breathing outside.

---

## Scene 2: Theatre Dressing Room

**intro:**
> Backstage is an empty shell.
> The applause has already died.

### Playbill
**playbillFirst:**
> The clipping edges crackle.
> "Royal Theatre. Prussic Acid."

**playbillRepeat:**
> The ink has not changed.
> Only the cold in my reading.

### Lockbox
**lockboxHint:**
> The brass box keeps its mouth shut.
> I have seen that number before.

**lockboxUseCodeSuccess:**
> Four digits bite.
> Inside lies an attic key.

**lockboxUseCodeSuccessGuide:**
> One more thing in this room wants the hook.
> Then you can go upstairs.

**lockboxUseCodeFail:**
> The tumblers turn halfway, then retreat.
> Not this memory.

**lockboxUseCodeFailGuide:**
> The studio letter.
> Twelve. Thirty.

**lockboxOpened:**
> The lid stays open.
> It has already shown mercy once.

### Trunk
**trunkHint:**
> A yellowed page is trapped in the seam.
> My fingers cannot reach it.

**trunkUseHookSuccess:**
> The hook catches paper.
> It smells like damp ash.

**trunkUseHookSuccessGuide:**
> Now the key can take you upstairs.
> You've taken what you came for.

**trunkUseHookFail:**
> I pry at the gap.
> The paper hides deeper.

**trunkUseHookFailGuide:**
> The seam wants a hook.
> Nothing else fits.

**trunkOpened:**
> Only folds of costume cloth.
> Like skin after the curtain falls.

### Ashtray
**ashtrayHint:**
> Fresh ash in the tray.
> Not cigarette ash. Paper.
> Someone is waiting for me to turn a certain page into nothing.

**ashtrayUsePageFail:**
> The fire is waiting for "paper".
> That yellowed thing —
> it is wedged in the costume trunk seam, as if begging for help.

**ashtrayUsePageSuccess:**
> The flame licks the ink.
> Sybil's name blackens first — erased.
> The smoke stings, but that is good.
> As long as nobody has read this page — she never died.
> And I am innocent.

**ashtrayAfterBurned:**
> Ash crouches at the bottom of the tray.
> Like a mouth that shut itself.
> You thought it would never speak again.

### Exit
**exitLocked:**
> No handle on the attic door.
> A keyhole waiting for a real key.

**exitToAttic:**
> Key in lock - a small sound like bone.
> The stairs rise like a throat.

---

## Scene 3: Locked Attic

**intro:**
> Dust and secrets in one pile.
> Even breathing disturbs it.

### Trunk
**trunkHint:**
> Two old scars on the iron chest.
> One fits the attic key.

**trunkUseKeySuccess:**
> The bolt snaps.
> A thin knife waits for a hand.

**trunkUseKeySuccessGuide:**
> Knife in hand.
> The portrait is waiting.

**trunkUseKeyFail:**
> Metal shrieks for a moment.
> Not the right key.

**trunkUseKeyFailGuide:**
> The attic key is already mine.
> Use it. Properly.

**trunkOpened:**
> Only cold timber now.
> The knife is already with you.

### Portrait
**portraitPressure (general):**
> The portrait looks back.
> As if it wants me to confess first.

**portraitPressureUnburned (page not burned):**
> The portrait looks back.
> The page in my pocket is getting hot.
> As if reminding me: I have not finished telling my own story.

**portraitPressureBurned (page burned):**
> The portrait looks back.
> I smell ash.
> Ash followed me upstairs.
> Like a pair of hands I cannot wipe clean.

**portraitKnifePrompt:**
> The tip of the blade stops before the canvas.
> One step closer — no turning back.
> You will hear —
> yourself, begging.

**portraitKnifeFail:**
> My hand shakes.
> I need a blade that can actually end it.

**portraitKnifeFailGuide:**
> The iron chest.
> The knife.
> Choose it - then come back.

---

## Endings

### Ending: Departure (leave through the door)
> I turn away from the portrait.
> The door closes behind me, slowly.
> It stays up here - rotting in my place.

### Knife Action (both endings)
> Steel enters cloth.
> The whole house inhales at once.
>
> For a heartbeat I hear my own pulse -
> like footsteps belonging to a stranger.
>
> Somewhere, a young face keeps smiling.
> And the painting finally gets what it was owed.

### Ending: Confession (page NOT burned + knife)
> (White flash. Like a mirror shattering.)
>
> The blade sinks into canvas.
> I hear a sigh — mine, or its?
>
> Pain arrives at last. Clean. Precise.
> Like a verdict years overdue.
>
> They break down the door.
> On the wall the portrait is flawless — still young, still smiling.
> On the floor lies a withered old man, a knife in his chest.
> His fingers are shrivelled, yet they clutch a ring.
>
> Only by that ring do they recognise who he was.

### Ending: Hypocrisy (page burned + knife)
> (No white flash. Only black. Like ink poured into my eyes.)
>
> The evidence is burned.
> Nothing can judge me.
> I just need to destroy this painting —
> and I can be forever…
>
> Forever… forever…
>
> Why are you smiling?
> Stop smiling. Not with my face.
>
> (The words begin to break apart.)
>
> I am not guilty I am not guilty I am not —
>
> Later they found a body.
> Even in death, the old face still wore greed and terror.
> He died believing he had fooled the world.
>
> But the portrait on the wall knew:
> no one ever truly escapes.
