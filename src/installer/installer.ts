/**
 * Abstraction for a package manager that can install dependencies.
 * Concrete implementations live alongside this file.             (OCP / DIP)
 */
export interface Installer {
  /** The package manager name shown in spinner text and next-steps. */
  readonly name: string;
  install(cwd: string): Promise<void>;
}
