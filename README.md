# Apple Store MVP (React + Vite)

A responsive storefront starter with sample products, search, category filters, persistent cart, and WhatsApp order handoff.

## Run locally

1. Install Node.js LTS from https://nodejs.org if it is not already installed.
2. Extract this folder.
3. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL Vite prints (usually http://localhost:5173).

## Customize before launch

- **Products/prices:** edit `src/data/products.js`.
- **WhatsApp checkout:** in `src/App.jsx`, set `WHATSAPP_NUMBER` to your number including country code, digits only (no `+`, spaces, or dashes). Example format: `27821234567`.
- **Brand name:** search for `Apple Store` / `Apple Store Concept` in `index.html` and `src/App.jsx` and replace it with your actual shop name.
- **Images:** sample image URLs are external and require an internet connection. Replace them with your own product photography when ready.

## Deploy to Netlify (quick path)

1. Create a GitHub repository and push this project.
2. Sign in at https://app.netlify.com and choose **Add new site → Import an existing project**.
3. Connect your GitHub repository.
4. Set build command to `npm run build`; publish directory to `dist`.
5. Click **Deploy**. Netlify will provide a public URL.

You can also deploy by running `npm run build` and dragging the generated `dist` folder into Netlify's manual deploy area.

## Important notes

- This MVP does not process payments or reserve inventory. WhatsApp is only an order enquiry/handoff.
- Prices are sample placeholders; confirm your real prices and availability before accepting orders.
- The storefront uses Apple product names for catalogue examples but is an independent retail concept, not affiliated with Apple Inc.
- Add a privacy policy, delivery/returns details, and contact information before promoting the store publicly.
