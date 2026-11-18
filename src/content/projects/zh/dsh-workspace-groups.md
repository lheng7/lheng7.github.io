---
title: DSH 工作区视图归类插件
summary: 给 DSH 侧栏加一层"只在视图里存在"的分组，会话可以跨真实工作区归类，磁盘上什么都不动。
startDate: 2026-11
order: 9
featured: true
tags: [JavaScript, DSH 插件, 本地优先]
links:
  - label: 源码
    href: https://github.com/lheng7/dsh-workspace-views
---

## 要解决什么

DSH 按真实工作区给会话分组，而工作区就是一个目录。一旦想让两个不同目录里的会话并排放在一起，
或者想要一个"只作为查看方式存在"的分组，内置侧栏就没办法了——它只有一套结构，就是磁盘上那套。

这个插件加了第二层：**视图工作区**。它和真实工作区并列显示，会话可以在任意两个工作区之间拖动，
磁盘上什么都不移动。内置侧栏照旧显示原生归属——两套视图不一致，这是有意的设计选择，不是 bug。

## 怎么做的

插件是一个 bundle，通过 DSH 的 Plugin Manager 安装后出现在插件界面里，可以单独开关、可以卸载。
关掉它，Host 侧立即卸载，刷新页面侧栏就回到原生版本，没有不可逆的改动。

视图数据存在 `~/.dsh/workspace-groups/views.json`，原子写（临时文件 + `rename`），
工作区以 canonical path 为键、会话以 `sessionId` 为键——因为登记 id 会变，而 sessionId 不会。
把这个文件删掉，面板就退化回"和一个只读的内置侧栏差不多"。

`/workspace-groups/api` 提供状态、自检和写入操作。每个写端点都自查 loopback、本机 Origin
和一次性 nonce（从 `GET /state` 领取），任一条不过就返回 403 且不写盘。

## 它刻意不做的事

- 不改 DSH 自己的归属。移动会话只写 `views.json`。唯一的例外是置顶——那要走宿主的登记表接口，
  写 `workspace.json` 的置顶集合，和内置侧栏的置顶按钮是同一件事。
- 视图工作区没有目录，所以不能在里面开新会话；要开会话得回到真工作区。
- 真工作区只能隐藏、不能删除；视图工作区可以删。
- 侧栏渲染崩满两次会自动退回原生侧栏，只有那时候才会出现一个恢复入口。

## 测试

宿主与数据层有一份 18 项测试，用假的 `workspaceRegistry` / `sessionQuery` 驱动真实的 `views.json`
和 HTTP 端点；另有 7 项覆盖从 DSH 内置侧栏移植来的纯函数（MIT，见 `LICENSES/`）。
静态检查盯着生成出来的 client：TDZ、悬空常量，以及 `src/tree.js` 与 `lib/client.js` 里内嵌副本
是否一致——这一步最容易忘，所以用检查代替记忆。
