// Run Cypress against the package's dev server, like the old @nx/cypress executor did:
// start `yarn start` (vite), wait until it prints "ready in", run cypress with the given
// arguments, then stop the server and exit with cypress's exit code.
//
// Run from a package directory (ove, ui), e.g. `node ../../tools/scripts/e2e.mjs run --e2e`.
// Waiting for vite's output rather than polling the port avoids localhost resolving to
// IPv6 for vite but IPv4 for the poller.
import { spawn } from "node:child_process";

const cypressArgs = process.argv.slice(2);
const READY = /ready in/;
const TIMEOUT_MS = 5 * 60 * 1000;

// detached: own process group, so the whole tree (yarn -> vite) can be stopped at the end
const server = spawn("yarn", ["start"], {
  stdio: ["ignore", "pipe", "pipe"],
  detached: true
});

const stopServer = () => {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    // already gone
  }
};

const ready = new Promise((resolve, reject) => {
  const timer = setTimeout(
    () => reject(new Error(`dev server not ready after ${TIMEOUT_MS / 1000}s`)),
    TIMEOUT_MS
  );
  const onData = chunk => {
    process.stdout.write(chunk);
    if (READY.test(chunk.toString())) {
      clearTimeout(timer);
      resolve();
    }
  };
  server.stdout.on("data", onData);
  server.stderr.on("data", chunk => process.stderr.write(chunk));
  server.on("exit", code => {
    clearTimeout(timer);
    reject(
      new Error(`dev server exited with code ${code} before it was ready`)
    );
  });
});

let exitCode = 1;
try {
  await ready;
  // keep showing server output while cypress runs
  const cypress = spawn("yarn", ["run", "-T", "cypress", ...cypressArgs], {
    stdio: "inherit"
  });
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => cypress.kill(signal));
  }
  exitCode = await new Promise(resolve =>
    cypress.on("exit", code => resolve(code ?? 1))
  );
} catch (error) {
  console.error(error.message);
} finally {
  stopServer();
}
process.exit(exitCode);
