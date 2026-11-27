const name = "@opencloning/tg-oss-file-utils";
const version = "1.0.0";
const type = "module";
const repository = "https://github.com/OpenCloning/tg-oss";
const dependencies = { "buffer": "5.7.1", "jszip": "^3.10.1", "lodash-es": "^4.17.21", "papaparse": "5.3.2" };
const scripts = { "build": "bun ../../tools/scripts/build.mjs", "lint": 'yarn run -T eslint "**/*.{ts,tsx,js,jsx}" package.json --max-warnings=0', "test": "cd ../.. && bun test packages/file-utils" };
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
