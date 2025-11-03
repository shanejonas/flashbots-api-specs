import { cleanupGeneratedOpenRPC } from "./cleanup-openrpc";
import { generateOpenRPC } from "./generate-openrpc";
import { $ } from "bun";

const runTypeScriptCompiler = async (): Promise<void> => {
  const result = await $`bunx --bun tsc`;
  if (result.exitCode !== 0) {
    throw new Error(`tsc exited with code ${result.exitCode}`);
  }
};

export const build = async (): Promise<void> => {
  await generateOpenRPC();

  try {
    await runTypeScriptCompiler();
  } finally {
    await cleanupGeneratedOpenRPC();
  }
};

if (import.meta.main) {
  build().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
