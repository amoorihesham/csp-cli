import * as p from "@clack/prompts";
import chalk from "chalk";
import type { Installer } from "../installer/installer";

/**
 * Runs the package manager install step.
 * Receives an Installer rather than detecting one itself.        (SRP / DIP)
 */
export async function installDependencies(installer: Installer, targetDir: string): Promise<void> {
  const spinner = p.spinner();
  spinner.start(`Installing dependencies using ${installer.name}…`);
  try {
    await installer.install(targetDir);
    spinner.stop("Dependencies installed");
  } catch (err) {
    spinner.stop("Failed to install dependencies");
    const message = err instanceof Error ? err.message : String(err);
    p.log.warn(
      chalk.yellow(`Install failed — run it manually:\n  ${installer.name} install\n${message}`)
    );
  }
}
