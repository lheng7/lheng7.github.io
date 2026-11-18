---
title: PetLink — a desk pet for coding agents
summary: A desk pet that mirrors Claude Code's state on a 2.8″ screen and turns its permission prompts into physical YES/NO buttons.
startDate: 2026-08
endDate: 2026-09
order: 10
featured: true
tags: [ESP32, Embedded, Node.js, LVGL]
links:
  - label: Source
    href: https://github.com/AAAI-11/cli_agent_company
---

## What it is

An agent running in a terminal has states you cannot see unless you are looking at the
terminal: thinking, working, waiting for your decision, finished, failed. Permission
requests arrive as a dialog and stop everything until you answer.

PetLink puts those states on a desk instead. An ESP32-P4 board with a 2.8″ MIPI display
shows a six-state pet — thinking, working, waiting for you, done, error, connecting — and
the YES / NO buttons on the board answer Claude Code permission requests directly, so
walking away from the keyboard does not mean missing the moment to decide.

## How it works

A Node daemon on the PC normalizes Claude Code hook events into one state model, then
drives two front ends over a protocol we wrote for this: a physical board over USB serial,
and a browser-based virtual device that shares the same state machine.

The wire format is PetLink v1 — NDJSON frames with handshake, heartbeat, liveness checks
and anti-ping-pong rules, specified in `docs/protocol.md` and covered by the same tests
that run on the firmware side.

## Scope and trade-offs

Scope was frozen early at four features: state visualization, physical-key permission
arbitration, the custom NDJSON protocol, and the Node daemon. Voice input and output,
session statistics, multi-session bubbles, token usage and status sounds were added later
along the way. Componentized GUI, MQTT, and a custom PCB were cut — the reasoning is
recorded in the requirements document rather than lost.

## Status

Roughly five weeks of work, 69 commits, three people. The daemon carries a 39-case smoke
suite; the firmware has 82 host-side unit tests. The protocol specification and the
firmware tests are kept in sync by construction.
