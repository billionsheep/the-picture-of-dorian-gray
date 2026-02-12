# Studio Scene 配置草案（供实现时参考）

> 注意：这是“内容草案”，不绑定具体文件格式（TS/JSON 均可）。实现时请遵循 /docs/SCENE_SCHEMA.md

scene: studio
background: (placeholder or solid color)

hotspots:
- letter:
  rect: x=120,y=220,w=180,h=120
  onClick:
    - showText: “墙上的时钟刚敲过十二点半。这是第三个夜晚。”
    - addItem: code_1230 (name: 密码：12:30)

- drawer:
  rect: x=420,y=280,w=240,h=160
  onClick (no selected item):
    - showText: “锁住了。像一个体面人的微笑。”
  onUse:
    accepts: [code_1230]
    success:
      - showText: “咔哒。有什么东西在里面等了很久。”
      - addItem: hook (name: 挂钩)
      - setFlag: drawer_open=true
    fail:
      - showText: “不对。密码不是这个。”

- portrait:
  rect: x=650,y=70,w=260,h=420
  requireFlag: drawer_open
  onClick:
    - showText: “遮布滑落。它开始回看我。”
    - end: “MVP 完成：你看见了画像的另一面。”
