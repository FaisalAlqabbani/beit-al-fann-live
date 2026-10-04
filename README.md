# Beit Al-Fann Live · بيت الفن حيّ

A bilingual (English / Arabic) prototype for the LOYAC Innovation Camp pitch:
weekly debates, a three-week artistic residency and art workshops at **Beit
Al-Fann**, the 1920s heritage house on Prince Muhammad St. in downtown Amman,
run by Greater Amman Municipality.

Rebuilt from `../index.html`, which stays untouched as the content reference.

---

## Run it on Windows

Open a terminal in this folder (`clean\beit-al-fann-next`).

**First time only**

```
npm install
```

**Development**

```
npm run dev
```

Then open <http://localhost:3000>.

**Production (what to use for the pitch — faster and no dev overlay)**

```
npm run build
npm start
```

Then open <http://localhost:3000>.

Or just double-click **`start-pitch.bat`**, which builds if needed, starts the
server and opens the browser for you.

`/` redirects to the language you last used (stored in a cookie), defaulting to
English. Deep links work directly: `/en/house`, `/ar/events`, and so on.

---

## What's on each page

| Route | EN | AR |
|---|---|---|
| `/[locale]` | Home | الرئيسية |
| `/[locale]/events` | Events | الفعاليات |
| `/[locale]/residency` | Residency | الإقامة الفنية |
| `/[locale]/artists` | Artists | الفنانون |
| `/[locale]/house` | The House | البيت |
| `/[locale]/request` | Request a room | اطلب غرفة |

- **Home** — hero over the façade, live countdown to the 29 October debate,
  free-spots meter, three pillars, next three events.
- **Events** — filter chips (All / Weekly debates / Workshops / Residency) and
  cards whose action depends on state: drop-in, reserve, reserved, or waitlist.
- **Residency** — the open-call form, with image previews and a live word count.
- **Artists** — six example profiles, each with procedurally generated artwork.
- **The House** — the interactive five-zone plan, a Today / With-the-program
  toggle, a zone inspector, and the heritage rules.
- **Request a room** — the artist request form with a Request → Approve →
  Announce tracker.

Reservations are kept in `localStorage`, so a reserved spot survives a refresh
and stays consistent between Home and Events. Every storage access is wrapped
in `try/catch`, so private mode or blocked storage degrades to in-memory only.

---

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript, `src/` directory
- Tailwind CSS v4, tokens as CSS variables in `src/app/globals.css`
- Motion (`motion/react`) for interaction animation
- Zustand (persisted) for reservations and toasts
- `next/font/google`: **Fraunces** (Latin display, variable `SOFT`/`WONK` axes),
  **Reem Kufi** (Arabic display), **IBM Plex Sans Arabic** (body, both scripts)

```
src/
  app/[locale]/        layout, template (page transitions), six routes
  components/          Header, Hero, Countdown, CapacityMeter, EventCard,
                       EventsBrowser, ArtistCard, HousePlan, ResidencyForm,
                       RoomRequestForm, Field, ToastHost, ArchesSvg, ui
  data/                events.ts, artists.ts, zones.ts, copy.en.ts, copy.ar.ts
  lib/                 i18n.ts, store.ts, validation.ts
  proxy.ts             redirects "/" to the remembered locale
public/images/         facade.jpg, arcade.jpg, front.jpg
```

---

## Notes and decisions

**Next.js 16, not 15.** `create-next-app` installs 16; everything in the brief
works the same. The `middleware` convention is deprecated in 16, so the locale
redirect lives in `src/proxy.ts` as `export function proxy`.

**The hero entrance runs on CSS, not JavaScript.** `requestAnimationFrame` is
throttled in a background tab, which freezes a JS-driven reveal mid-flight and
would leave the headline invisible if the page were opened in a tab before
being brought forward. The title mask, the fade-ups and the capacity meter are
CSS animations, which advance on the document timeline and are simply finished
by the time the tab is shown. Motion still drives everything that responds to a
click: the nav pill, filter chips, zone inspector, toasts and form states.

**Colour utilities use theme tokens, not arbitrary values.** `text-[var(--fg)]`
is ambiguous in Tailwind (font-size or colour?) and silently produces nothing.
The palette is registered in `@theme inline`, so `text-fg`, `bg-surface` and
`border-line` are real utilities.

**Base styles are inside `@layer base`.** Unlayered CSS outranks every cascade
layer, so a bare `a { color: inherit }` would beat Tailwind's utilities and
break every text colour applied to a link.

**The Arabic zone-label bug is fixed.** SVG resolves `text-anchor` along the
inline direction. Under `dir="rtl"` the inline *start* is the right edge, so the
labels anchor with `start` in both directions and always run inward. Anchoring
with `end` is what pushed the Arabic labels outside their boxes.

**`balcony.jpg` is not in `../images`,** so it is not referenced. The hero uses
`facade.jpg` and the House header band uses `arcade.jpg`; `front.jpg` is
available if you want a third.

**Reduced motion** is respected throughout: `prefers-reduced-motion: reduce`
disables the Ken Burns zoom, the drifting gradients, the marching zone outline,
the tilt and the particle burst, leaving plain opacity changes.

---

## Checks run

- `npm run lint` — clean (including React 19's `set-state-in-effect` rule)
- `npm run build` — succeeds, no type errors; all 12 locale pages prerendered
- All six routes return 200 in both locales, and `/` redirects correctly
- Reserve → toast → "Reserved" → count decrements → survives a refresh, and
  Home and Events agree
- Full event shows "Join waitlist"; the residency open studio shows
  "Drop in, no booking"
- Residency and request validation messages match `index.html` exactly,
  including the live word count in the statement error
- House plan: mouse and keyboard selection, Today / With-the-program toggle,
  and Arabic labels sitting inside their boxes
- No horizontal overflow at 502px (the narrowest window Chrome allows here)

Not verified in this environment: viewports below 502px, because the browser
could not be resized smaller. The layout is built mobile-first and the
breakpoints are standard, but check a real phone before the pitch.
