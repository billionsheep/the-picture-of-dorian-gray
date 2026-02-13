export const TEXT_ASSETS = {
  studio: {
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
    curtainAfterLifted: '布垂在一旁。\n像一张退场后的幕布。',

    portraitOpen: '遮布滑落。空气里像有一口陈年的霉味。\n它开始回看你。',
    end: '你以为你在刺向画像——但你听见刀子更像扎进了自己。',

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
} as const

export type TextAssetGroup = keyof typeof TEXT_ASSETS
