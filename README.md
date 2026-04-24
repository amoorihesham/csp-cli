<div align="center">

# 🚀 csp-cli

**Scaffold a production-ready Fastify TypeScript API in seconds.**

[![npm version](https://img.shields.io/npm/v/@start-develop/csp?style=flat-square&color=cyan)](https://www.npmjs.com/package/@start-develop/csp)
[![CI](https://img.shields.io/github/actions/workflow/status/amoorihesham/csp-cli/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/amoorihesham/csp-cli/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/actions/workflow/status/amoorihesham/csp-cli/release.yml?branch=main&style=flat-square&label=Release)](https://github.com/amoorihesham/csp-cli/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)](https://nodejs.org)

</div>

---

## ✨ What is csp-cli?

`csp-cli` is an interactive command-line tool that bootstraps a new backend project from a curated GitHub starter template. One command is all it takes — pick a name, confirm dependency installation, and you're up and running.

```
┌  csp-cli  Project Scaffolder
│
◆  Template: Fastify TypeScript API  fastify · drizzle-orm · bcrypt · zod · dotenv · pino
│
◇  What is your project name?
│  my-fastify-api
│
◇  Install dependencies now?
│  Yes
│
◇  Template pulled successfully
◇  Project configured
◇  Dependencies installed
│
└  Your project is ready!

   Next steps:
     cd my-fastify-api
     pnpm dev
```

---

## 📦 Installation

Install globally and use it from anywhere:

```bash
# npm
npm install -g @start-develop/csp

# pnpm
pnpm add -g @start-develop/csp

# or run without installing
npx @start-develop/csp
pnpm dlx @start-develop/csp
```

---

## 🛠️ Usage

```bash
csp
```

The CLI will guide you through the following steps:

1. **Choose a template** — currently ships with a Fastify TypeScript API starter. More templates coming soon.
2. **Name your project** — the name is validated and used as the folder name and `package.json` name.
3. **Install dependencies** — optionally let the CLI run the install step for you using your detected package manager (bun → pnpm → yarn → npm).

Once complete, your project is ready to run.

---

## 🤝 Contributing

Contributions are welcome! Whether it's a bug fix, a new template, or an improvement to the CLI experience — open a PR.

### 1. Clone the repository

```bash
git clone https://github.com/amoorihesham/csp-cli.git
cd csp-cli
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run in development mode

```bash
pnpm dev
```

This runs the CLI directly from TypeScript source via `tsx` — no build step needed during development.

### 4. Build

```bash
pnpm build
```

Compiles TypeScript to `dist/` using `tsc`.

### 5. Code quality

```bash
pnpm typecheck     # TypeScript type checking
pnpm lint          # ESLint
pnpm format        # Prettier (write)
pnpm format:check  # Prettier (check only)
```

### 6. Commit conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org). Your commit message determines the next version automatically:

| Prefix | Release |
|---|---|
| `fix:` | Patch `1.0.x` |
| `feat:` | Minor `1.x.0` |
| `BREAKING CHANGE:` | Major `x.0.0` |
| `chore:`, `docs:`, `refactor:` | No release |

---

## 🗂️ Project Structure

```
src/
├── index.ts                  Entry point
├── main.ts                   Orchestration — wires prompts → scaffold
├── prompts.ts                All interactive UI (@clack/prompts)
├── scaffold.ts               Thin coordinator: clone → configure → install
├── validator.ts              Project name validation
├── config.ts                 Template definitions
├── types.ts                  Shared TypeScript interfaces
│
├── providers/
│   ├── template-provider.ts  Interface — swap template sources freely
│   └── degit-provider.ts     GitHub template fetcher (via degit)
│
├── installer/
│   ├── installer.ts          Interface — any package manager
│   └── detect-installer.ts   Auto-detects bun / pnpm / yarn / npm
│
└── steps/
    ├── clone-template.ts     Pull the template repo
    ├── configure-project.ts  Patch package.json with the project name
    └── install-deps.ts       Run the install command
```

### Adding a new template

Open `src/config.ts` and add an entry to the `TEMPLATES` array:

```ts
{
  id: "your-template-id",
  label: "Your Template Label",
  repo: "github-username/repo-name",
  placeholder: "my-new-project",
  deps: ["package-a", "package-b"],
}
```

That's it — the CLI picks it up automatically.

---

## 🔄 CI / CD

| Workflow | Trigger | Steps |
|---|---|---|
| **CI** | Every push / PR | Typecheck → Lint → Format check → Build |
| **Release** | Push to `main` | Build → semantic-release (version bump, changelog, npm publish, GitHub release) |

Releases are fully automated via [semantic-release](https://semantic-release.gitbook.io). No manual `npm publish` needed.

---

## 📄 License

MIT © [Amr Hesham](https://github.com/amoorihesham)
