---
name: compact-admin-ui examples
description: Compact, restrained business interfaces with readable records and visible actions.
colors:
  canvas: "#f5f6f8"
  surface: "#fff"
  ink: "#202630"
  secondary: "#5b6573"
  line: "#e0e4ea"
  accent: "#2458d3"
  accent-soft: "#edf2ff"
  accent-hover: "#1c47b2"
  control-border: "#d3d9e2"
  control-ink: "#364152"
  nav-active-ink: "#204cba"
  nav-active-surface: "#eaf0ff"
  nav-hover-surface: "#eff1f5"
  table-head-surface: "#f8f9fb"
  row-divider: "#edf0f4"
  status-open-ink: "#3459a4"
  status-progress-ink: "#885407"
  status-progress-surface: "#fff3d8"
  status-complete-ink: "#216447"
  status-complete-surface: "#eaf5ef"
  status-high-ink: "#a1372e"
  status-high-surface: "#fff0ee"
  status-normal-ink: "#55606f"
  status-normal-surface: "#f0f2f5"
typography:
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "14px"
  title:
    fontSize: "21px"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "-0.5px"
  section:
    fontSize: "14px"
    fontWeight: 650
    lineHeight: 1.5
  label:
    fontSize: "12px"
    fontWeight: 550
    lineHeight: 1.4
  table:
    fontSize: "12px"
  caption:
    fontSize: "11px"
  detail:
    fontSize: "13px"
    lineHeight: 1.7
  metric:
    fontSize: "25px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.5px"
rounded:
  panel: "12px"
  control: "7px"
  badge: "5px"
  density: "8px"
spacing:
  module-gap: "12px"
  panel-pad: "16px"
  page-pad: "20px"
  group-gap: "8px"
  spacious-module-gap: "24px"
  spacious-panel-pad: "24px"
  spacious-page-pad: "32px"
  spacious-group-gap: "12px"
  narrow-page-pad: "12px"
components:
  button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.control-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-subtle:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  search:
    textColor: "{colors.secondary}"
    rounded: "{rounded.control}"
    padding: "0 10px"
  navigation:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.control}"
    padding: "0 12px"
  navigation-active:
    backgroundColor: "{colors.nav-active-surface}"
    textColor: "{colors.nav-active-ink}"
  badge-open:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.status-open-ink}"
    rounded: "{rounded.badge}"
    padding: "3px 7px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
  summary:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  density-control:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.density}"
    padding: "3px"
  table-row-compact:
    height: "44px"
    padding: "8px 12px"
  table-row-spacious:
    height: "60px"
    padding: "8px 12px"
---

# Design System: compact-admin-ui examples

## Overview

**Creative North Star: "Compact, restrained business interfaces"**

The chosen style supports everyday record work: scan a queue, narrow the records, inspect a detail, and complete an action. Clear grouping and useful density carry the interface. System typography, cool neutral surfaces, a selective blue accent, and restrained corners preserve the same identity across support, orders, and record details.

The density comparison changes spacing rather than content or capabilities. Both modes retain readable text, textual statuses, visible row actions, and the same fictional fixtures. This document records the implemented example system in `styles.css`; the token frontmatter is the reference for its reusable values.

**Key Characteristics:**

- Compact spacing follows task relationships.
- Flat, bordered work surfaces keep records prominent.
- Text labels accompany semantic status colors.
- Responsive controls preserve visible actions and table access.

## Colors

The palette combines a clear blue action color with cool neutral work surfaces. Semantic badge colors identify state while keeping the state name readable.

### Primary

The accent marks primary actions, keyboard focus, checkboxes, and subtle actions. Its soft surface supports hover feedback and open or queued statuses. Primary-button hover uses the deeper accent; active navigation has its own observed blue text and pale background.

### Neutral

Canvas separates the white panels from the page. Ink carries primary information; secondary text carries labels, dates, counts, and supporting descriptions. The line color separates panels and larger sections; control borders and row dividers provide finer boundaries. Table headers use a pale neutral surface.

### Semantic states

Open and queued records share blue badges. In-progress and processing records share amber; resolved, shipped, and complete records share green. High priority and form errors share the red pair; normal priority uses the neutral pair.

**The Textual State Rule.** Every colored badge includes the status or priority name; color supplements the label.

## Typography

One system sans stack serves the whole interface, including Chinese system fallbacks. The base remains readable while hierarchy comes from size, weight, alignment, and secondary text rather than display typography.

Page titles use the title token; section headings use the section token. Buttons use the label token. Table content uses the table token, with smaller captions for headers, identifiers, and dates. Record descriptions use the detail token and a constrained measure (68ch). Summary values use the metric token and reduce on narrow layouts (22px).

**The Aligned Numbers Rule.** Amounts align right; amounts, dates, identifiers, counts, and summary values use tabular numerals where implemented. Keep the same typography when switching density.

## Layout

The work area is a sidebar and a fluid main column. The default sidebar is narrow (204px); the main column uses the page-pad token. A top demonstration bar holds the example identity and density switch. Page headers and toolbars wrap as their contents require.

| Spacing behavior | Compact | Spacious |
| --- | --- | --- |
| Main-page inset | `page-pad` | `spacious-page-pad` |
| Module separation | `module-gap` | `spacious-module-gap` |
| Panel inset | `panel-pad` | `spacious-panel-pad` |
| Toolbar control gap | `group-gap` | `spacious-group-gap` |
| Table row height | `table-row-compact` | `table-row-spacious` |

These row heights are CSS sizing targets; content and larger touch controls may increase the rendered height. Table cell padding stays the same between density modes. Detail sections keep their distinct separation (24px margin followed by 16px inset after a divider).

At the medium breakpoint (1000px and below), the sidebar narrows (174px), bulk actions can wrap with the toolbar, and the record-detail columns stack. At the narrow breakpoint (680px and below), the sidebar becomes a horizontal example selector, supporting workspace copy is hidden, both density modes use narrow-page-pad, and search occupies its own toolbar row. The summary remains three columns with reduced insets; it does not stack into three large cards.

Narrow layouts enlarge the main actions, navigation, list controls, row-action and checkbox targets, and dialog controls to touch-oriented sizing (44px). The density switch retains its separate sizing (36px minimum height). Wide tables remain in their own horizontally scrollable, keyboard-focusable region. On large screens (1600px and above), the main work area is centered with a maximum width (1500px).

**The Density Comparison Rule.** Switching density changes spacing and row sizing while retaining the current content, filters, selection, and available actions.

## Elevation & Depth

Static panels and summaries are flat, separated by borders and surface contrast. The selected density segment has a small shadow (`0 1px 3px #20263014`). The right-edge record dialog has a lateral shadow (`-8px 0 32px #20263018`) and a dimmed backdrop. The completion toast floats above the work area with its own shadow (`0 6px 20px #20263026`). These are the implemented elevation roles; the examples contain no custom menu component.

**The Flat Work Surface Rule.** Keep static work panels free of drop shadows and hover movement; elevation distinguishes the selected segment and floating feedback or dialogs.

## Shapes

Panels and summary containers share the panel radius; controls and navigation share the control radius. Status badges use the smaller badge radius. The segmented density control uses the density radius, with smaller inner segments. Avatars and activity markers are circular. The record dialog is a square-edged drawer that reaches the top, right, and bottom of the viewport.

Borders are thin (1px). Small-radius controls and slightly rounder containers provide hierarchy without nested decorative shells.

## Components

### Buttons and inputs

Primary buttons are filled blue; default buttons have a white surface and visible border; subtle row actions are blue text with a transparent resting surface. Standard buttons and list controls have a compact minimum height (34px); row detail actions are smaller on desktop (28px). Form inputs in the drawer are slightly taller (38px).

Button color and border feedback uses a short transition (120ms). Visible keyboard focus uses an accent outline (2px) outside the target (3px offset). The search field instead changes its wrapper border on focus. Disabled buttons reduce opacity and show the default cursor. Reduced-motion preferences remove transitions and animations.

### Navigation and density

Example navigation uses visible text, optional counts, and a pale-blue pressed state. The density control uses two labeled buttons with a raised white selected segment. Both controls expose their current state with `aria-pressed`.

### Tables and badges

Headers, record identifiers, and dates use secondary text. Subjects carry a modest weight; organizations sit below order items. Row actions stay visible. Hover and selection use pale background changes, and support selection exposes a bulk assignment action. Badges are compact text labels with semantic color pairs.

### Panels and summaries

Panel headings, filters, records, and the footer share one bordered surface. Summary items use the same panel form with one label, value, and short hint. Detail views separate current metadata and completion criteria from activity, using a two-column metadata grid inside the content panel.

### Dialogs and feedback

The browser-native dialog is styled as a right-edge drawer (up to 460px wide, leaving 24px of viewport clearance on narrow screens). It scrolls vertically, supports Escape, and restores focus after closing. New requests have visible labels, native validation, a pending save state, and a simulated failure that preserves the entered subject.

List loading uses static skeleton rows; empty and error states use a short explanation and a recovery button. Search, status filters, and state previews update the result count. Successful actions announce through the live-region toast. Demo changes stay in memory, and reloading restores the fictional fixtures.

## Do's and Don'ts

### Do

- Do keep related filters and actions within the same work surface.
- Do preserve readable text, visible actions, and current data when comparing density.
- Do retain textual statuses, keyboard focus, local table scrolling, and recovery states.
- Do use fictional records and self-contained assets for these examples.

### Don't

- Don't add drop shadows or hover movement to static panels.
- Don't reduce type size to simulate compactness.
- Don't hide row actions behind hover-only controls.
- Don't add a page entrance sequence, external fonts, analytics, or production data to these examples.
