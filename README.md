# HlthStew

A private, browser-based nutrition dashboard for logging food, tracking daily macros, writing notes, and reviewing a 30-day history.

## Run locally

This is a dependency-free static site. Open `index.html` in a modern browser, or serve the folder with any static-file server.

## How it works

- Enter known foods with a quantity, such as `200g chicken` or `2 eggs`.
- Set calorie and macro targets from the avatar in the header.
- Food, notes, and settings remain in your browser's local storage; no account or server is used.
- Export the current day as a Markdown file.

## Limitations

The built-in food list is intentionally small. Entries are estimates for personal tracking only and are not medical or dietary advice. Unknown foods are not logged automatically.

## Development priorities

1. Manual nutrition entry and food search/autocomplete.
2. Date navigation and editable past records.
3. Automated tests for the food parser and daily rollover.
4. A source-backed, versioned nutrition dataset.

## License

Released under the [MIT License](LICENSE).

