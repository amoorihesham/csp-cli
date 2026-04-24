/**
 * Abstraction for pulling a project template from any source.
 * New sources (npm, local path, zip) implement this interface
 * without touching the scaffold coordinator.                    (OCP / DIP)
 */
export interface TemplateProvider {
  clone(repo: string, targetDir: string): Promise<void>;
}
