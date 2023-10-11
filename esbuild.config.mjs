// @ts-check
import chalk from "chalk";
import { analyzeMetafile, build } from "esbuild";

(async () => {
  try {
    const startTime = Date.now();
    console.info(chalk.bold(`🚀 ${chalk.blueBright("knip-reporter")} Build\n`));

    const result = await build({
      entryPoints: ["./src/main.ts"],
      outfile: "dist/index.mjs",
      metafile: true,
      bundle: true,
      format: 'esm',
      platform: "node",
      target: ["node20"],
      treeShaking: true,
    });

    const analysis = await analyzeMetafile(result.metafile);
    console.info(`📝 Bundle Analysis:${analysis}`);

    console.info(
      `${chalk.bold.green("✔ Bundled successfully!")} (${
        Date.now() - startTime
      }ms)`,
    );
  } catch (error) {
    console.error(`🧨 ${chalk.red.bold("Failed:")} ${error.message}`);
    console.debug(`📚 ${chalk.blueBright.bold("Stack:")} ${error.stack}`);
    process.exit(1);
  }
})();
