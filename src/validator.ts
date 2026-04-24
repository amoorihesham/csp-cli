import fs from "fs";
import path from "path";

/**
 * Validates a project name entered by the user.
 * Returns true on success, or an error string to display inline.  (SRP)
 */
export function isValidProjectName(name: string): true | string {
  if (!name || name.trim().length === 0) return "Project name cannot be empty.";
  if (!/^[a-z0-9@._/-]+$/i.test(name))
    return "Use only letters, numbers, hyphens, underscores, and dots.";
  if (fs.existsSync(path.resolve(process.cwd(), name)))
    return `A folder named "${name}" already exists here.`;
  return true;
}
