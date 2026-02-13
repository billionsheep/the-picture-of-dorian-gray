export const TEXT_ASSETS = {
  studio: {
    intro: '画室里没有风。\n只有一幅不愿被看的画。',
    letterFirst: '纸页有潮气。字却很锋利。\n“12:30。第三个夜晚。”',
    letterRepeat: '墨迹已经干了。\n时间还在滴。12:30。',

    drawerLocked: '锁住了。像一个体面人的微笑。',
    drawerUseFail: '钥匙孔没有反应。\n它不认识这种冲动。',
    drawerUnlocked: '咔哒。有什么东西在里面等了很久。',
    drawerRepeatOpen: '抽屉张着嘴。\n里面只剩下木头的气味。',
    drawerOpenedUseHook: '你把挂钩在手里掂了掂。\n它更适合布，不适合木头。',
    drawerOpenedUseOtherFail: '空抽屉不会再给你答案。',

    curtainLocked: '别碰它。别现在。\n你还没有准备好。',
    curtainUseHookFail: '布料纹丝不动。\n你需要更“对”的形状。',
    curtainUseHookSuccess: '挂钩咬住了布边。\n一寸一寸，旧秘密见光。',
    portraitLocked: '你盯着遮布。\n它也在盯着你。',
    portraitSeen: '布下的轮廓在呼吸。\n你最好离开这里。',
    exitLocked: '门把手很冷。\n你还缺一张能说服后台的票。',
    exitToTheatre: '你把票塞进掌心。\n走廊尽头亮着病白的灯。',

    mirrorFirst: '镜子里的我太完整了。\n完整到不像活人。',
    mirrorRepeat: '他还在看我。\n比我看他更久。',
    mirrorAfterDrawerOpen: '镜面起了一层雾。\n我的脸，像借来的。',

    clockFirst: '分针停在六。\n时针压着十二和一之间。\n它拒绝再走。',
    clockRepeat: '还是十二点半。\n第三夜，没有过去。',

    paintboxFirst: '颜料结成暗红的壳。\n像一场很久以前的伤口。',
    paintboxRepeat: '你闻到松节油。\n它洗不掉某些东西。',

    ringFirst: '戒圈很冷。\n内侧刻着一行小字：\n“非其人，由于指。”',
    ringRepeat: '脸会坏掉。\n手上的金属会记得。',

    windowFirst: '玻璃外没有风景。\n只有一层灰白的天。',
    windowRepeat: '雾贴在窗上。\n像有人在外面呼吸。',
  },
  dressingRoom: {
    intro: '后台像一只空壳。\n掌声已经死了。',
    playbillFirst: '剪报边缘发脆。\n“Royal Theatre。Prussic Acid。”',
    playbillRepeat: '字没有变。\n只是你读它时更冷了。',

    lockboxHint: '黄铜锁盒把嘴闭得很紧。\n你见过这个数字。',
    lockboxUseCodeSuccess: '四位数字咬合。\n盒里躺着一把阁楼钥匙。',
    lockboxUseCodeFail: '锁芯转了半圈又退回。\n不是这串记忆。',
    lockboxOpened: '盒盖敞着。\n它已经给过你一次仁慈。',

    trunkHint: '戏服箱缝里卡着一页泛黄纸。\n手够不到。',
    trunkUseHookSuccess: '挂钩勾出一页纸。\n纸味像潮湿的灰。',
    trunkUseHookFail: '你撬了两下。\n纸仍躲在缝里。',
    trunkOpened: '空箱里只剩布料的褶皱。\n像退场后的皮肤。',

    exitLocked: '通往阁楼的门没有把手。\n锁孔在等一把真正的钥匙。',
    exitToAttic: '钥匙进锁，发出细小的骨响。\n楼梯向上，像喉咙。',
  },
  attic: {
    intro: '阁楼把灰尘和秘密堆在一起。\n呼吸都会惊动它。',
    trunkHint: '铁箱有两道锁痕。\n其中一道正好配那把阁楼钥匙。',
    trunkUseKeySuccess: '锁舌弹开。\n你拿到一把细长的刀。',
    trunkUseKeyFail: '金属摩擦出刺耳短音。\n这不是它要的钥匙。',
    trunkOpened: '箱子里只剩冷木味。\n刀已经在你手里。',

    portraitPressure: '画像回看你。\n像在等你先承认。',
    portraitKnifePrompt: '刀尖停在画布前。\n再近一点，就没有回头路。',
    portraitKnifeFail: '你的手在抖。\n你需要一把真正能结束它的刀。',

    leaveEnding: '你转身离开阁楼。\n门在身后慢慢合上。\n画像还在那儿，继续替你腐烂。',
    knifeEnding: '你把刀送进画布。\n一声闷响后，整栋屋子一起吸气。\n你终于听见自己的心跳，像陌生人的脚步。',
  },
} as const

export type TextAssetGroup = keyof typeof TEXT_ASSETS
