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

## Why it exists

The starting point was small: I wanted DSH's sidebar to behave like Codex's — sessions you can
drag into a different container, instead of leaving them pinned to the directory they started in.

Looking into it produced a structural answer rather than a missing button. In Codex,
`session_index.jsonl` indexes only `{id, thread_name, updated_at}` and carries no cwd, and a
session may switch directories between turns — so nothing derives its location from a path.
In DSH, attribution is derived: a session belongs to the workspace its cwd sits in, and
`attachSession` checks `realpath(cwd) === record.path`. Dragging a session therefore means
changing its attribution, and attribution is not an editable mapping — it is computed from events.

Doing that properly in the core would mean changing the event format and upgrading workspace
storage from v2 to v3, while keeping old clients able to ignore unknown events. That is far
beyond a plugin, and more than "let me drag sessions around" should cost.

So the cut moved elsewhere: a view-layer mapping that the plugin owns. Real workspaces remain
the foundation; view workspaces exist only in that mapping; dragging rewrites only the mapping.

## The cost of that choice

View attribution is only valid inside this plugin. DSH's built-in sidebar does not see it, and
turning the plugin off returns the native sidebar with your groupings still in `views.json`
and nothing displaying them. It is a layer outside a native limitation, not a fix for it.

## How it works

The plugin is a bundle: installing it through the Plugin Manager puts it in the plugin panel,
where it can be switched off and uninstalled. Turning it off unloads the Host side immediately
and a page refresh returns the native sidebar.

View data lives in `~/.dsh/workspace-groups/views.json`, written atomically (temp file plus
`rename`) and keyed by canonical path for workspaces and by `sessionId` for sessions, since
registry ids change and session ids never do. Deleting that file degrades the panel back to
roughly a read-only native sidebar.

A small HTTP surface at `/workspace-groups/api` exposes state, health, and the write
operations. Every write endpoint checks loopback, a local Origin, and a one-time nonce
obtained from `GET /state`; if any of those fails it returns 403 without touching disk.

## What it does

Create view workspaces and group sessions into them, by drag or by menu. Drag a classified
session onto another row in the same group to order it; drag a workspace row onto a sibling
to reorder at the top level. Sessions can be renamed in place — double-click the title, or
press F2 on a selected row. Pin and archive live in the row menu, each section shows five rows
before offering a "show more", and running sessions are always visible.

## Where it deliberately stops

- It does not change DSH's own attribution. Moving a session writes only `views.json`.
  The single exception is pinning, which goes through the host's registry API and writes
  the pin set in `workspace.json` — the same thing the built-in pin button does.
- View workspaces have no directory, so they cannot host new sessions. New sessions start
  in a real workspace.
- Real workspaces can be hidden but never deleted; view workspaces can be deleted.
- Archived sessions are hidden by default, matching the built-in sidebar, but the view options
  can show them or show only them.
- If sidebar rendering crashes twice, it falls back to the native sidebar on its own, and
  only then does a recovery entry point appear.

## Testing

The host and data layer are covered by an 18-case test that drives the real `views.json`
and HTTP endpoints through fake `workspaceRegistry` and `sessionQuery` objects; seven more
cover pure functions ported from DSH's built-in sidebar (MIT, recorded in `LICENSES/`).
Static checks guard the generated client against TDZ errors, dangling constants, and drift
between `src/tree.js` and the copy embedded in `lib/client.js` — a regeneration step that
is easy to forget, so it is checked rather than remembered.
