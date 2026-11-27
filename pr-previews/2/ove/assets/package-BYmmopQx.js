const name = "@opencloning/tg-oss-sequence-utils";
const version = "1.0.0";
const repository = "https://github.com/OpenCloning/tg-oss";
const type = "module";
const dependencies = { "@opencloning/tg-oss-range-utils": "workspace:*", "escape-string-regexp": "5.0.0", "jsondiffpatch": "^0.7.7", "lodash-es": "^4.17.21", "nanoid": "^5.1.16", "string-splice": "^1.3.0" };
const exports = { ".": { "import": "./index.js", "require": "./index.cjs" } };
const scripts = { "build": "bun ../../tools/scripts/build.mjs", "lint": 'yarn run -T eslint "**/*.{ts,tsx,js,jsx}" package.json --max-warnings=0', "test": "cd ../.. && bun test packages/sequence-utils" };
const _package = {
  name,
  version,
  repository,
  type,
  dependencies,
  exports,
  scripts
};
export {
  _package as default,
  dependencies,
  exports,
  name,
  repository,
  scripts,
  type,
  version
};
