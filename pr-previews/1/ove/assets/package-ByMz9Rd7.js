const name = "@opencloning/tg-oss-bio-parsers";
const version = "1.0.0";
const type = "module";
const repository = "https://github.com/OpenCloning/tg-oss";
const dependencies = { "@gmod/gff": "^1.2.1", "@opencloning/tg-oss-range-utils": "workspace:*", "@opencloning/tg-oss-sequence-utils": "workspace:*", "bufferpack": "^0.0.6", "color": "3.2.1", "fast-xml-parser": "^5.12.1", "fflate": "^0.8.3", "lodash-es": "^4.17.21", "validate.io-nonnegative-integer-array": "^1.0.1" };
const exports = { ".": { "import": "./index.js", "require": "./index.cjs" } };
const _package = {
  name,
  version,
  type,
  repository,
  dependencies,
  exports
};
export {
  _package as default,
  dependencies,
  exports,
  name,
  repository,
  type,
  version
};
