# Codex Delivery Rules

## Before editing

1. Read [AI_CONTEXT.md](AI_CONTEXT.md) and every relevant document in `docs/`.
2. Inspect the current implementation, data, assets, and working-tree status.
3. Explain the implementation plan, affected files, and risks.
4. Ask only when a required fact, authority, or source is missing.

## While editing

- Use sources, not assumptions. Preserve user changes and backwards compatibility.
- Keep changes scoped and components reusable.
- Use `apply_patch` for file edits.
- Retain semantic HTML, keyboard navigation, contrast, lazy loading, and reduced-motion support.
- Use GeoJSON as the primary map format.

## After editing

1. Validate syntax, paths, data counts, and affected interactions in proportion to risk.
2. Update `AI_CONTEXT.md`, the relevant subject document(s), and `08-changelog.md`.
3. Report modified, created, and deleted files; reason; documentation updates; verification; and future recommendations.
4. Do not stage, commit, push, create pull requests, or delete material files unless specifically requested.

## Content safety

When a personal or research fact is unavailable, leave a clear placeholder or request it. Never manufacture dates, roles, organisations, outcomes, metrics, locations, captions, publication metadata, or project claims.
