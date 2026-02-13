export const TEXT_ASSETS = {
  system: {
    storyBackground:
      'You are Dorian.\nYou once made a wish: let the portrait rot in your place.\nTonight is the third night. Time is stuck at 12:30.\nSomeone is hiding the painting - and themselves.\nControls: click hotspots to read. Select an item in the inventory, then click a target to use it.',
    musicMissing: 'No BGM assets detected.\nThe music toggle is wired, but audio files are not yet integrated. (TODO)',
  },
  objective: {
    title: 'Goal: Click Start to enter the prologue.',
    prologue: 'Goal: Finish the prologue. Understand the portrait and the time: 12:30.',
    studioFindCode: 'Goal: Find the clue that can open the drawer (a specific time).',
    studioOpenDrawer: 'Goal: Use "12:30" to open the drawer and take what is inside.',
    studioUseHook: 'Goal: Use the hook on the curtain. Reveal what was hidden.',
    studioGoTheatre: 'Goal: Leave the studio and reach the theatre backstage.',
    dressingGetAtticKey: 'Goal: Use 12:30 to open the lockbox. Obtain the attic key.',
    dressingUseHook: 'Goal: Use the hook to pull the yellow page from the trunk seam.',
    dressingGoAttic: 'Goal: Go upstairs with the attic key.',
    atticGetKnife: 'Goal: Use the attic key on the iron chest. Take the knife.',
    atticUseKnife: 'Goal: Face the portrait. Make your choice.',
  },
  title: {
    settingsPlaceholder:
      '[Settings - Placeholder]\nBackground: Adapted from The Picture of Dorian Gray. A portrait takes the rot so the face can stay young.\nControls: click hotspots to read; select an inventory item first, then click a target to use it.\nAI note: Parts of the prototype and text were drafted with AI assistance and then edited by a human.',
  },
  prologue: {
    part1: 'London nights look too clean.\nAs if someone wiped the evidence before you arrived.',
    part2: 'He made a wish:\nLet the portrait take the years. Let the face stay.',
    part3: 'Tonight is the third night.\nThe clock stops at 12:30 and refuses to move.',
    part4: 'Someone is hiding the painting.\nNot to protect it - to protect themselves.',
    part5: 'You begin in the studio.\nFind what was covered, then decide who pays the final price.',
  },
  studio: {
    intro: 'No wind in the studio.\nOnly a painting that does not want to be seen.',
    letterFirst: 'The paper is damp. The ink is sharp.\n"12:30. The third night."',
    letterRepeat: 'The ink has dried.\nBut time still drips. 12:30.',

    drawerLocked: 'Locked.\nLike a smile that learned manners.',
    drawerUseFail: 'Nothing turns.\nThe keyhole does not recognize my impatience.',
    drawerUseFailGuide: 'The letter left a time behind my teeth.\nTwelve. Thirty.',
    drawerUnlocked: 'Click.\nSomething has been waiting in the dark for a long time.',
    drawerUnlockedGuide: 'A hook. A backstage pass.\nThe curtain is next.',
    drawerRepeatOpen: 'The drawer gapes.\nOnly the smell of wood remains.',
    drawerOpenedUseHook: 'The hook sits well in my hand.\nIt does not belong in this mouth.',
    drawerOpenedUseOtherFail: 'An empty drawer will not answer twice.',
    drawerOpenedUseOtherGuide: 'Something else is still covered.\nThe curtain.',

    curtainLocked: "Don't.\nNot yet.\nI am not ready to see what sees me.",
    curtainUseHookFail: 'The cloth will not move.\nMy fingers are too clean for this.',
    curtainUseHookFailGuide: 'The hook.\nLet the metal do the dirty work.',
    curtainUseHookSuccess: 'Metal bites fabric.\nInch by inch, an old secret learns light.',
    curtainUseHookSuccessGuide: 'The portrait is exposed.\nThe pass in my palm can open the next door.',
    portraitLocked: 'I stare at the drape.\nIt stares back.',
    portraitSeen: 'The shape under cloth is breathing.\nI should leave.',
    exitLocked: 'The handle is cold.\nI need something that speaks for me - a ticket.',
    exitToTheatre: 'I hide the pass in my palm.\nA sick white light burns at the end of the hall.',

    mirrorFirst: 'The face in the mirror is too complete.\nToo complete to be alive.',
    mirrorRepeat: 'He is still watching.\nLonger than I can watch him.',
    mirrorAfterDrawerOpen: 'The glass clouds over.\nMy face feels borrowed.',

    clockFirst: 'The minute hand sits at six.\nThe hour hand is crushed between twelve and one.\nIt refuses to move.',
    clockRepeat: 'Still 12:30.\nThird night. No past.',

    paintboxFirst: 'Pigment has crusted into dark red.\nLike an old wound that learned to dry.',
    paintboxRepeat: 'Turpentine.\nIt cleans paint - not consequences.',

    ringFirst: 'Cold metal.\nInside, a small engraving:\n"Not the man. The finger."',
    ringRepeat: 'Faces decay.\nMetal remembers.',

    windowFirst: 'No view beyond the glass.\nOnly a pale, grey sky.',
    windowRepeat: 'Fog presses its mouth to the window.\nAs if someone is breathing outside.',
  },
  dressingRoom: {
    intro: 'Backstage is an empty shell.\nThe applause has already died.',
    playbillFirst: 'The clipping edges crackle.\n"Royal Theatre. Prussic Acid."',
    playbillRepeat: 'The ink has not changed.\nOnly the cold in my reading.',

    lockboxHint: 'The brass box keeps its mouth shut.\nI have seen that number before.',
    lockboxUseCodeSuccess: 'Four digits bite.\nInside lies an attic key.',
    lockboxUseCodeSuccessGuide: 'One more thing in this room wants the hook.\nThen you can go upstairs.',
    lockboxUseCodeFail: 'The tumblers turn halfway, then retreat.\nNot this memory.',
    lockboxUseCodeFailGuide: 'The studio letter.\nTwelve. Thirty.',
    lockboxOpened: 'The lid stays open.\nIt has already shown mercy once.',

    trunkHint: 'A yellowed page is trapped in the seam.\nMy fingers cannot reach it.',
    trunkUseHookSuccess: 'The hook catches paper.\nIt smells like damp ash.',
    trunkUseHookSuccessGuide: "Now the key can take you upstairs.\nYou've taken what you came for.",
    trunkUseHookFail: 'I pry at the gap.\nThe paper hides deeper.',
    trunkUseHookFailGuide: 'The seam wants a hook.\nNothing else fits.',
    trunkOpened: 'Only folds of costume cloth.\nLike skin after the curtain falls.',

    ashtrayHint: 'A yellowed page is trapped in the seam.\nMy fingers cannot reach it.',
    ashtrayUsePageFail: 'I pry at the gap.\nThe paper hides deeper.',
    ashtrayUsePageSuccess: 'The hook catches paper.\nIt smells like damp ash.',
    ashtrayAfterBurned: 'Only folds of costume cloth.\nLike skin after the curtain falls.',

    exitLocked: 'No handle on the attic door.\nA keyhole waiting for a real key.',
    exitToAttic: 'Key in lock - a small sound like bone.\nThe stairs rise like a throat.',
  },
  attic: {
    intro: 'Dust and secrets in one pile.\nEven breathing disturbs it.',
    trunkHint: 'Two old scars on the iron chest.\nOne fits the attic key.',
    trunkUseKeySuccess: 'The bolt snaps.\nA thin knife waits for a hand.',
    trunkUseKeySuccessGuide: 'Knife in hand.\nThe portrait is waiting.',
    trunkUseKeyFail: 'Metal shrieks for a moment.\nNot the right key.',
    trunkUseKeyFailGuide: 'The attic key is already mine.\nUse it. Properly.',
    trunkOpened: 'Only cold timber now.\nThe knife is already with you.',

    portraitPressure: 'The portrait looks back.\nAs if it wants me to confess first.',
    portraitPressureUnburned: 'The portrait looks back.\nAs if it wants me to confess first.',
    portraitPressureBurned: 'The portrait looks back.\nAs if it wants me to confess first.',
    portraitKnifePrompt: 'The tip hovers over canvas.\nOne step closer - and there is no way back.',
    portraitKnifeFail: 'My hand shakes.\nI need a blade that can actually end it.',
    portraitKnifeFailGuide: 'The iron chest.\nThe knife.\nChoose it - then come back.',

    leaveEnding: 'I turn away from the portrait.\nThe door closes behind me, slowly.\nIt stays up here - rotting in my place.',
    knifeEnding:
      'Steel enters cloth.\nThe whole house inhales at once.\n\nFor a heartbeat I hear my own pulse -\nlike footsteps belonging to a stranger.\n\nSomewhere, a young face keeps smiling.\nAnd the painting finally gets what it was owed.',
    endingConfession:
      'Steel enters cloth.\nThe whole house inhales at once.\n\nFor a heartbeat I hear my own pulse -\nlike footsteps belonging to a stranger.\n\nSomewhere, a young face keeps smiling.\nAnd the painting finally gets what it was owed.',
    endingHypocrisy:
      'Steel enters cloth.\nThe whole house inhales at once.\n\nFor a heartbeat I hear my own pulse -\nlike footsteps belonging to a stranger.\n\nSomewhere, a young face keeps smiling.\nAnd the painting finally gets what it was owed.',
  },
} as const

export type TextAssetGroup = keyof typeof TEXT_ASSETS
