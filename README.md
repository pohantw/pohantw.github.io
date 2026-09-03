# Po-Han Chen — Personal Website

A framework-free, fully static academic website for [pohantw.github.io](https://pohantw.github.io/).

## Local preview

From the repository root, run any static file server. For example:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing

- Profile, education, experience, chips, and publications are in `index.html`.
- Layout, typography, and responsive behavior are in `styles.css`.
- The mobile menu and active navigation state are in `script.js`.
- Portrait and chip imagery are in `assets/images/`.

The CV link is intentionally shown as a placeholder until a public PDF is added. Add the PDF under `assets/`, then replace the placeholder block in `index.html` with a link.

## Deployment

Pushes to `main` are deployed through `.github/workflows/deploy.yml`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## Source notes

Public biographical and publication details were checked against Stanford Profiles, the Stanford AHA project, Google Scholar, and the linked project publications. The portrait and AHA chip-evolution graphic are from Stanford AHA pages; the Toy-CGRA layout is from the public EE272B project.
