---
title: PetLink —— CLI Agent 桌面伴侣
summary: 把 Claude Code 的状态变成桌上宠物的表情，把它的权限弹窗变成手边的实体 YES / NO 按键。
startDate: 2026-08
endDate: 2026-09
order: 10
featured: true
tags: [ESP32, 嵌入式, Node.js, LVGL]
links:
  - label: 源码
    href: https://github.com/AAAI-11/cli_agent_company
---

## 这是什么

终端里跑的 agent 有一堆状态是你看不见的——只要你不盯着终端，就不知道它是在思考、在干活、
在等你拍板，还是已经挂了。权限请求更麻烦：它弹个框，然后整个世界停下来，直到你回去点一下。

PetLink 把这些状态搬到桌面上。一块 ESP32-P4 开发板加 2.8″ MIPI 屏，跑一只六态宠物
（思考中 / 干活 / 等你拍板 / 完成 / 出错 / 连接中）；板上的 YES / NO 实体键直接裁决
Claude Code 的权限请求——离开键盘也不会错过拍板的时机。

## 怎么做的

PC 侧一个 Node daemon 把 Claude Code 的 hooks 事件归一化成同一套状态模型，再用自研协议
驱动两端：USB 串口上的实体板，和浏览器里的虚拟设备。一实一虚同协议、同状态机。

协议叫 PetLink v1，NDJSON 帧格式，带握手、心跳、判活和防乒乓规则。规范写在
`docs/protocol.md`，和固件单测同源，改协议时两边不会悄悄走偏。

## 范围与取舍

范围很早就冻结在四件事上：状态可视化、实体键授权仲裁、自研 NDJSON 协议、Node daemon。
语音输入输出、会话统计、多会话气泡、token 消耗显示和状态提示音是后来陆续补进去的；
组件化 GUI、MQTT、自绘 PCB 则被砍掉——为什么砍的记录留在需求文档里，没有随旧稿一起丢掉。

## 现状

前后大约五周，69 个提交，三个人。daemon 有 39 项 smoke 测试，固件有 82 项宿主单测。
