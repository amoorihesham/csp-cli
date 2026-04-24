import * as p from "@clack/prompts";
import fs from "fs";
import path from "path";

/**
 * Applies project-level configuration to the cloned template.
 * Currently updates package.json; extend here for future tweaks
 * (renaming files, injecting env vars, etc.) without touching    (SRP / OCP)
 * any other step.
 */
export function configureProject(targetDir: string, projectName: string): void {
  const spinner = p.spinner();
  spinner.start("Configuring your project…");
  setPackageName(targetDir, projectName);
  spinner.stop("Project configured");
}

function setPackageName(dir: string, name: string): void {
  const pkgPath = path.join(dir, "package.json");
  if (!fs.existsSync(pkgPath)) return;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8")) as Record<string, unknown>;
  pkg.name = name;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}
