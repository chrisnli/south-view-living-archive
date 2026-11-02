# South-View · Stories That Shape Atlanta

A buildless student archive connecting South-View Cemetery to three chapters of Atlanta history: the 1906 Atlanta Race Massacre, Atlanta Child Murders, and Civil Rights Movement.

## Run locally

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://localhost:4173/. There is no backend service or dependency installation.

## GitHub Pages

Live site: https://chrisnli.github.io/south-view-living-archive/

Every push to `lauren` automatically runs the **Publish South-View website** workflow. It validates `dist/content.json`, regenerates `dist/data.js`, checks the browser JavaScript, and deploys only `dist/` to GitHub Pages. If validation fails, the current public website stays online.

After checking changes locally and committing them, run `git push github lauren`. No separate subtree push or update to `gh-pages` is needed. The original checkout calls the remote `github`; another clone may use `origin` or `website` instead.

Check [Actions](https://github.com/chrisnli/south-view-living-archive/actions) for a successful **Publish South-View website** run, then refresh the live site. The repository's Pages source must be **GitHub Actions**, and the `github-pages` environment must allow deployments from `lauren`. The old `gh-pages` branch is retained as history and is no longer the publishing source.

## Maintain the content

The 25 profiles, three event chapters, and nine captioned visual-archive entries are authored in `dist/content.json`. After editing, run `node scripts/build-data.mjs` to validate the archive and regenerate the browser data file. Page rendering, interactive portraits and people constellations, story dialogs, and the image viewer are in `dist/app.js`; the shared landscape and motion controller are in `dist/experience.js`. Styling and artwork are in `dist/styles.css` and `dist/assets/`.

See `dist/README.md` for research scope, source attribution, and burial-evidence limitations. This is a student concept, not an official cemetery publication.
