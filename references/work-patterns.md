# Work patterns

Read only the pattern that matches the requested task. These are adaptable decisions, not mandatory modules.

## Lists and work queues

Put search, essential filters, a result count, and list actions in one work area. Let the toolbar wrap at narrow widths. Keep stable identifiers, the main subject, state, ownership, and relevant dates visible before secondary metadata.

Prefer a concise textual state badge. Counts and amounts align across rows; long subjects wrap or truncate with an accessible way to read the full value. Do not truncate the only identifier or action label. Keep a visible detail action for keyboard and touch users.

If selecting rows enables a bulk action, show the selected count and clear the selection deliberately when changing the dataset. Announce result-count and completion feedback without moving keyboard focus. Empty filter results offer a reset action rather than suggesting the whole dataset is empty.

Sticky headers, key columns, and pagination should solve actual list size problems. Avoid implementing all of them for a five-row example. Choose virtualization only when record count and measured rendering cost justify it.

## Forms

Group fields by the decision a person is making. Keep labels and values close; separate meaningful groups more than fields in the same group. Reuse established input heights and validation components.

On a wide screen, pair short related fields; keep long descriptions full width. On a narrow screen, use a readable single column. Keep errors adjacent to fields and preserve entered data. A required field has a visible, consistently explained indicator; a placeholder does not replace a label.

Show submission progress on the submit control. If a failure can be retried, preserve the form and explain the recovery. Confirm irreversible consequences in terms of the affected object.

## Record details

Start with the record's identity, state, and one primary next action. Group related attributes into a compact definition list. Keep history distinct from current values and avoid turning every label/value pair into a separate card.

Use a drawer when a person needs to retain the list context and inspect a few details. Use a dedicated page for a long record or substantial editing. Keep focus within a modal dialog, offer an accessible close action, support Escape, and return focus to its opener.

## Dashboards

Use metrics when they support a decision or open an actionable dataset. Put operational exceptions before decorative charts. Do not allocate space for an empty chart merely to make the dashboard look complete.

If two panels share a row, align their starting edges without forcing a short panel to the full height of a long one. An independently scrolling work panel needs a clear boundary and a reason; avoid nested scroll containers as a default layout technique.
