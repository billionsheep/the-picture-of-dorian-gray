export const TEXT_ASSETS = {
  studio: {
    letter: '墙上的时钟刚敲过十二点半。这是第三个夜晚。\n把它记下来：12:30。',
    drawerLocked: '锁住了。像一个体面人的微笑。',
    drawerUnlocked: '咔哒。有什么东西在里面等了很久。',
    useFail: '这不符合美学的和谐。',
    portraitLocked: '别碰它。别现在。',
    portraitOpen: '遮布滑落。空气里像有一口陈年的霉味。\n它开始回看我。',
    end: '你以为你在刺向画像——但你听见刀子更像扎进了自己。',
  },
} as const

export type TextAssetGroup = keyof typeof TEXT_ASSETS
