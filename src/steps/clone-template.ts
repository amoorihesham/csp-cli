import * as p from "@clack/prompts";
import chalk from "chalk";
import type { TemplateProvider } from "../providers/template-provider";

/**
 * Pulls the template repo into targetDir via the supplied provider.
 * Knows nothing about project naming or dependency installation.  (SRP / ISP)
 */
export async function cloneTemplate(
  provider: TemplateProvider,
  repo: string,
  targetDir: string
): Promise<void> {
  const spinner = p.spinner();
  spinner.start("Pulling template from GitHub…");
  try {
    await provider.clone(repo, targetDir);
    spinner.stop("Template pulled successfully");
  } catch (err) {
    spinner.stop("Failed to pull template");
    const message = err instanceof Error ? err.message : String(err);
    p.log.error(chalk.red(`Could not clone ${chalk.bold(repo)}:\n${message}`));
    p.log.info("Make sure the repo exists and is public, or set a personal access token.");
    process.exit(1);
  }
}
