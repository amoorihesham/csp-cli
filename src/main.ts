import * as p from "@clack/prompts";
import chalk from "chalk";
import { collectProjectOptions } from "./prompts";
import { scaffold } from "./scaffold";
import { DegitProvider } from "./providers/degit-provider";
import { detectInstaller } from "./installer/detect-installer";

/**
 * Application entry point: wires together prompts, providers,
 * and the scaffold coordinator. No business logic lives here.   (SRP / DIP)
 */
export async function main(): Promise<void> {
  console.log();
  p.intro(chalk.bgCyan.black.bold("  csp-cli  ") + chalk.cyan("  Project Scaffolder"));

  const { template, projectName, installDeps } = await collectProjectOptions();

  const provider = new DegitProvider();
  const installer = installDeps ? detectInstaller() : null;

  await scaffold(projectName, template, provider, installer);

  const pm = installer?.name ?? "npm";
  const nextSteps = [
    chalk.green.bold("Your project is ready!"),
    "",
    chalk.dim("Next steps:"),
    `  ${chalk.cyan("cd")} ${projectName}`,
  ];
  if (!installDeps) nextSteps.push(`  ${chalk.cyan(`${pm} install`)}`);
  nextSteps.push(`  ${chalk.cyan(pm === "npm" ? "npm run dev" : `${pm} dev`)}`);
  p.outro(nextSteps.join("\n"));
}
