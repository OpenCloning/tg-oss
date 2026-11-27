// Copied from @nx/eslint-plugin 20.4.6 (src/configs/react-tmp.js) when nx was removed,
// so that linting keeps the exact same rules. Used from /.eslintrc.json.
const path = require("path");

module.exports = {
  extends: [
    path.join(__dirname, "react-base.cjs"),
    path.join(__dirname, "react-typescript.cjs"),
    path.join(__dirname, "react-jsx.cjs")
  ]
};
