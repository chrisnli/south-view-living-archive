# South-View · A Living Archive

A buildless, responsive person-first demo of the supplied white paper. Open `dist/index.html` directly, or serve `dist` with a static HTTP server. No dependency installation is required.

The home page lists all 20 people from South-View's History in the Neighborhood page. Selecting a person opens a full-page scrolling narrative. A pinned visual crossfades continuously from their portrait into imagery for their milestones and relevant history. Chapter navigation, reading progress, deep links, search, contribution filters, per-story sources, and a next-person link support exploration. Reduced-motion users get discrete visual changes.

Documented experiences are distinguished from historical or thematic context. Personal milestones and broader histories are included where the original project's three events cannot honestly be connected to a person. Herndon and Bowen have direct 1906 links; the Juneteenth artifact is clearly distinguished from Georgia emancipation experiences; Young and Yancey have contextual Child Murders chapters. Victims' stories require further family-informed research.

Portraits and biographical source links are credited within each story and in About & sources. This is a student concept demonstration, not an official foundation publication. Historical images retain their original rights and attribution.

## Run locally

From the repository directory, with Python 3 installed:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/. Stop the server with Ctrl+C. The site can also be opened directly through `dist/index.html`.

## Project files

- `dist/index.html`: directory and story page structure.
- `dist/app.js`: routing, search, filters, chapter navigation, and scroll transitions.
- `dist/story-data.js`: the 20 biographies, chapters, source links, and image captions.
- `dist/styles.css`: desktop and mobile layouts, typography, and motion preferences.
- `dist/assets/`: portraits, archival images, and original symbolic SVG visuals.
- `research_archive.py`, `fetch_assets.py`, `fetch_event_assets.py`: supporting research and asset retrieval scripts, not required to run the website.

Enable the story header's Motion control to see continuous crossfades. Visitors who prefer reduced motion start with discrete image changes.
