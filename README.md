# banerjeesouvik.com

Personal website built with Next.js.

## Tech Stack

- React
- Next.js
- CSS
- Volta (pinned Node + Yarn)

## Prerequisites

- [Volta](https://volta.sh/) installed
- Or manually install:
  - Node `25.9.0`
  - Yarn `1.22.19`

## Getting Started

```bash
yarn install
yarn dev
```

App runs at `http://localhost:5173`.
App runs at `http://localhost:3000`.

## Scripts

```bash
yarn dev      # start dev server
yarn build    # production build
yarn start    # start production server
```

## Content & Customization

- Profile and social links: `src/content/portfolioContent.js`
- Page composition: `src/App.jsx` and `src/app/page.jsx`
- Components: `src/components/`
- Styling and theme tokens: `src/styles.css` (imported via `src/app/layout.jsx`)
- Profile photo: `src/assets/souvik_banerjee_photo.webp`

## Theme

Light/dark mode toggle is available and persisted in local storage.

## Package Manager

This repository is Yarn-first:

- `packageManager`: `yarn@1.22.19`
