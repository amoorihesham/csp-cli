import { execSync, spawn } from "child_process";
import type { Installer } from "./installer";

/**
 * A concrete Installer that runs `<name> install` via the shell.
 * Private to this module — callers only see the Installer interface.
 */
class ShellInstaller implements Installer {
  constructor(readonly name: string) {}

  install(cwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Single-string shell invocation avoids DEP0190 (args array + shell:true).
      const child = spawn(`${this.name} install`, {
        cwd,
        stdio: "ignore",
        shell: true,
      } as object);
      child.on("close", (code) =>
        code === 0 ? resolve() : reject(new Error(`${this.name} install failed (exit ${code})`))
      );
      child.on("error", reject);
    });
  }
}

function isAvailable(cmd: string): boolean {
  try {
    execSync(`${cmd} --version`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the first available package manager on the system,
 * falling back to npm which ships with every Node installation.
 */
export function detectInstaller(): Installer {
  for (const pm of ["bun", "pnpm", "yarn"] as const) {
    if (isAvailable(pm)) return new ShellInstaller(pm);
  }
  return new ShellInstaller("npm");
}
