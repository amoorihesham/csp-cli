#!/usr/bin/env node
import chalk from "chalk";
import { main } from "./main";

main().catch((err) => {
  console.error(chalk.red("Unexpected error:"), err);
  process.exit(1);
});
