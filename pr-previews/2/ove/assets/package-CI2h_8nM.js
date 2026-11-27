const name = "@opencloning/tg-oss-ui";
const version = "1.0.0";
const main = "./src/index.js";
const type = "module";
const repository = "https://github.com/OpenCloning/tg-oss";
const exports = { ".": { "import": "./index.es.js", "require": "./index.cjs.js" }, "./style.css": "./style.css" };
const dependencies = { "@blueprintjs/core": "3.54.0", "@blueprintjs/datetime": "^3.24.1", "@blueprintjs/icons": "3.33.0", "@blueprintjs/select": "3.18.11", "@dnd-kit/core": "^6.1.0", "@dnd-kit/modifiers": "^7.0.0", "@dnd-kit/sortable": "^8.0.0", "@dnd-kit/utilities": "3.2.2", "@opencloning/tg-oss-file-utils": "workspace:*", "@teselagen/react-table": "6.10.18", "classnames": "^2.3.2", "color": "^3.2.1", "copy-to-clipboard": "^3.3.1", "dayjs": "^1.10.4", "dom-scroll-into-view": "^2.0.1", "downloadjs": "^1.4.7", "fuse.js": "^6.6.2", "fuzzysearch": "^1.0.3", "immer": "^9.0.15", "lodash-es": "^4.17.21", "math-expression-evaluator": "^1.3.7", "mobx": "^6.10.2", "nanoid": "^5.1.16", "papaparse": "5.3.2", "qs": "^6.9.6", "react": "^18.3.1", "react-color": "^2.19.3", "react-dom": "^18.3.1", "react-dropzone": "^11.4.2", "react-markdown": "9.0.1", "react-redux": "^8.0.5", "react-rnd": "^10.2.4", "react-router-dom": "5", "react-transition-group": "^2.4.0", "recompose": "npm:react-recompose@0.31.1", "redux": "^4.1.2", "redux-form": "^8.3.10", "remark-gfm": "^4.0.0", "reselect": "^4.1.7", "tippy.js": "^6.3.7", "url-join": "^4.0.1", "use-deep-compare-effect": "^1.6.1", "write-excel-file": "^1.4.25" };
const devDependencies = { "chance": "1.1.11", "redux-thunk": "2.4.1" };
const scripts = { "start": "yarn run -T vite", "build": "bun ../../tools/scripts/build.mjs", "build:demo": "bun ../../tools/scripts/build.mjs --mode=demo", "build:umd": "bun ../../tools/scripts/build.mjs --mode=umd", "lint": 'yarn run -T eslint "**/*.{ts,tsx,js,jsx}" package.json --max-warnings=0', "test": "cd ../.. && bun test packages/ui", "e2e": "node ../../tools/scripts/e2e.mjs run --e2e --record --parallel", "e2e:local": "node ../../tools/scripts/e2e.mjs run --e2e", "launch-e2e": "node ../../tools/scripts/e2e.mjs open --e2e --browser chrome" };
const _package = {
  name,
  version,
  main,
  type,
  repository,
  exports,
  dependencies,
  devDependencies,
  scripts
};
export {
  _package as default,
  dependencies,
  devDependencies,
  exports,
  main,
  name,
  repository,
  scripts,
  type,
  version
};
