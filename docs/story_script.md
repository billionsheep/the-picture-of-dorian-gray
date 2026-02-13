# The Picture of Dorian Gray - Full Story Script (Current Build)

This document is a narrative/script review sheet generated from the current content files:
- `src/content/textAssets.ts`
- `src/content/scenes/title.ts`
- `src/content/scenes/prologue.ts`
- `src/content/scenes/studio.ts`
- `src/content/scenes/dressingRoom.ts`
- `src/content/scenes/attic.ts`

It is organized by player flow, and keeps all currently used text lines for design review.

## 0) System / Meta Text

### Settings -> Story / Background
你叫道林。你许过一个愿：让画像替你承受腐坏。  
第三个夜晚，时间停在 12:30。  
有人在隐藏画像，你必须顺着线索找到它。  
操作：点击热区触发文本；先选中背包物品，再点击目标尝试使用。

### Music Missing Placeholder
未检测到 BGM 资源。  
当前仅保留音乐开关接口（TODO: 接入音频文件）。

### Objective Texts (UI)
- 目标：点击 Start，进入序章。
- 目标：读完序章，理解画像与 12:30 的秘密。
- 目标：先找出能打开抽屉的线索（12:30）。
- 目标：用“12:30”打开抽屉，拿到可用道具。
- 目标：把挂钩用在幕布上，看到被隐藏的画像。
- 目标：离开画室，前往剧院后台。
- 目标：用 12:30 打开锁盒，拿到阁楼钥匙。
- 目标：用挂钩勾出戏服箱缝里的纸页。
- 目标：带着阁楼钥匙上楼。
- 目标：用阁楼钥匙开箱，取出刀。
- 目标：面对画像，做出你的选择。

## 1) Title

### Title -> Settings Placeholder
【Settings 占位】  
背景：本作改编自《道林·格雷的画像》，主题是以画像承受腐坏。  
操作：点击热区触发文本；先在下方背包选择物品，再点击目标可尝试使用。  
AI 声明：部分文案与原型实现由 AI 协助生成，已人工审阅。

### Title -> Start
- Action: `gotoScene('prologue')`

## 2) Prologue (5 segments)

1. 伦敦的夜太干净了。  
   干净得像有人提前擦掉了罪证。
2. 他许下愿望：让画像替他承受岁月与腐坏。  
   于是，脸留下，代价被藏起来。
3. 今晚是第三个夜晚。  
   屋里的钟停在 12:30，不肯再往前。
4. 有人在隐瞒那幅画。  
   不是为了保护它，是为了保护自己。
5. 你将从画室开始。  
   找到被藏起的真相，再决定谁来付最后的代价。

Then: `gotoScene('studio')`.

## 3) Studio (Basil Studio)

### Intro
画室里没有风。  
只有一幅不愿被看的画。

### Mainline Hotspots

#### Letter
- First:
  - 纸页有潮气。字却很锋利。  
    “12:30。第三个夜晚。”
  - Add item: `code_1230`
- Repeat:
  - 墨迹已经干了。  
    时间还在滴。12:30。

#### Drawer (locked/opened)
- Click locked:
  - 锁住了。像一个体面人的微笑。
- Use wrong item (fail):
  - 钥匙孔没有反应。  
    它不认识这种冲动。
  - 先去看信，记下 12:30。  
    再把这个时间用在抽屉上。
- Use `code_1230` (success):
  - 咔哒。有什么东西在里面等了很久。
  - 你拿到了挂钩和后台通行票。  
    下一步：试着用挂钩处理幕布。
  - Add items: `hook`, `theatre_ticket`

- Opened repeat:
  - 抽屉张着嘴。  
    里面只剩下木头的气味。
- Opened + use `hook`:
  - 你把挂钩在手里掂了掂。  
    它更适合布，不适合木头。
- Opened + use wrong item (fail):
  - 空抽屉不会再给你答案。
  - 去找还没处理的目标。  
    现在最可疑的是那块幕布。

#### Curtain / Portrait / Exit
- Curtain click:
  - 别碰它。别现在。  
    你还没有准备好。
- Curtain + wrong item (fail):
  - 布料纹丝不动。  
    你需要更“对”的形状。
  - 试着先选中“挂钩”，再点幕布。  
    顺序不对就不会生效。
- Curtain + `hook` (success):
  - 挂钩咬住了布边。  
    一寸一寸，旧秘密见光。
  - 画像已经露出。  
    你可以带着票从出口去剧院后台。

- Portrait locked:
  - 你盯着遮布。  
    它也在盯着你。
- Portrait revealed:
  - 布下的轮廓在呼吸。  
    你最好离开这里。

- Exit locked:
  - 门把手很冷。  
    你还缺一张能说服后台的票。
- Exit to theatre:
  - 你把票塞进掌心。  
    走廊尽头亮着病白的灯。
  - `gotoScene('dressingRoom')`

### Optional Flavor Hotspots
- Mirror first: 镜子里的我太完整了。完整到不像活人。
- Mirror repeat: 他还在看我。比我看他更久。
- Clock first: 分针停在六。时针压着十二和一之间。它拒绝再走。
- Clock repeat: 还是十二点半。第三夜，没有过去。
- Paintbox first: 颜料结成暗红的壳。像一场很久以前的伤口。
- Paintbox repeat: 你闻到松节油。它洗不掉某些东西。
- Ring first: 戒圈很冷。内侧刻着一行小字：“非其人，由于指。”
- Ring repeat: 脸会坏掉。手上的金属会记得。
- Window first: 玻璃外没有风景。只有一层灰白的天。
- Window repeat: 雾贴在窗上。像有人在外面呼吸。

## 4) Dressing Room (Theatre Dressing Room)

### Intro
后台像一只空壳。  
掌声已经死了。

### Mainline Hotspots

#### Playbill
- First:
  - 剪报边缘发脆。  
    “Royal Theatre。Prussic Acid。”
- Repeat:
  - 字没有变。  
    只是你读它时更冷了。

#### Lockbox
- Hint click:
  - 黄铜锁盒把嘴闭得很紧。  
    你见过这个数字。
- Use wrong code/item (fail):
  - 锁芯转了半圈又退回。  
    不是这串记忆。
  - 回想画室那封信：12:30。  
    把这个时间输入锁盒。
- Use `code_1230` (success):
  - 四位数字咬合。  
    盒里躺着一把阁楼钥匙。
  - 阁楼门已经有解法。  
    先检查戏服箱，再上楼。
  - Add item: `attic_key`
- Opened:
  - 盒盖敞着。  
    它已经给过你一次仁慈。

#### Costume Trunk
- Hint click:
  - 戏服箱缝里卡着一页泛黄纸。  
    手够不到。
- Use wrong item (fail):
  - 你撬了两下。  
    纸仍躲在缝里。
  - 这道缝需要“挂钩”。  
    先在背包选中挂钩，再点箱子。
- Use `hook` (success):
  - 挂钩勾出一页纸。  
    纸味像潮湿的灰。
  - 线索已经到手。  
    现在可以带阁楼钥匙去上层。
  - Add item: `yellow_page`
- Opened:
  - 空箱里只剩布料的褶皱。  
    像退场后的皮肤。

#### Exit
- Exit locked:
  - 通往阁楼的门没有把手。  
    锁孔在等一把真正的钥匙。
- Exit to attic:
  - 钥匙进锁，发出细小的骨响。  
    楼梯向上，像喉咙。
  - `gotoScene('attic')`

## 5) Attic (Locked Attic)

### Intro
阁楼把灰尘和秘密堆在一起。  
呼吸都会惊动它。

### Mainline Hotspots

#### Trunk
- Hint click:
  - 铁箱有两道锁痕。  
    其中一道正好配那把阁楼钥匙。
- Use wrong item (fail):
  - 金属摩擦出刺耳短音。  
    这不是它要的钥匙。
  - 先确认背包里已选中“阁楼钥匙”。  
    再对铁箱使用。
- Use `attic_key` (success):
  - 锁舌弹开。  
    你拿到一把细长的刀。
  - 刀已经在你手里。  
    去面对画像，选择结束方式。
  - Add item: `knife`
- Opened:
  - 箱子里只剩冷木味。  
    刀已经在你手里。

#### Portrait
- Portrait pressure:
  - 画像回看你。  
    像在等你先承认。
- Portrait knife prompt:
  - 刀尖停在画布前。  
    再近一点，就没有回头路。
- Portrait + wrong item (fail):
  - 你的手在抖。  
    你需要一把真正能结束它的刀。
  - 先去铁箱拿刀。  
    拿到后在背包选中“调色刀”再碰画像。

### Endings

#### Leave Ending (exit door)
你转身离开阁楼。  
门在身后慢慢合上。  
画像还在那儿，继续替你腐烂。

#### Knife Ending (use knife on portrait)
你把刀送进画布。  
一声闷响后，整栋屋子一起吸气。  
你终于听见自己的心跳，像陌生人的脚步。

## 6) Flow Snapshot (Design Review)

Title -> Prologue -> Studio -> Dressing Room -> Attic -> (Knife Ending | Leave Ending)

Core item/lock chain:
- Letter -> `code_1230`
- Drawer(`code_1230`) -> `hook` + `theatre_ticket`
- Curtain(`hook`) -> portrait reveal + studio exit ready
- Lockbox(`code_1230`) -> `attic_key`
- Costume trunk(`hook`) -> `yellow_page`
- Attic trunk(`attic_key`) -> `knife`
- Portrait(`knife`) -> knife ending, or leave via exit
