# bootstraplak_sass — Development Notes

> Last updated: 2026-08-19
> Context: Handoff notes for AI chat continuity. Use this to re-establish context if the session resets.

---

## Purpose

`bootstraplak_sass` is the custom Drupal 10 subtheme for kasada.lk (matrimonial marketplace), based on the
Bootstrap 4 "Bootstrap SASS Starter Kit". It provides templates and SCSS for the site's ads, dashboard,
private profiles, checkout/commerce pages, login/register flows, and webforms. Works closely with
`kasada_core` and `kasada_auth2` custom modules.

---

## Theme structure

```
bootstraplak_sass/
├── bootstrap_sass.info.yml
├── bootstrap_sass.libraries.yml   ← global-styling, swiper, swiper-init, pwd-toggle libraries
├── bootstrap_sass.services.yml
├── bootstrap_sass.theme           ← preprocess hooks (see below)
├── scss/
│   ├── style.scss / import.scss / variables.scss / mixins.scss / typography.scss
│   └── partials: _ad-list.scss, _contact-form.scss, _dashboard.scss,
│                 _login-form.scss, _payment.scss, _webforms.scss
├── js/
│   ├── custom.js        ← Drupal.behaviors: dropdown hover, login modal trigger,
│   │                       kasada modal overlay close, social login spinner, profession select filter
│   ├── pwd-toggle.js     ← show/hide password toggle (separate library)
│   └── swiper-init.js    ← swiper slider init (homepage ad slider)
└── templates/
    ├── block/     — block--block-homepage-create-ad-cta-block.html.twig
    ├── commerce/  — commerce-checkout-order-summary.html.twig, commerce-order--email.html.twig
    ├── field/     — field--node--kasada-private-profile.html.twig, field--node--matrimony-ad-content.html.twig
    ├── form/      — radios.html.twig
    ├── node/      — node--kasada-private-profile.html.twig, node--matrimony-ad-content.html.twig
    ├── views/     — views-view--ad-list.html.twig, views-view-unformatted--homepage-slider-ads.html.twig
    ├── includes/  — lak-user-menu.html.twig
    ├── login-with.html.twig, page--user--login.html.twig, page--user--register.html.twig,
    │   page--user--reset.html.twig, page--user--password.html.twig, page--set-password.html.twig
    ├── page--front.html.twig, html--front.html.twig, page.html.twig
    └── _file-link.html.twig
```

---

## bootstrap_sass.theme — preprocess hooks

- `bootstrap_sass_form_system_theme_settings_alter()` — replaces core Bootstrap navbar background
  option lists (Primary/Secondary/Light/Dark/White/Transparent) in theme settings form.
- `bootstrap_sass_preprocess_block()` — sets `lang_prefix` (`/si` or `/ta`, empty for English) for
  language-aware links inside block templates.
- `bootstrap_sass_preprocess_page()` — for authenticated users, exposes `current_user_name` and
  `current_user_avatar` (from `user_picture` field, via `file_url_generator`) to page templates
  (used in the account menu / header). Adds `user` cache context.

---

## JS behaviors (js/custom.js)

- **Desktop dropdown hover** — `.dropstart` menus open on hover (not click) at ≥992px width.
- **Login modal trigger** — `.js-open-login-popup` opens `#loginModal` Bootstrap modal.
- **Kasada modal overlay close** (`kasadaModalClose`) — clicking the jQuery UI dialog overlay closes
  the visible `.ui-dialog` (used for the Send Interest modal from `kasada_core`). Global flag
  `window.kasadaOverlayHandlerAttached` prevents duplicate binding across behavior re-attach.
- **Social login spinner** (`socialLoginFeedback`) — on `.socil-login-link` click, shows a spinner +
  "Connecting to Google…" text, disables the link; resets on `pageshow` bfcache restore.
- **Profession select filter** (`professionSelect`) — in the ad-submission webform, disables category
  header `<option>`s in `#edit-profession` (keeps only options prefixed with `\u3000 •` selectable).

Related library: `pwd-toggle` (separate JS file `pwd-toggle.js`) — password show/hide toggle, attached
to login/register/set-password pages. `swiper` + `swiper-init` — homepage ad slider.

---

## Key templates and their purpose

- **page--set-password.html.twig** — custom page template for the one-time-login "set password" flow
  (see `kasada_auth2` Feature 3). Wraps content in `auth-box2` styling to match login/register pages.
  Attaches `pwd-toggle` library.
- **login-with.html.twig** — Social Auth login buttons (`social_auth` module override). Preserves
  `destination` query param on each provider's redirect URL so post-social-login redirect flow works
  together with `kasada_auth2`'s destination handling. Triggers the `socialLoginFeedback` JS spinner
  via `.socil-login-link` class (note: class name has a typo, "socil" not "social" — kept as-is since
  JS/CSS both reference it).
- **node--matrimony-ad-content.html.twig / field--node--matrimony-ad-content.html.twig** — ad listing/detail
  rendering; works with `_ad-list.scss` and the `kasada_core` interest button block.
- **node--kasada-private-profile.html.twig / field--node--kasada-private-profile.html.twig** — private
  profile display; status badge classes read from `kasada_core`'s `moderation_state` preprocessing
  (see `kasada_core` DEVNOTES "Profile status display"). Status classes map: `under_review`, `verified`,
  `rejected` (NOT `pending_verification` / `suspended` — those were removed 2026-07-11 per kasada_core notes).
- **commerce-checkout-order-summary.html.twig / commerce-order--email.html.twig** — Commerce checkout
  and order confirmation email templates (custom branding for kasada.lk checkout/payment flow).
- **views-view-unformatted--homepage-slider-ads.html.twig** — homepage ad slider markup, paired with
  Swiper library.
- **radios.html.twig** — custom radio button widget markup (used in package/plan selection and webforms).

---

## SCSS partials

- `_ad-list.scss` — ad listing/grid styling.
- `_dashboard.scss` — user dashboard (kasada_core `DashboardController`) styling.
- `_login-form.scss` — login/register/set-password auth box styling (`auth-box2`).
- `_payment.scss` — checkout/payment page styling.
- `_webforms.scss` — ad submission / contact webform styling (previously inline, moved to SCSS — see git log "webform styles put to css").
- `_contact-form.scss` — contact form styling.

Compiled via `gulpfile.js` (`gulp` task compiles `scss/*.scss` → `.css` + sourcemaps). Run the gulp
build after editing any `.scss` file — the `.css` files are committed, not generated at runtime.

---

## Known conventions / gotchas

- Language-aware links in blocks must use `lang_prefix` from `bootstrap_sass_preprocess_block()`
  rather than hardcoding `/si/` or `/ta/`.
- `.socil-login-link` (misspelled) is the real class used by both CSS and JS for social login buttons —
  don't "fix" the typo without updating both `login-with.html.twig` and `custom.js`.
- Private profile / ad status badge classes must stay in sync with `kasada_core`'s moderation states
  (`under_review` / `verified` / `rejected` for profiles). Check `kasada_core/DEVNOTES.md` before
  changing status-related markup.
- `bootstrap_sass.libraries.yml-old` is a leftover backup file, not actually used — ignore it.

---

## Related module DEVNOTES

- [`kasada_core/DEVNOTES.md`](../../../modules/custom/kasada_core/DEVNOTES.md) — ad lifecycle, interest system, profile verification.
- [`kasada_auth2/DEVNOTES.md`](../../../modules/custom/kasada_auth2/DEVNOTES.md) — registration/login UX flows, set-password page.
