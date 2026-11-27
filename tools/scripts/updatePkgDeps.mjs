import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { resolve, join, basename } from "path";

// Get the project root from command line args
// Example: packages/sequence-utils
const projectRoot = process.argv[2];

if (!projectRoot) {
  console.error(
    "Please provide the project root as an argument (e.g., packages/my-lib)"
  );
  process.exit(1);
}

const workspaceRoot = process.cwd();
const possiblePaths = [
  resolve(workspaceRoot, "dist", projectRoot),
  resolve(workspaceRoot, "dist", basename(projectRoot))
];

const builtPackageJsonPath = possiblePaths
  .map(p => join(p, "package.json"))
  .find(p => existsSync(p));

if (!builtPackageJsonPath) {
  console.error(`Could not find built package.json. Checked:`);
  possiblePaths.forEach(p => console.error(` - ${join(p, "package.json")}`));
  process.exit(1);
}

try {
  const pkg = JSON.parse(readFileSync(builtPackageJsonPath, "utf-8"));
  let hasChanges = false;

  // Versions of the workspace packages, by package name
  const packagesDir = resolve(workspaceRoot, "packages");
  const workspaceVersions = {};
  for (const dir of readdirSync(packagesDir)) {
    const wsPkgPath = join(packagesDir, dir, "package.json");
    if (existsSync(wsPkgPath)) {
      const wsPkg = JSON.parse(readFileSync(wsPkgPath, "utf-8"));
      workspaceVersions[wsPkg.name] = wsPkg.version;
    }
  }

  // Replace "workspace:" ranges with real versions, the same way `yarn npm publish`
  // would: "workspace:*" -> "1.2.3", "workspace:^" -> "^1.2.3", "workspace:~" -> "~1.2.3".
  // We publish from dist/ with `npm publish`, which does not do this itself.
  const updateDeps = deps => {
    if (!deps) return;

    for (const [name, version] of Object.entries(deps)) {
      if (!version.startsWith("workspace:")) continue;

      const range = version.slice("workspace:".length);
      const depVersion = workspaceVersions[name];
      if (!depVersion) {
        throw new Error(`${name} (${version}) is not a workspace package`);
      }

      let newVersion;
      if (range === "*") newVersion = depVersion;
      else if (range === "^" || range === "~") newVersion = range + depVersion;
      else newVersion = range;

      console.info(`Updating ${name} from ${version} to ${newVersion}`);
      deps[name] = newVersion;
      hasChanges = true;
    }
  };

  if (pkg.dependencies) updateDeps(pkg.dependencies);
  if (pkg.peerDependencies) updateDeps(pkg.peerDependencies);
  // usually devDependencies are not in the built package.json, but just in case
  // if (pkg.devDependencies) updateDeps(pkg.devDependencies);

  if (hasChanges) {
    writeFileSync(builtPackageJsonPath, JSON.stringify(pkg, null, 2) + "\n");
    console.info(
      `Successfully updated dependencies in ${builtPackageJsonPath}`
    );
  } else {
    console.info(
      `No 'workspace:' dependencies found to update in ${builtPackageJsonPath}`
    );
  }
} catch (err) {
  console.error("Error updating package dependencies:", err);
  process.exit(1);
}
