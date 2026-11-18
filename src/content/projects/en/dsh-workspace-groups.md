---
title: Workspace groups for DSH
summary: A sidebar plugin that adds a second, view-only layer of session groups on top of DSH's real workspaces — so sessions can be organised without moving anything on disk.
startDate: 2026-11
order: 9
featured: true
tags: [JavaScript, DSH, Local-first]
links:
  - label: Source
    href: https://github.com/lheng7/dsh-workspace-views
---

## The problem

DSH groups sessions by real workspace, and a workspace is a directory. That works until you
want two sessions from different directories to sit together, or want a group that exists
only as a way of looking at things. The built-in sidebar has exactly one structure, and it
is the one on disk.

This plugin adds a second layer: **view workspaces**. They sit alongside the real ones,
sessions can be dragged between any two, and nothing on disk moves. The built-in sidebar
keeps showing the original grouping — the two views disagree on purpose.

## How it works

The plugin is a bundle: installing it through the Plugin Manager puts it in the plugin
panel, where it can be switched off and uninstalled. Turning it off unloads the Host side
immediately and a page refresh returns the native sidebar.

View data lives in `~/.dsh/workspace-groups/views.json`, written atomically (temp file plus
`rename`) and keyed by canonical path for workspaces and by `sessionId` for sessions, since
registry ids change and session ids never do. Deleting that file degrades the panel back to
roughly a read-only native sidebar.

A small HTTP surface at `/workspace-groups/api` exposes state, health, and the write
operations. Every write endpoint checks loopback, a local Origin, and a one-time nonce
obtained from `GET /state`; if any of those fails it returns 403 without touching disk.

## Where it deliberately stops

- It does not change DSH's own attribution. Moving a session writes only `views.json`.
  The single exception is pinning, which goes through the host's registry API and writes
  the pin set in `workspace.json` — the same thing the built-in pin button does.
- View workspaces have no directory, so they cannot host new sessions. New sessions start
  in a real workspace.
- Real workspaces can be hidden but never deleted; view workspaces can be deleted.
- If sidebar rendering crashes twice, it falls back to the native sidebar on its own, and
  only then does a recovery entry point appear.

## Testing

The host and data layer are covered by an 18-case test that drives the real `views.json`
and HTTP endpoints through fake `workspaceRegistry` and `sessionQuery` objects; seven more
cover pure functions ported from DSH's built-in sidebar (MIT, recorded in `LICENSES/`).
Static checks guard the generated client against TDZ errors, dangling constants, and drift
between `src/tree.js` and the copy embedded in `lib/client.js` — a regeneration step that
is easy to forget, so it is checked rather than remembered.
