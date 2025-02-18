# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Simple React + Vite  using BrowserRouter

### This example uses GitHub Actions for auto deploy.


## The mainsteps bellow are:

vite.config.js:
```html:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  base: "/router-test/"
})
```
package.json

```html:
"homepage": "https://github.com/git-username/repo-url",
```
#### Important 
deploy.yml
Edit 
```html:
        run: npm run build
```
To:

```html:
        run: npm run build && cp ./dist/index.html ./dist/404.html
```
