import path from "path";
import type { TemplateDefinition } from "./types";
import type { TemplateProvider } from "./providers/template-provider";
import type { Installer } from "./installer/installer";
import { cloneTemplate } from "./steps/clone-template";
import { configureProject } from "./steps/configure-project";
import { installDependencies } from "./steps/install-deps";

export async function scaffold(
  projectName: string,
  template: TemplateDefinition,
  provider: TemplateProvider,
  installer: Installer | null
): Promise<void> {
  const targetDir = path.resolve(process.cwd(), projectName);
  await cloneTemplate(provider, template.repo, targetDir);
  configureProject(targetDir, projectName);
  if (installer) await installDependencies(installer, targetDir);
}
