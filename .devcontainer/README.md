# Dev container

Isolated development environment for tg-oss, based on the OpenCloning dev container: Node 24 with Yarn 4 (via corepack), Bun (builds and unit tests), Cypress and its system libraries (e2e tests), Python 3.12 via uv, Claude Code, and a firewall script that only allows the hosts the project needs (currently disabled, see the `exit 0` at the top of `init-firewall.sh`).

```sh
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . bash
```

Once inside, `check-isolation.sh` should report no failures. The repo's `.git` is mounted read-only, so commit from the host.

## Running things

```sh
bun test                              # unit tests for all packages
yarn workspace @opencloning/tg-oss-ove build       # build a package into dist/
yarn workspace @opencloning/tg-oss-ove start       # ove demo on http://localhost:8805 (ui: 7614)
yarn workspace @opencloning/tg-oss-ove e2e:local   # Cypress e2e headless, without Cypress Cloud
```
