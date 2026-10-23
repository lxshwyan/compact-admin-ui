# Interactive examples

Open [index.html](index.html) in a browser. The demo runs from local files or a static HTTP server without dependencies or external requests.

## Included surfaces

| Example | What it demonstrates |
| --- | --- |
| Support desk | Compact reminders, integrated filters, selectable rows, bulk assignment, and contextual detail editing |
| Order list | Aligned amounts, short status labels, query/filter recovery, and contextual order inspection |
| Record detail | A compact metadata grid, focused primary action, and history separated from current values |

## Compare fairly

The spacious/compact control keeps the content, dataset, features, and viewport the same. It changes spacing, padding, and row density. It demonstrates tradeoffs rather than proving that one density is right for every task.

## Explore states

- Search and status filters update visible records and the result count.
- Row checkboxes enable a local bulk-assignment action.
- Details open a browser-native dialog styled as a drawer. Escape closes it; focus returns to the opener.
- New requests use visible labels and native validation. The form has a clearly labeled failure simulation to exercise recovery without discarding entered text.
- The state selector previews loading, empty, or error content for lists. Refreshing an existing list preserves its current records.
- Local actions show a live-region completion message. Reloading restores all fixture data.

Every name, organization, identifier, date, amount, and record in these examples is fictional. There are no customer records, production connections, external analytics, accounts, or persistent storage.

The example's [product brief](PRODUCT.md) and [design contract](DESIGN.md) document its intended behavior and visual decisions. These are reference implementations, not cross-agent benchmark results.
