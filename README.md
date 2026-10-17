# Shubh Enterprises — Free Online Product Catalogue

This is a static website starter built from the product lists available in the uploaded PDFs. It uses no paid APIs, no paid hosting requirement, and no SKU, price, or stock fields.

## What's inside
- `index.html` — website layout
- `styles.css` — responsive teal / navy / orange design
- `app.js` — product search, category filtering, photo placeholders, WhatsApp enquiries
- `products.json` — product names and categories extracted from the uploaded product lists

Current dataset: 303 product entries across 18 categories. Text extraction depends on the formatting of the original PDFs; check product names against the source lists before publishing.

## Preview on your computer
1. Extract the ZIP to a folder.
2. Open the folder.
3. For local preview, run a simple local server in the folder:
   - Windows: install Python if needed, open Command Prompt in the folder, then run `py -m http.server 8000`
   - Open `http://localhost:8000` in your browser.
   - If you do not want to run a local server, upload the folder to GitHub Pages as described below.

## Publish for free with GitHub Pages
1. Create/sign in to a free GitHub account at https://github.com/.
2. Create a new **public** repository, for example `shubh-enterprises-catalogue`.
3. Upload the five website files (`index.html`, `styles.css`, `app.js`, `products.json`, and `README.md`) to the repository root.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site. Its URL will look like `https://YOUR-USERNAME.github.io/shubh-enterprises-catalogue/`.
7. Open that URL on your phone and test search terms such as `88A`, `CF259A`, `pickup roller`, and `Teflon`.

GitHub's free Pages hosting generally requires a public repository for free personal use; do not upload private customer data or secrets.

## Add real product photos
1. Make an `images` folder in the repository.
2. Add a product photo, for example `images/88a-toner.jpg`.
3. Open `products.json` and find the matching product object.
4. Change its `"image": ""` to `"image": "images/88a-toner.jpg"`.
5. Save and publish again. The product card will show the real photo instead of a placeholder.

## Edit product names / categories
Open `products.json` in a text editor or GitHub's edit view. Each item has only `name`, `category`, and `image`. There are intentionally no SKU, price, or stock fields.

## Business details
Current contact details in the page are from the supplied business materials. Confirm the phone number and contact details before publishing. The WhatsApp enquiry action is configured to use 9665897878.

## Important
- The site searches product names, cartridge numbers, and category labels. It does not currently use AI or automatically verify printer compatibility.
- Product images are blank placeholders until you add real photos.
- The site is a starter package; it is not yet published online. GitHub Pages is the free publishing step.
