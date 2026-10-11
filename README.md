# Saiman Suwal — portfolio

Open `index.html` to view the site. There is no build step and no package installation. Upload the contents of the Portfolio folder to your web host's public directory, with index.html at its root. The optional original loading.html remains available; use index.html as the main entry point.

## What changed

- Photo-led landing page with scroll-driven portrait movement, a development/design switch, subtle pointer interaction and clearer calls to action.
- Floating translucent navigation that hides on downward scroll and returns on upward scroll, plus a mobile menu, current-section indication and reading progress.
- Original #121212 background and outerspace-7.gif retained. Pause motion switches the GIF to a still image; system reduced-motion settings are respected.
- Five linked website projects, alongside the original two mobile projects and four design projects.
- Filterable project grid and accessible native project dialogs, with company context and project descriptions.
- Expandable service sections and a contact form that redirects to a prefilled Gmail compose page.
- Optimized WebP copies of the original portrait and artwork. Original image assets are retained.
- Broken favicon references, missing restaurant image reference, duplicate scrolling code, placeholder social links and simulated form success removed.

## Contact behaviour

Contact details are preserved from the supplied portfolio:
Saimansuwal65@gmail.com / +977 9840452891.

The form redirects to Gmail in the same tab with the recipient, subject and message filled in. The visitor may need to sign in to Gmail, review the draft and press Send. It does not send email directly or claim delivery. The email address link also opens Gmail; the copy-email button remains available for people who use another mail service. No credentials or mail-provider backend are required by the portfolio.

## Editing

- Main page, contact details, static project cards: index.html
- Dialog descriptions and project links: js/projects.js
- Styling and responsive rules: css/style.css
- Interaction behaviour: js/script.js

If changing a project, update its card in index.html and its corresponding entry in js/projects.js. This duplication lets the project summaries remain readable without JavaScript. The five company project covers pair their official logo with project text on a neutral background; they are not website screenshots. Original app and illustration descriptions are based on the uploaded portfolio. The missing Khoj image has been replaced with a typographic cover.

## Company description sources

Reviewed 11 October 2026. These pages informed concise company summaries and visible project features. The owner supplied the projects as their work; no exclusive authorship, particular stack, performance gains or commercial results are claimed. The Lions site also credits another developer; this portfolio uses neutral project descriptions rather than a sole-developer claim.

- Koshi Tours & Travel: https://koshitours.com/
- Lions International District 325 S: https://lions325s.org/
- Surreal Engineering: https://surrealengineers.com/ (indexed website text)
- Bath N Room: https://bathnroom.com/ and indexed product/showroom pages (the homepage requires JavaScript)
- J.P.L. Construction: https://jplconstruct.com/

## Validation

JavaScript syntax and local asset/anchor references checked. Responsive CSS covers small phones, tablets and desktop layouts, including reduced motion and touch input. Browser execution is unavailable in this environment, so visual rendering and live browser interactions have not been verified. Before publishing, open the site on your phone and desktop, check the project dialogs and filters, and try the email draft with your configured email app.


## Experience and company-logo update

- The original handwritten wordmark is larger, trimmed of transparent outer margins and used on its own in the navigation and footer.
- Decorative section numbering and filter counts have been removed.
- Companies & Collaborations replaces the previous website-only client strip. Seven company logos loop continuously, pause on hover or keyboard focus, and reveal their original colours on interaction. A dedicated pause button and the global reduced-motion control are supported. Touch devices can pause the strip and follow its links; hover is not required to reach a company.
- Project cards retain their descriptions and feature actual logos on neutral covers. All project descriptions have been expanded, and website detail dialogs also include their logo.
- Experience and skill sections are based on the supplied CV. The CV PDF itself, birth date, private salary details and other personal resume fields are not included. Dates use the CV's date ranges rather than adding up overlapping roles. The ongoing Lions web role is shown as Present as stated in the supplied CV.
- Six roles: Lions web development/management; Lions senior graphic design; Kishan software development; freelance graphic design; Aloi digital art; Red Circle graphic design.
- Development and creative skills are grouped separately. A short education note summarises the IIMS / Taylor's University background without reproducing the resume.
- Local logo files are in assets/logos. Lions, Kishan and Red Circle logos originate from the supplied portfolio. Koshi and J.P.L. logo URLs were identified in their official site headers; Surreal uses its official logo1.png; Bath N Room uses its official images/png/logo.jpg. The logos remain company-owned and are used here to identify the owner's stated work and collaborations.

Latest checks: JavaScript syntax; HTML tag nesting; local asset and CSS URL resolution; internal navigation targets; removal of numbered headings; five company project covers; seven company logos; six experience roles; eleven project descriptions consistent with their dialog data; ZIP archive integrity.

## Photo-led landing page refinement

- Personal wordmark reduced slightly to 116 px on desktop and 106 px on mobile.
- The previous abstract hero composition is replaced with the existing portrait, a lavender and muted sage palette, clear headline and consistent text alignment.
- Desktop scrolling gently shifts and rotates the portrait inside a short sticky introduction. No wheel/touch scroll interception is used. Small screens, short viewports and reduced-motion settings use a normal document flow.
- Development / Design & art buttons update the introductory description and portrait label. The work link selects the relevant portfolio filter.
- Project cards have equal-height content areas with aligned action rows; paragraph widths, line heights and heading spacing are refined throughout.
- Gmail redirect logic checked using a simulated form submission, including Unicode, punctuation, line breaks and invalid-form prevention. No real email was sent. HTML structure, anchors and assets also checked. Browser visual testing remains unavailable.
