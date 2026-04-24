import * as p from "@clack/prompts";
import chalk from "chalk";
import { TEMPLATES } from "./config";
import { isValidProjectName } from "./validator";
import type { TemplateDefinition } from "./types";

export interface ProjectOptions {
  template: TemplateDefinition;
  projectName: string;
  installDeps: boolean;
}

/**
 * Collects all user input and returns a plain ProjectOptions object.
 * No scaffolding logic lives here — only UI.                      (SRP)
 */
export async function collectProjectOptions(): Promise<ProjectOptions> {
  const answers = await p.group(
    {
      template: () => {
        if (TEMPLATES.length === 1) {
          const t = TEMPLATES[0];
          p.log.info(`Template: ${chalk.bold(t.label)}  ${chalk.dim(t.deps.join(" · "))}`);
          return Promise.resolve(t);
        }
        return p.select<TemplateDefinition>({
          message: "Which project template?",
          options: TEMPLATES.map((t) => ({
            value: t,
            label: t.label,
            hint: t.deps.join(" · "),
          })),
        });
      },

      projectName: ({ results }) => {
        const tpl = results.template as TemplateDefinition;
        return p.text({
          message: "What is your project name?",
          placeholder: tpl.placeholder,
          validate(value) {
            const result = isValidProjectName(value);
            if (result !== true) return result;
          },
        });
      },

      installDeps: () => p.confirm({ message: "Install dependencies now?", initialValue: true }),
    },
    {
      onCancel() {
        p.cancel("Cancelled. No files were created.");
        process.exit(0);
      },
    }
  );

  return {
    template: answers.template as TemplateDefinition,
    projectName: (answers.projectName as string).trim(),
    installDeps: answers.installDeps as boolean,
  };
}
