A small client-side coordinate calculator for GitHub Pages.

## Features

- Dark mode
- Input format: `x54.63, y75.82`
- Calculates distance between Point A and Point B
- Distance is converted using `1 coordinate unit = 100 meters`
- Distance is displayed as whole meters
- Angle uses:
  - `0° = +Y`
  - `90° = +X`
  - `180° = -Y`
  - `270° = -X`
  - increasing clockwise
- No backend
- No database
- No data is stored or transmitted

## GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js`.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. GitHub will publish the site at your GitHub Pages URL.

The calculator runs entirely in the user's browser.
