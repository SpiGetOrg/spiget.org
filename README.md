# spiget.org

Website for [Spiget](https://spiget.org), the API for Spigot resources, plugins and authors.

Built with [Astro](https://astro.build) as a static site. All live data is loaded in the browser from `https://api.spiget.org/v2`.

## Development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # type check
npm run preview:worker  # build and serve with Cloudflare's local runtime (http://localhost:8787)
```

## Deployment

The site is hosted on Cloudflare Workers as static assets (no Worker script). Config is in `wrangler.jsonc`.

```sh
npx wrangler login   # once
npm run deploy       # astro build && wrangler deploy
```

For Workers Builds (deploy on push), use `npm run build` as the build command and `npx wrangler deploy` as the deploy command.

## Layout

| Path | What it is |
| --- | --- |
| `src/layouts/Layout.astro` | Page shell: meta tags, nav, footer, consent/ads/analytics scripts |
| `src/pages/` | One file per page (`/`, `/search/`, `/search/version/`, `/status/`, `/about/`, `/libraries/`, `/webhook/`, `/tryit/`, `/documentation/`, `404`) |
| `src/components/` | Nav, footer, ad slot, search form, Try It box, remote code example |
| `src/scripts/` | Browser helpers: API requests, footer alert, shared search logic |
| `src/styles/main.scss` | Bootstrap 5 theme (orange, Open Sans, square corners) and site styles |
| `public/libraries/libraries.json` | List of client libraries shown on `/libraries/`. Edit this file to add a library |
| `public/_redirects`, `public/_headers` | Redirects and headers, applied by Cloudflare (not served as files) |
| `wrangler.jsonc` | Cloudflare Workers config: serves `dist/`, unknown paths get `404.html`, adds trailing slashes |

## Notes

- **Library code examples** are fetched from their URLs at build time. If a URL is down, the page shows a link instead.
- **Old search links** like `/search/resources:worldedit/10` hit the 404 page, which forwards them to `/search/?q=resources:worldedit/10`. This relies on `not_found_handling: "404-page"` in `wrangler.jsonc`.
- **API docs** on `/documentation/` are rendered by [Scalar](https://scalar.com) from the spec in [SpiGetOrg/Documentation](https://github.com/SpiGetOrg/Documentation).
