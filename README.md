# Igo Relindo, Data Analyst Portfolio

A static portfolio site (plain HTML, CSS and JavaScript). There is no build step, so GitHub Pages can serve it as it is.

## Put it online with GitHub Pages

1. Create a new public repository named `<your-github-username>.github.io`.
2. Upload everything in this folder to the repository root (`index.html`, `css/`, `js/`, `.nojekyll`).
3. Open Settings, then Pages. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-github-username>.github.io`.

To preview on your computer, open `index.html` in a browser.

## Edit the content

- Text, projects, links and contact details are all in `index.html`. Each project is one `<details class="project">` block.
- The chart in the hero reads its numbers from the top of `js/main.js`.
- Colours and fonts are the variables at the top of `css/style.css`. Dark mode follows the visitor's system setting.
