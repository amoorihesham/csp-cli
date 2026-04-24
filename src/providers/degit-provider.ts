import type { TemplateProvider } from "./template-provider";

/**
 * Pulls a GitHub template using degit (no git history, fast).
 */
export class DegitProvider implements TemplateProvider {
  async clone(repo: string, targetDir: string): Promise<void> {
    const { default: degit } = await import("degit");
    const emitter = degit(repo, { cache: false, force: true, verbose: false });
    await emitter.clone(targetDir);
  }
}
