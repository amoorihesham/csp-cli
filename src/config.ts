import type { TemplateDefinition } from "./types";

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "fastify-ts",
    label: "Fastify TypeScript API",
    repo: "amoorihesham/fastify-starter",
    placeholder: "my-fastify-api",
    deps: ["fastify", "drizzle-orm", "zod", "eslint", "prettier", "tsup", "tsx"],
  },
];
