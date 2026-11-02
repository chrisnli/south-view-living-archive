# South-View · Stories That Shape Atlanta

A buildless student archive connecting South-View Cemetery to three chapters of Atlanta history: the 1906 Atlanta Race Massacre, Atlanta Child Murders, and Civil Rights Movement.

## Run locally

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://localhost:4173/. There is no backend service or dependency installation.

## GitHub Pages

Live site: https://chrisnli.github.io/south-view-living-archive/

GitHub Pages serves the root of the `gh-pages` branch, published from `dist/` on `lauren`. After committing future site changes, run `git push github lauren`, then `git subtree push --prefix dist github gh-pages` to update the live site.

## Maintain the content

The 25 profiles, three event chapters, and nine captioned visual-archive entries are authored in `dist/content.json`. After editing, run `node scripts/build-data.mjs` to validate the archive and regenerate the browser data file. Page rendering, interactive portraits and people constellations, story dialogs, and the image viewer are in `dist/app.js`; the shared landscape and motion controller are in `dist/experience.js`. Styling and artwork are in `dist/styles.css` and `dist/assets/`.

See `dist/README.md` for research scope, source attribution, and burial-evidence limitations. This is a student concept, not an official cemetery publication.
