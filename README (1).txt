IVSLEEPS WEBSITE REDESIGN

FILES
- index.html: redesigned page; retains the original copy, sections and existing asset references.
- styles.css: responsive editorial styling.
- script.js: bilingual switcher, mobile navigation, gallery/lightbox, flash selection and Formspree submission.
- MISSING_ASSETS.txt: image references needed from the original website.
- previews/: desktop and mobile homepage screenshots. These previews intentionally omit unavailable artwork assets.

ASSETS REQUIRED
The uploaded source was an HTML text file only. The original assets/ directory and image files were not included. Copy the complete original assets/ directory into this project before deployment. Existing asset references are retained; see MISSING_ASSETS.txt. Two clear path inconsistencies were aligned to already-declared paths (portfolio-16.JPG and flash-14.jpg); the print-5 lightbox reference was corrected to its existing thumbnail path. Two portfolio full-size references (portfolio-18.JPG and portfolio-19.JPG) do not match their thumbnail filenames and should be checked against the real assets directory before deployment.

COLOR PALETTE
The Pinterest reference image could not be fetched in this environment. The CSS currently uses a provisional muted plum / rose / soft-paper direction, NOT a claimed extraction from that image. Replace the CSS custom properties at the top of styles.css with sampled HEX values once the reference image is supplied as an upload.

DEPLOYMENT
Upload index.html, styles.css, script.js and the complete original assets/ folder to the same website root. The Formspree endpoint remains https://formspree.io/f/xkgeryrk and Google Analytics measurement ID remains G-1NEE71QLVD (one installation).

TESTING
Passed local smoke checks: English/Slovak switching, mobile menu open/close, flash design selection and removal, lightbox open/close, and a simulated successful Formspree response. The form smoke test intercepted the request locally; a real Formspree submission was NOT performed. Mobile viewport overflow check passed at 390px. Live Google Analytics collection and actual image loading cannot be verified without deployment and the original assets.
