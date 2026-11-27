# Contributing to the code

## Repo Philosophy

This is a monorepo composed of multiple packages under `/packages`.
There are two types of packages: utils and ui (react) packages.
UI packages have everything util packages have but also have a demo and e2e cypress tests.
The config files for each package should extend the root config files.

## Getting started

Fork the repo, clone your fork locally and get into the project's root directory.

The repo uses Yarn 4, pinned in the `packageManager` field of `package.json`. Enable [corepack](https://nodejs.org/api/corepack.html) (bundled with Node) once so that `yarn` runs that version, then install dependencies:

```bash
corepack enable
yarn
```

Packages in this repo depend on each other with `workspace:*` (e.g. `"@opencloning/tg-oss-range-utils": "workspace:*"`), which links the local copy. The build replaces it with the real version in `dist/`.

## Running tasks

Tasks are `package.json` scripts. Each package has its own (`build`, `lint`, `test`, and for ove and ui also `start`, `build:demo`, `build:umd`, `e2e`, `e2e:local` and `launch-e2e`), and the root ones run them across all packages.

### One package

```bash
yarn workspace @opencloning/tg-oss-<package> <script>
```

or `yarn <script>` from inside `packages/<package>`. For example:

```bash
yarn workspace @opencloning/tg-oss-ui start          # demo dev server
yarn workspace @opencloning/tg-oss-ove start
yarn workspace @opencloning/tg-oss-ove launch-e2e    # dev server + Cypress app
yarn workspace @opencloning/tg-oss-ove e2e:local     # dev server + headless Cypress
yarn workspace @opencloning/tg-oss-ove build         # into dist/ove
yarn workspace @opencloning/tg-oss-ove build:demo    # demo app into demo-dist/ove
```

### All packages

```bash
yarn build      # every package, dependencies first
yarn build:umd  # UMD bundles (ove and ui)
yarn lint
yarn test       # bun test
```

## How to Publish

See the [README](./README.md)
