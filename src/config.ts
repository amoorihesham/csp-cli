import type { TemplateDefinition } from "./types";

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "fastify-ts",
    label: "Fastify TypeScript API",
    repo: "amoorihesham/project-starter",
    placeholder: "my-fastify-api",
    deps: ["fastify", "drizzle-orm", "bcrypt", "zod", "dotenv", "pino"],
  },
];
