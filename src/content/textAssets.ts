export const TEXT_ASSETS = {
  system: {
    storyBackground:
      '你叫道林。你许过一个愿：让画像替你承受腐坏。\n第三个夜晚，时间停在 12:30。\n有人在隐藏画像，你必须顺着线索找到它。\n操作：点击热区触发文本；先选中背包物品，再点击目标尝试使用。',
    musicMissing: '未检测到 BGM 资源。\n当前仅保留音乐开关接口（TODO: 接入音频文件）。',
  },
  objective: {
    title: '目标：点击 Start，进入序章。',
    prologue: '目标：读完序章，理解画像与 12:30 的秘密。',
    studioFindCode: '目标：先找出能打开抽屉的线索（12:30）。',
    studioOpenDrawer: '目标：用“12:30”打开抽屉，拿到可用道具。',
    studioUseHook: '目标：把挂钩用在幕布上，看到被隐藏的画像。',
    studioGoTheatre: '目标：离开画室，前往剧院后台。',
    dressingGetAtticKey: '目标：用 12:30 打开锁盒，拿到阁楼钥匙。',
    dressingUseHook: '目标：用挂钩勾出戏服箱缝里的纸页。',
    dressingGoAttic: '目标：带着阁楼钥匙上楼。',
    atticGetKnife: '目标：用阁楼钥匙开箱，取出刀。',
    atticUseKnife: '目标：面对画像，做出你的选择。',
  },
  title: {
    settingsPlaceholder:
      '【Settings 占位】\n背景：本作改编自《道林·格雷的画像》，主题是以画像承受腐坏。\n操作：点击热区触发文本；先在下方背包选择物品，再点击目标可尝试使用。\nAI 声明：部分文案与原型实现由 AI 协助生成，已人工审阅。',
  },
  prologue: {
    part1: '伦敦的夜太干净了。\n干净得像有人提前擦掉了罪证。',
    part2: '他许下愿望：让画像替他承受岁月与腐坏。\n于是，脸留下，代价被藏起来。',
    part3: '今晚是第三个夜晚。\n屋里的钟停在 12:30，不肯再往前。',
    part4: '有人在隐瞒那幅画。\n不是为了保护它，是为了保护自己。',
    part5: '你将从画室开始。\n找到被藏起的真相，再决定谁来付最后的代价。',
  },
  studio: {
    intro: '画室里没有风。\n只有一幅不愿被看的画。',
    letterFirst: '纸页有潮气。字却很锋利。\n“12:30。第三个夜晚。”',
    letterRepeat: '墨迹已经干了。\n时间还在滴。12:30。',

    drawerLocked: '锁住了。像一个体面人的微笑。',
    drawerUseFail: '钥匙孔没有反应。\n它不认识这种冲动。',
    drawerUseFailGuide: '先去看信，记下 12:30。\n再把这个时间用在抽屉上。',
    drawerUnlocked: '咔哒。有什么东西在里面等了很久。',
    drawerUnlockedGuide: '你拿到了挂钩和后台通行票。\n下一步：试着用挂钩处理幕布。',
    drawerRepeatOpen: '抽屉张着嘴。\n里面只剩下木头的气味。',
    drawerOpenedUseHook: '你把挂钩在手里掂了掂。\n它更适合布，不适合木头。',
    drawerOpenedUseOtherFail: '空抽屉不会再给你答案。',
    drawerOpenedUseOtherGuide: '去找还没处理的目标。\n现在最可疑的是那块幕布。',

    curtainLocked: '别碰它。别现在。\n你还没有准备好。',
    curtainUseHookFail: '布料纹丝不动。\n你需要更“对”的形状。',
    curtainUseHookFailGuide: '试着先选中“挂钩”，再点幕布。\n顺序不对就不会生效。',
    curtainUseHookSuccess: '挂钩咬住了布边。\n一寸一寸，旧秘密见光。',
    curtainUseHookSuccessGuide: '画像已经露出。\n你可以带着票从出口去剧院后台。',
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
    lockboxUseCodeSuccessGuide: '阁楼门已经有解法。\n先检查戏服箱，再上楼。',
    lockboxUseCodeFail: '锁芯转了半圈又退回。\n不是这串记忆。',
    lockboxUseCodeFailGuide: '回想画室那封信：12:30。\n把这个时间输入锁盒。',
    lockboxOpened: '盒盖敞着。\n它已经给过你一次仁慈。',

    trunkHint: '戏服箱缝里卡着一页泛黄纸。\n手够不到。',
    trunkUseHookSuccess: '挂钩勾出一页纸。\n纸味像潮湿的灰。',
    trunkUseHookSuccessGuide: '线索已经到手。\n现在可以带阁楼钥匙去上层。',
    trunkUseHookFail: '你撬了两下。\n纸仍躲在缝里。',
    trunkUseHookFailGuide: '这道缝需要“挂钩”。\n先在背包选中挂钩，再点箱子。',
    trunkOpened: '空箱里只剩布料的褶皱。\n像退场后的皮肤。',

    exitLocked: '通往阁楼的门没有把手。\n锁孔在等一把真正的钥匙。',
    exitToAttic: '钥匙进锁，发出细小的骨响。\n楼梯向上，像喉咙。',
  },
  attic: {
    intro: '阁楼把灰尘和秘密堆在一起。\n呼吸都会惊动它。',
    trunkHint: '铁箱有两道锁痕。\n其中一道正好配那把阁楼钥匙。',
    trunkUseKeySuccess: '锁舌弹开。\n你拿到一把细长的刀。',
    trunkUseKeySuccessGuide: '刀已经在你手里。\n去面对画像，选择结束方式。',
    trunkUseKeyFail: '金属摩擦出刺耳短音。\n这不是它要的钥匙。',
    trunkUseKeyFailGuide: '先确认背包里已选中“阁楼钥匙”。\n再对铁箱使用。',
    trunkOpened: '箱子里只剩冷木味。\n刀已经在你手里。',

    portraitPressure: '画像回看你。\n像在等你先承认。',
    portraitKnifePrompt: '刀尖停在画布前。\n再近一点，就没有回头路。',
    portraitKnifeFail: '你的手在抖。\n你需要一把真正能结束它的刀。',
    portraitKnifeFailGuide: '先去铁箱拿刀。\n拿到后在背包选中“调色刀”再碰画像。',

    leaveEnding: '你转身离开阁楼。\n门在身后慢慢合上。\n画像还在那儿，继续替你腐烂。',
    knifeEnding: '你把刀送进画布。\n一声闷响后，整栋屋子一起吸气。\n你终于听见自己的心跳，像陌生人的脚步。',
  },
} as const

export type TextAssetGroup = keyof typeof TEXT_ASSETS
