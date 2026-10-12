# South-View · A Living Archive

A buildless, responsive person-first demo of the supplied white paper. Open `dist/index.html` directly, or serve `dist` with a static HTTP server. No dependency installation is required.

The home page lists all 20 people from South-View's History in the Neighborhood page. Selecting a person opens a full-page scrolling narrative. A pinned visual crossfades continuously from their portrait into imagery for their milestones and relevant history. Chapter navigation, reading progress, deep links, search, contribution filters, per-story sources, and a next-person link support exploration. Reduced-motion users get discrete visual changes.

Documented experiences are distinguished from historical or thematic context. Personal milestones and broader histories are included where the original project's three events cannot honestly be connected to a person. Herndon and Bowen have direct 1906 links; the Juneteenth artifact is clearly distinguished from Georgia emancipation experiences; Young and Yancey have contextual Child Murders chapters. Victims' stories require further family-informed research.

Portraits and biographical source links are credited within each story and in Sources & editorial notes. This is a private student concept demonstration, not an official foundation publication.

Preview: `python -m http.server 4173 --bind 127.0.0.1 --directory dist`
