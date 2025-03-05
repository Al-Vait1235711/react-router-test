# Multi page React App setup on gh-pages using BrowserRouter


### This example uses GitHub Actions for auto deploy.

#### Source
```href
https://blog.devgenius.io/how-to-deploy-your-vite-react-app-to-github-pages-with-and-without-react-router-b060d912b10e?gi=cd85d0ebb198
```

## The mainsteps bellow are:

* Configure "base" on vite.config.js file
* Configure "homepage" on package.json file
* Copy index.html to dist/404.html during build (git-gub-actions.yaml)

* Important: all href links on your page should direct to "[github-user]/github.io/[your-repo-name]/"




* vite.config.js:
```code:
export default defineConfig({
  plugins: [react()],
  base: "/[your-repo-name]/"
})
```
* package.json

```code:
"homepage": "https://github.com/git-username/[your-repo-name]",
```
#### Important 
deploy.yml


* In actions.yaml change the bellow 
```code:
        run: npm run build
```

To:

```code:
        run: npm run build && cp ./dist/index.html ./dist/404.html
```
