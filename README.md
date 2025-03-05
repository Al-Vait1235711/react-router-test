# Multi page React App setup on gh-pages using BrowserRouter


### This example uses GitHub Actions for auto deploy.

#### Source
```href
https://blog.devgenius.io/how-to-deploy-your-vite-react-app-to-github-pages-with-and-without-react-router-b060d912b10e?gi=cd85d0ebb198
```

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


Change the bellow 
```html:
        run: npm run build
```

To:

```html:
        run: npm run build && cp ./dist/index.html ./dist/404.html
```
