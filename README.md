# Himpreet Kaur — 3D QA Portfolio

A dark, futuristic 3D portfolio website built with HTML, CSS, and Three.js.

## 📁 Project Structure

```
himpreet-portfolio/
├── index.html          ← Main HTML file (open this in browser)
├── css/
│   └── style.css       ← All styles (dark theme, animations, layout)
├── js/
│   ├── three-bg.js     ← Three.js 3D particle field + floating objects
│   └── main.js         ← Scroll reveal, counters, nav, skill bars
└── README.md
```

## 🚀 How to Run

### Option 1 — Just open in browser (simplest)
1. Download and unzip the folder
2. Double-click `index.html`
3. Opens directly in your browser — no server needed!

> ⚠️ Note: The Three.js 3D background loads from a CDN (cloudflare).
> Make sure you have an internet connection the first time you open it.

### Option 2 — Local dev server (recommended for editing)

Using Python (built-in on most systems):
```bash
cd himpreet-portfolio
python -m http.server 3000
```
Then open: http://localhost:3000

Using Node.js / npx:
```bash
cd himpreet-portfolio
npx serve .
```
Then open the URL shown in terminal.

Using VS Code:
- Install the **Live Server** extension
- Right-click `index.html` → "Open with Live Server"

## ✏️ How to Customise

### Update blog titles
In `index.html`, find the `<!-- BLOGS -->` section.
Replace the placeholder titles and excerpts with your real LinkedIn article titles and URLs.

Update each blog card's `onclick` to point to your specific article:
```html
onclick="window.open('YOUR_LINKEDIN_ARTICLE_URL', '_blank')"
```

### Update contact links
Find `<!-- CONTACT -->` and update the `href` values:
```html
<a href="mailto:YOUR_EMAIL" ...>
<a href="YOUR_LINKEDIN_URL" ...>
<a href="YOUR_GITHUB_URL" ...>
```

### Add a profile photo
Add an `<img>` tag in the hero section, or replace the terminal block with a photo card.

### Change colours
Open `css/style.css` and edit the `:root` variables at the top:
```css
:root {
  --neon:  #00ffe7;   ← main accent colour
  --neon2: #ff2d78;   ← secondary accent (pink)
  --neon3: #7b2fff;   ← tertiary accent (purple)
}
```

### Add more projects or blog posts
Copy an existing `.project-card` or `.blog-card` block in `index.html` and update the content.

## 🌐 Deploy Online (Free Options)

### GitHub Pages
1. Push folder to a GitHub repo
2. Go to Settings → Pages → Source: main branch, root folder
3. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify (drag & drop — easiest)
1. Go to https://netlify.com
2. Drag your `himpreet-portfolio` folder onto the dashboard
3. Get a live URL instantly

### Vercel
```bash
npm i -g vercel
cd himpreet-portfolio
vercel
```

## 🛠️ Tech Stack
- **HTML5** — semantic structure
- **CSS3** — custom properties, animations, grid, flexbox
- **Three.js r128** — 3D particle field and wireframe objects (loaded via CDN)
- **Google Fonts** — Orbitron, Share Tech Mono, Inter (loaded via CDN)
- **Vanilla JS** — scroll reveal, IntersectionObserver, counter animation

No build tools, no npm install, no bundler required. Pure HTML/CSS/JS.

---
Built for Himpreet Kaur · Senior QA & Test Automation Engineer
