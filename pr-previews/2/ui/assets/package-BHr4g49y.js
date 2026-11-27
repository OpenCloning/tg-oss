const name = "@opencloning/tg-oss-range-utils";
const version = "1.0.0";
const type = "module";
const repository = "https://github.com/OpenCloning/tg-oss";
const dependencies = { "lodash-es": "^4.17.21" };
const scripts = { "build": "bun ../../tools/scripts/build.mjs", "lint": 'yarn run -T eslint "**/*.{ts,tsx,js,jsx}" package.json --max-warnings=0', "test": "cd ../.. && bun test packages/range-utils" };
const _package = {
  name,
  version,
  type,
  repository,
  dependencies,
  scripts
};
export {
  _package as default,
  dependencies,
  name,
  repository,
  scripts,
  type,
  version
};
