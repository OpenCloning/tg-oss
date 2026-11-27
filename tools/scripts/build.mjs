import { $, argv } from "bun";
import path from "node:path";

// 1. Bun-native path helpers
const workspaceRoot = path.resolve(import.meta.dir, "../../");

// 2. Arguments: [projectRoot] [...vite build args]
// projectRoot (e.g. packages/ove) defaults to the current directory, which is the
// package directory when run from a package.json script (`yarn build`).
// Extra args (e.g. --mode=demo) are passed on to vite build.
const hasProjectRoot = argv[2] && !argv[2].startsWith("-");
const projectRoot = hasProjectRoot
  ? argv[2]
  : path.relative(workspaceRoot, process.cwd());
const args = argv.slice(hasProjectRoot ? 3 : 2);

if (!projectRoot || projectRoot.startsWith("..")) {
  console.error("Run this from a package directory, or pass its path");
  process.exit(1);
}

const fullProjectRoot = path.resolve(workspaceRoot, projectRoot);
const distDir = path.resolve(workspaceRoot, "dist", projectRoot);

console.info(`Building ${projectRoot}...`);

/**
 * 3. Canonical Cleanup
 * Bun's Shell ($) is faster and handles errors via promises.
 */
await $`rm -rf ${distDir}`;

/**
 * 4. Run Vite Build
 * Using Bun Shell's .cwd() to handle execution context.
 * It inherits stdio (inherit) by default.
 */
try {
  console.info(`Running build for ${projectRoot}...`);
  // Use ${args} directly; Bun Shell handles array interpolation safely
  await $`bun vite build --config vite.config.ts ${args}`.cwd(fullProjectRoot);
} catch (error) {
  console.error("Build failed");
  process.exit(1);
}

/**
 * 5. Update package dependencies
 * Skip if building in demo mode (no package.json to update)
 */
if (args.some(arg => arg.includes("mode=demo"))) {
  console.info("Demo build detected. Skipping dependency updates.");
  process.exit(0);
}

try {
  const updateDepsScript = path.resolve(
    workspaceRoot,
    "tools/scripts/updatePkgDeps.mjs"
  );
  console.info(`Updating dependencies...`);
  await $`bun ${updateDepsScript} ${projectRoot}`.cwd(workspaceRoot);
} catch (error) {
  console.error("Dependency update failed");
  process.exit(1);
}
