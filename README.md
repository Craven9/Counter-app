Counter App
===========

A tiny web component counter demo built with Lit. Open `index.html` in a local static server to view it.

Run locally (PowerShell example):

```powershell
# Using Python 3 built-in server
python -m http.server 8000

# or using npx http-server
npx http-server -p 8000
```

Then open http://127.0.0.1:8000 in your browser.

Optional: install the confetti package locally

If you prefer the library-based confetti (instead of the built-in fallback flash), run:

```powershell
npm install @haxtheweb/multiple-choice --save
```

The component will dynamically import the confetti module when you hit the special value (21). If the import isn't available, it falls back to a simple animation.

Notes
-----
- The larger number, button spacing, hover and focus states, and confetti behavior are implemented in `counter-app.js`.
- Buttons are disabled at min/max and color changes occur at min, 18, 21, and max.
