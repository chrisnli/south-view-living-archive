# South-View: Stories That Shape Atlanta

Three navigable history chapters: the 1906 Atlanta Race Massacre, Atlanta Child Murders, and Civil Rights Movement. The archive contains 25 individual profiles.

## Run locally

From the repository root:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://localhost:4173/. No backend or dependency installation is required.

## Edit the archive

Edit `dist/content.json`, then run `node scripts/build-data.mjs`. The script checks event/profile relationships, group coverage, required profile content, portrait and visual-archive files, contextual image selections, and source URL protocols before regenerating `dist/data.js`. The page loads this generated file without requiring a build server.

## Visuals and interaction

`experience.js` maintains the shared SVG landscape, slow background parallax, scroll reveals, reading progress, and circular page/story/image transitions. `app.js` renders the interactive homepage portrait collage, event-specific archival imagery, an original remembrance illustration, named people constellations, and native story dialogs. Every point is a keyboard-operable button; Escape and the close control restore focus. Story panels include previous/next controls and a link to the complete sourced biography. A list view is also available.

Each event has a three-image visual archive with captions, dates, credits, and source links. Select an image to open an uncropped viewer; use its previous/next buttons or Left/Right arrow keys to browse. Complete biographies include a contextual image from their chapter. The 1906 page adds Library of Congress photographs of early Peachtree Street and First Congregational Church members. These show the surrounding city and community, not the attacks themselves.

Motion runs automatically throughout the site without an on-page toggle or saved on/off setting. View Transitions have a simpler fallback for browsers without that API. No animation library or additional build step is required.

## Research and attribution

The new chapters include seven victim remembrances, two contextual education profiles, and ten civil-rights and educational/professional equality profiles. Each new profile has its own sources and cemetery-connection explanation. The child victim burial list is explicitly attributed to secondary cemetery references; individual registers have not been inspected. Personal details are kept limited to sourced material. No guilt finding is claimed beyond the two adult-murder convictions.

Jean Childs Young and Carolyn Dunbar Yancey are broader education context, not identified as victims or crisis responders. Benjamin Mays is a former South-View burial; his remains were reinterred at Morehouse. Existing archive portraits retain foundation-supplied credits; initials are used without a verified portrait. No generated victim portraits are used.

Each event presents its people in one combined constellation. The 1906 chapter includes five victims alongside Alonzo Herndon, who survived and whose business was targeted; individual profiles explain these distinct connections. Expanded profiles cite the National Center for Civil and Human Rights, its WABE/PBS documentary, and biographical references. The profiles distinguish museum-reported records, documentary testimony, and unresolved details; this project has not independently inspected cemetery registers or original death records. This is a student concept, not an official cemetery website. Original image rights remain with their holders.
