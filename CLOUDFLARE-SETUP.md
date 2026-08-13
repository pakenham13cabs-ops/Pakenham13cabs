# Pakenham 13 Cabs — Cloudflare setup

Do not change the domain until the temporary Cloudflare website, booking database and email notification have all been tested.

## Cloudflare project settings

- Worker name: `pakenham-13-cabs`
- Build command: `npm run build`
- Deploy command: `npm run deploy:cloudflare`
- Root directory: `/`

## Booking database

The `pakenham-bookings` D1 database is already connected in `wrangler.jsonc`.
Keep the binding name as `DB`.

The booking table is created automatically when the first valid booking is submitted.

## Email notifications

After the temporary Cloudflare site works, add a Worker secret named exactly:

`WEB3FORMS_ACCESS_KEY`

Use the access key received by `Pakenham13cabs@gmail.com`. Do not commit the real value to GitHub.

## Domain and Google

Connect `pakenham13cabs.com.au` only after testing. When the domain works over HTTPS, verify it in Google Search Console and submit:

`https://pakenham13cabs.com.au/sitemap.xml`
