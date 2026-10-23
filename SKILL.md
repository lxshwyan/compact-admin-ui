---
name: compact-admin-ui
description: Design and refine compact, restrained business interfaces when the user explicitly requests compact-admin-ui or its compact admin style. Covers spacing, tables, filters, forms, record details, and operational states. Do not apply this visual style to every dashboard or override an existing design system without a request.
license: MIT
metadata:
  version: "0.1.0"
---

# Compact Admin UI

Make frequent business operations easy to scan and act on. Group related information tightly, give separate tasks breathing room, and keep the main work visible early.

## Scope

- Use this style when explicitly requested, including `$compact-admin-ui`. A generic request for a dashboard, management system, or concise copy does not select it.
- Stay within the requested surface. Preserve behavior, factual content, permissions, brand commitments, and the project's existing component system.
- Work independently of other skills. If a broader design workflow is already active, treat this document as its style brief rather than adding a competing process.
- For an existing product, inspect its tokens, representative components, and rendered layout first. Use the defaults below only where the project has no settled rule or the user requested a change.

## 1. Fix the spacing relationships

Choose a short scale such as 4 / 8 / 12 / 16 / 24 px and express it with existing tokens or rem equivalents.

| Relationship | Starting point for compact desktop UI |
| --- | --- |
| Label to field or supporting text | 4–6 px |
| Controls in a group | 6–8 px |
| Section heading to content | 8–12 px |
| Neighboring work modules | 12–16 px; start at 12 |
| Panel padding | 12–16 px |
| Page inset | 16 px; 20–24 when a wide layout benefits |
| Independent major regions | 20–24 px when their separation needs emphasis |

Assign each gap to one owner: the parent's gap or the child's margin. When whitespace feels excessive, inspect the total computed distance, including margins, padding, line-height, and minimum heights. Reducing a grid gap cannot fix an oversized card.

Keep short panels content-sized. Do not stretch a small summary to match a tall neighbor. Group related fields with rows or dividers before introducing another padded card. Density varies by task: a repeated work list can be tighter than a long form.

For new Tailwind code without established spacing tokens, `gap-3`, `space-y-3`, and `p-3` / `p-4` are useful starting points. Do not stack `gap-6`, `mb-6`, and `p-6` at every level. Other stacks should express the same relationships using their own styling system.

## 2. Put the work first

Use only the sections that support the current task:

```text
Title + short context                     Primary action
Optional summary or actionable reminders
Main work area, with its filters and tabs
```

- Keep the title row compact and allow context or actions to wrap on narrow screens.
- Place filters and list actions with the list. Give one action primary emphasis.
- Show the start of the main work area in the first viewport.
- Add summary metrics only when they help a decision; they are not a mandatory page row.
- Preserve useful nested navigation. Avoid promotional banners and repeated explanatory subtitles inside operational pages.

## 3. Keep the visual vocabulary precise

- Inherit brand and semantic tokens. If none exist, begin with a light neutral canvas, white work surfaces, dark readable text, and one restrained action color.
- Static panels start with a subtle 1 px border and no drop shadow. Reserve elevation for menus, popovers, drawers, and genuinely raised surfaces.
- Start panel radii around 10–12 px and control radii around 6–8 px. Align nested corners with their padding; do not round every element identically.
- Use one readable UI font family with appropriate language fallbacks. Useful starting sizes are 20–22 px for page titles, 14–16 px for section headings, 14 px for ordinary data, and 12–13 px for metadata.
- Build hierarchy with alignment, weight, and grouping. Do not keep shrinking text or fading essential labels to fit more content.
- Check text contrast on every actual surface, including badges and placeholders. Pair status color with a text label or meaningful icon.
- Align comparable amounts and numbers consistently and use tabular numerals where they stabilize data. Use one icon family with consistent optical weight.

## 4. Match the interaction to its scope

- Use tables for repeated business records. On desktop, 36–44 px rows and 32–36 px controls are useful compact starting points; enlarge for multiline content and touch use.
- Keep important row actions visible. Put occasional actions in a labeled overflow menu rather than hiding all operations until hover.
- Use inline editing for a small local change, a drawer for contextual inspection, and a full page for substantial maintenance. Use a dialog when interruption or protected focus is justified.
- Keep form labels visible and validation beside the field. Retain short guidance when it prevents an actual mistake.
- Support growing lists with pagination, appropriate filtering, and stable column alignment. Reflow the surrounding page on small screens; a truly wide table may scroll inside its own labeled region.
- Keep touch targets usable, around 44 px where touch is expected, without overlapping neighboring targets. Do not compress the mobile UI merely to preserve a desktop grid.

See [work patterns](references/work-patterns.md) when designing a list, form, or record-detail flow.

## 5. Finish the states and the copy

- Define default, hover, keyboard focus, selected, disabled, loading, and error states where applicable. Make keyboard focus visible.
- Interactive rows may change background or border subtly. Static panels do not lift, glow, or show a pointer cursor.
- Reuse motion tokens. Brief color or opacity feedback is usually enough for frequent actions; avoid whole-page entrance sequences and `transition: all`. Respect reduced motion.
- Show progress at the affected action and prevent duplicate submission. Preserve useful existing records during refresh. Use a layout-matching skeleton for initial loading only when it improves continuity.
- An empty state names the missing object or filter result and offers the relevant next step. An error names the problem and a recovery action.
- Name business actions directly: `Save`, `Assign`, `Confirm`, `View details`; or `保存`, `分配`, `确认`, `查看详情`. Remove repeated teaching copy such as “Click here to…” while preserving necessary field, import, and upload guidance.

## Verify the result

Inspect the rendered desktop and narrow layouts with realistic content. Check effective gaps, wrapping, focus, table overflow, and the primary action. Walk the relevant loading, empty, error, and selected states. Run the project's appropriate build or type check for code changes.

Use [acceptance checks](references/acceptance.md) for a concrete review. The [fictional examples](examples/README.md) show this style and its limits; they are illustrative implementations, not evidence that every agent or product will improve by the same amount.
